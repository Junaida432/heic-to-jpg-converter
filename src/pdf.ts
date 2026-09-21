/**
 * Minimal, dependency-free PDF writer: one JPEG per page.
 * Everything runs in the browser; nothing is uploaded.
 */

export interface PdfImage {
  /** Baseline JPEG bytes (3 components, 8 bit). */
  jpeg: Uint8Array;
  width: number;
  height: number;
}

export type PdfPageMode = 'a4' | 'letter' | 'image';

const PAGE_SIZES: Record<'a4' | 'letter', [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792]
};

const MARGIN = 28; // pt, used when fitting to a paper size
const PX_TO_PT = 0.75; // 96 dpi → 72 dpi
const MAX_PAGE_PT = 14400; // Acrobat limit (200 in)

const enc = new TextEncoder();
const fmt = (n: number) => (Math.round(n * 100) / 100).toString();

export function buildPdf(images: PdfImage[], mode: PdfPageMode = 'a4', title = 'Converted photos'): Uint8Array {
  if (!images.length) throw new Error('No images to place in the PDF');

  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;

  const push = (data: Uint8Array | string) => {
    const bytes = typeof data === 'string' ? enc.encode(data) : data;
    chunks.push(bytes);
    length += bytes.length;
  };
  const beginObj = (id: number) => {
    offsets[id] = length;
    push(`${id} 0 obj\n`);
  };
  const endObj = () => push('\nendobj\n');

  // Object numbering: 1 catalog, 2 pages, 3 info, then 3 objects per page.
  const pageObjId = (i: number) => 4 + i * 3;
  const contentObjId = (i: number) => 5 + i * 3;
  const imageObjId = (i: number) => 6 + i * 3;

  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  beginObj(1);
  push('<< /Type /Catalog /Pages 2 0 R >>');
  endObj();

  beginObj(2);
  push(`<< /Type /Pages /Count ${images.length} /Kids [${images.map((_, i) => `${pageObjId(i)} 0 R`).join(' ')}] >>`);
  endObj();

  beginObj(3);
  push(`<< /Title (${escapePdfText(title)}) /Producer (HEIC2 - www.heic2.tools) >>`);
  endObj();

  images.forEach((img, i) => {
    let pageW: number;
    let pageH: number;
    let drawX: number;
    let drawY: number;
    let drawW: number;
    let drawH: number;

    if (mode === 'image') {
      const scale = Math.min(1, MAX_PAGE_PT / Math.max(img.width * PX_TO_PT, img.height * PX_TO_PT));
      pageW = img.width * PX_TO_PT * scale;
      pageH = img.height * PX_TO_PT * scale;
      drawX = 0;
      drawY = 0;
      drawW = pageW;
      drawH = pageH;
    } else {
      const [pw, ph] = PAGE_SIZES[mode];
      const landscape = img.width > img.height;
      pageW = landscape ? ph : pw;
      pageH = landscape ? pw : ph;
      const boxW = pageW - MARGIN * 2;
      const boxH = pageH - MARGIN * 2;
      const scale = Math.min(boxW / img.width, boxH / img.height);
      drawW = img.width * scale;
      drawH = img.height * scale;
      drawX = (pageW - drawW) / 2;
      drawY = (pageH - drawH) / 2;
    }

    beginObj(pageObjId(i));
    push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${fmt(pageW)} ${fmt(pageH)}] ` +
        `/Resources << /XObject << /Im0 ${imageObjId(i)} 0 R >> >> /Contents ${contentObjId(i)} 0 R >>`
    );
    endObj();

    const content = `q\n${fmt(drawW)} 0 0 ${fmt(drawH)} ${fmt(drawX)} ${fmt(drawY)} cm\n/Im0 Do\nQ\n`;
    beginObj(contentObjId(i));
    push(`<< /Length ${content.length} >>\nstream\n${content}endstream`);
    endObj();

    beginObj(imageObjId(i));
    push(
      `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.jpeg.length} >>\nstream\n`
    );
    push(img.jpeg);
    push('\nendstream');
    endObj();
  });

  const objectCount = 3 + images.length * 3;
  const xrefOffset = length;
  let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= objectCount; id++) {
    xref += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }
  push(xref);
  push(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  const out = new Uint8Array(length);
  let pos = 0;
  for (const c of chunks) {
    out.set(c, pos);
    pos += c.length;
  }
  return out;
}

function escapePdfText(s: string): string {
  return s.replace(/[\\()]/g, (m) => '\\' + m).replace(/[^\x20-\x7E]/g, '?');
}
