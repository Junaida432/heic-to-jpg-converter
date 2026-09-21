import JSZip from 'jszip';
import { TargetFormat } from './types';
import { buildPdf, PdfImage, PdfPageMode } from './pdf';

/** Error codes the UI maps to translated messages. */
export class ConversionError extends Error {
  code: 'NOT_IMAGE' | 'WEBP_UNSUPPORTED' | 'TOO_LARGE' | 'DECODE_FAILED';
  constructor(code: ConversionError['code'], message: string) {
    super(message);
    this.code = code;
    this.name = 'ConversionError';
  }
}

type HeicEngine = typeof import('heic-to');
let enginePromise: Promise<HeicEngine> | null = null;

/** Lazy-load the HEIC decoder (≈3 MB WebAssembly bundle). Safe to call repeatedly. */
export function preloadEngine(): Promise<HeicEngine> {
  if (!enginePromise) {
    enginePromise = import('heic-to').catch((err) => {
      enginePromise = null; // allow a retry after a network failure
      throw err;
    });
  }
  return enginePromise;
}

type ImageMime = `image/${string}`;
const MIME: Record<Exclude<TargetFormat, 'pdf'>, ImageMime> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp'
};

export interface ConvertOptions {
  format: TargetFormat;
  /** 0.5 – 1.0. Ignored for PNG. */
  quality: number;
  /** Longest side in pixels; 0 keeps the original size. */
  maxSide: number;
}

export interface ConvertResult {
  blob: Blob;
  width: number;
  height: number;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new ConversionError('DECODE_FAILED', 'Could not encode the image'))),
      type,
      quality
    );
  });
}

async function drawBitmap(
  bitmap: ImageBitmap,
  opts: ConvertOptions
): Promise<{ canvas: HTMLCanvasElement; width: number; height: number }> {
  const srcW = bitmap.width;
  const srcH = bitmap.height;
  const longest = Math.max(srcW, srcH);
  const scale = opts.maxSide > 0 && longest > opts.maxSide ? opts.maxSide / longest : 1;
  const width = Math.max(1, Math.round(srcW * scale));
  const height = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new ConversionError('TOO_LARGE', 'Canvas is unavailable or the image is too large for this device');

  // JPEG (and PDF pages) have no alpha channel: start from white so transparency never turns black.
  if (opts.format === 'jpeg' || opts.format === 'pdf') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);
  return { canvas, width, height };
}

/** Free canvas memory early – matters on phones when converting many 12–48 MP photos. */
function releaseCanvas(canvas: HTMLCanvasElement) {
  canvas.width = 1;
  canvas.height = 1;
}

export async function convertFile(file: File, opts: ConvertOptions): Promise<ConvertResult> {
  const engine = await preloadEngine();
  const isHeicFile = await engine.isHeic(file).catch(() => false);
  const looksHeic = isHeicFile || /\.(heic|heif)$/i.test(file.name) || /hei[cf]/i.test(file.type);

  const jpegQuality = Math.min(1, Math.max(0.5, opts.quality));
  const outType: ImageMime = opts.format === 'pdf' ? 'image/jpeg' : MIME[opts.format];
  const useQuality = opts.format === 'png' ? undefined : jpegQuality;

  try {
    // Fast path: no resizing needed, and the decoder can encode this format directly.
    if (looksHeic && opts.maxSide === 0 && (opts.format === 'jpeg' || opts.format === 'png')) {
      const blob: Blob = await engine.heicTo({ blob: file, type: outType, quality: useQuality });
      const dims = await readDimensions(blob);
      return { blob, width: dims.width, height: dims.height };
    }

    // General path: decode to a bitmap, optionally resize, then encode.
    let bitmap: ImageBitmap;
    if (looksHeic) {
      bitmap = (await engine.heicTo({ blob: file, type: 'bitmap' })) as ImageBitmap;
    } else {
      try {
        bitmap = await createImageBitmap(file);
      } catch {
        throw new ConversionError('NOT_IMAGE', 'This file is not a HEIC/HEIF image');
      }
    }

    const { canvas, width, height } = await drawBitmap(bitmap, opts);
    bitmap.close();
    try {
      const blob = await canvasToBlob(canvas, outType, useQuality);
      if (opts.format === 'webp' && blob.type !== 'image/webp') {
        // Safari silently falls back to PNG when it cannot encode WebP – never label that as .webp
        throw new ConversionError('WEBP_UNSUPPORTED', 'This browser cannot encode WebP');
      }
      return { blob, width, height };
    } finally {
      releaseCanvas(canvas);
    }
  } catch (err) {
    if (err instanceof ConversionError) throw err;
    const msg = typeof err === 'string' ? err : (err as Error)?.message || 'Conversion failed';
    if (/memory|allocation|too large|out of/i.test(msg)) {
      throw new ConversionError('TOO_LARGE', msg);
    }
    throw new ConversionError('DECODE_FAILED', msg);
  }
}

function readDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  if (typeof createImageBitmap === 'function') {
    return createImageBitmap(blob)
      .then((bmp) => {
        const d = { width: bmp.width, height: bmp.height };
        bmp.close();
        return d;
      })
      .catch(() => ({ width: 0, height: 0 }));
  }
  return Promise.resolve({ width: 0, height: 0 });
}

export function formatFileSize(bytes: number): string {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)) + ' ' + sizes[i];
}

export function extensionFor(format: TargetFormat): string {
  return format === 'jpeg' ? 'jpg' : format;
}

export function getConvertedFilename(originalName: string, format: TargetFormat): string {
  const dot = originalName.lastIndexOf('.');
  const base = dot > 0 ? originalName.substring(0, dot) : originalName;
  return `${base}.${extensionFor(format)}`;
}

/** Build a single PDF (one photo per page) from converted JPEG blobs. */
export async function createPdfFromItems(
  items: { blob: Blob; width: number; height: number }[],
  mode: PdfPageMode
): Promise<Blob> {
  const images: PdfImage[] = [];
  for (const it of items) {
    images.push({
      jpeg: new Uint8Array(await it.blob.arrayBuffer()),
      width: it.width,
      height: it.height
    });
  }
  const bytes = buildPdf(images, mode);
  return new Blob([bytes as BlobPart], { type: 'application/pdf' });
}

/** ZIP without extra compression – photos are already compressed, so STORE is much faster. */
export async function createZipPackage(items: { name: string; blob: Blob }[]): Promise<Blob> {
  const zip = new JSZip();
  const used = new Map<string, number>();
  for (const item of items) {
    let name = item.name;
    const count = used.get(name.toLowerCase()) ?? 0;
    used.set(name.toLowerCase(), count + 1);
    if (count > 0) {
      const dot = name.lastIndexOf('.');
      name = `${name.slice(0, dot)} (${count + 1})${name.slice(dot)}`;
    }
    zip.file(name, item.blob);
  }
  return zip.generateAsync({ type: 'blob', compression: 'STORE' });
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
