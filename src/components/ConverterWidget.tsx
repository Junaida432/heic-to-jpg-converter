'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, FileImage, AlertCircle, Download, Trash2, Archive, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ConversionItem, TargetFormat, UiTranslations, WidgetStrings } from '../types';
import {
  ConversionError,
  convertFile,
  createPdfFromItems,
  createZipPackage,
  formatFileSize,
  getConvertedFilename,
  preloadEngine,
  triggerDownload
} from '../converter';
import type { PdfPageMode } from '../pdf';

export type ConverterUi = Pick<
  UiTranslations,
  | 'dropzoneTitle' | 'dropzoneSub' | 'browseBtn' | 'clipboardTip' | 'formatSelect' | 'qualityLabel' | 'convertAllBtn'
  | 'downloadAllBtn' | 'clearAllBtn' | 'statusPending' | 'statusConverting' | 'statusDone' | 'downloadBtn'
>;

interface ConverterWidgetProps {
  defaultFormat: TargetFormat;
  /** Strings for this page's language, passed from the server so no other language is downloaded. */
  ui: ConverterUi;
  w: WidgetStrings;
}

const FORMATS: { id: TargetFormat; label: string }[] = [
  { id: 'jpeg', label: 'JPG' },
  { id: 'png', label: 'PNG' },
  { id: 'webp', label: 'WebP' },
  { id: 'pdf', label: 'PDF' }
];

const MAX_SIDES = [0, 4096, 3000, 2048, 1600, 1080];

let idCounter = 0;
const newId = () => `f${Date.now().toString(36)}${(idCounter++).toString(36)}`;

export const ConverterWidget: React.FC<ConverterWidgetProps> = ({ defaultFormat, ui, w }) => {
  const [items, setItems] = useState<ConversionItem[]>([]);
  const [format, setFormat] = useState<TargetFormat>(defaultFormat);
  const [quality, setQuality] = useState(0.92);
  const [maxSide, setMaxSide] = useState(0);
  const [pdfCombine, setPdfCombine] = useState(true);
  const [pdfPage, setPdfPage] = useState<PdfPageMode>('a4');
  const [dragging, setDragging] = useState(false);
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);

  const itemsRef = useRef<ConversionItem[]>([]);
  itemsRef.current = items;
  const settingsRef = useRef({ format, quality, maxSide });
  settingsRef.current = { format, quality, maxSide };
  const inputRef = useRef<HTMLInputElement>(null);

  // Follow the page's default format when the route changes.
  useEffect(() => {
    setFormat(defaultFormat);
  }, [defaultFormat]);

  // Revoke object URLs when the widget unmounts.
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((i) => i.previewUrl && URL.revokeObjectURL(i.previewUrl));
    };
  }, []);

  const addFiles = useCallback((files: File[]) => {
    if (!files.length) return;
    const fresh: ConversionItem[] = files.map((file) => ({
      id: newId(),
      file,
      fileName: file.name || 'photo.heic',
      fileSize: file.size,
      status: 'pending'
    }));
    setItems((prev) => [...prev, ...fresh]);
  }, []);

  // Ctrl+V / ⌘+V paste
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = e.clipboardData?.files;
      if (files && files.length > 0) addFiles(Array.from(files));
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [addFiles]);

  /** When a setting changes, finished items must be converted again with the new setting. */
  const resetFinished = () => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.status === 'pending' || i.status === 'converting') return i;
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
        return {
          id: i.id, file: i.file, fileName: i.fileName, fileSize: i.fileSize, status: 'pending' as const
        };
      })
    );
  };

  const errorText = (err: unknown): string => {
    if (err instanceof ConversionError) {
      if (err.code === 'NOT_IMAGE') return w.notHeic;
      if (err.code === 'WEBP_UNSUPPORTED') return w.webpUnsupported;
      if (err.code === 'TOO_LARGE') return w.tooLarge;
    }
    return w.genericError;
  };

  const convertAll = async () => {
    if (running) return;
    setRunning(true);
    try {
      const pendingIds = itemsRef.current.filter((i) => i.status === 'pending').map((i) => i.id);
      for (const id of pendingIds) {
        const current = itemsRef.current.find((i) => i.id === id);
        if (!current || current.status !== 'pending') continue;
        const { format: fmt, quality: q, maxSide: ms } = settingsRef.current;
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'converting' } : i)));
        try {
          const res = await convertFile(current.file, { format: fmt, quality: q, maxSide: ms });
          const previewUrl = URL.createObjectURL(res.blob);
          setItems((prev) =>
            prev.map((i) =>
              i.id === id
                ? { ...i, status: 'done', convertedBlob: res.blob, convertedSize: res.blob.size, width: res.width, height: res.height, previewUrl, outputFormat: fmt }
                : i
            )
          );
        } catch (err) {
          console.warn('Conversion failed:', err);
          setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'error', errorMsg: errorText(err) } : i)));
        }
        // let the browser paint between heavy photos
        await new Promise((r) => setTimeout(r, 0));
      }
    } finally {
      setRunning(false);
    }
  };

  const done = items.filter((i) => i.status === 'done' && i.convertedBlob);
  const pending = items.filter((i) => i.status === 'pending');
  const finishedCount = items.filter((i) => i.status === 'done' || i.status === 'error').length;
  const combinedPdf = format === 'pdf' && pdfCombine;

  const downloadOne = async (item: ConversionItem) => {
    if (!item.convertedBlob) return;
    if (item.outputFormat === 'pdf') {
      const pdf = await createPdfFromItems([{ blob: item.convertedBlob, width: item.width || 1, height: item.height || 1 }], pdfPage);
      triggerDownload(pdf, getConvertedFilename(item.fileName, 'pdf'));
    } else {
      triggerDownload(item.convertedBlob, getConvertedFilename(item.fileName, item.outputFormat || format));
    }
  };

  const downloadCombinedPdf = async () => {
    if (!done.length) return;
    setBusy(true);
    try {
      const pdf = await createPdfFromItems(
        done.map((i) => ({ blob: i.convertedBlob!, width: i.width || 1, height: i.height || 1 })),
        pdfPage
      );
      triggerDownload(pdf, `heic2-photos-${done.length}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  const downloadZip = async () => {
    if (!done.length) return;
    setBusy(true);
    try {
      const files: { name: string; blob: Blob }[] = [];
      for (const i of done) {
        if (i.outputFormat === 'pdf') {
          const pdf = await createPdfFromItems([{ blob: i.convertedBlob!, width: i.width || 1, height: i.height || 1 }], pdfPage);
          files.push({ name: getConvertedFilename(i.fileName, 'pdf'), blob: pdf });
        } else {
          files.push({ name: getConvertedFilename(i.fileName, i.outputFormat || format), blob: i.convertedBlob! });
        }
      }
      triggerDownload(await createZipPackage(files), `heic2-converted-${files.length}-files.zip`);
    } finally {
      setBusy(false);
    }
  };

  const clearAll = () => {
    items.forEach((i) => i.previewUrl && URL.revokeObjectURL(i.previewUrl));
    setItems([]);
  };

  const removeItem = (id: string) => {
    const t = items.find((i) => i.id === id);
    if (t?.previewUrl) URL.revokeObjectURL(t.previewUrl);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const openPicker = () => {
    preloadEngine().catch(() => undefined);
    inputRef.current?.click();
  };

  const showQuality = format !== 'png';
  const outLabel = (f: TargetFormat) => (f === 'jpeg' ? 'JPG' : f.toUpperCase());

  return (
    <div className="w-full max-w-3xl mx-auto" id="converter">
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`${ui.dropzoneTitle}. ${ui.browseBtn}`}
        onKeyDown={(e) => {
          if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            openPicker();
          }
        }}
        onPointerEnter={() => { preloadEngine().catch(() => undefined); }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files?.length) addFiles(Array.from(e.dataTransfer.files));
        }}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('button')) openPicker();
        }}
        className={`rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-colors bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
          dragging ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
        }`}
        id="dropzone-container"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".heic,.heif,image/heic,image/heif,image/*"
          className="hidden"
          id="heic-file-input"
          data-testid="file-input"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(Array.from(e.target.files));
            e.target.value = '';
          }}
        />
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Upload className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2">{ui.dropzoneTitle}</p>
        <p className="text-slate-600 text-[15px] max-w-lg mx-auto mb-6 leading-relaxed">{ui.dropzoneSub}</p>
        <button
          type="button"
          onClick={openPicker}
          id="choose-files-btn"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3 text-base font-semibold text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <FileImage className="h-5 w-5" aria-hidden="true" />
          <span>{items.length ? w.addMore : ui.browseBtn}</span>
        </button>
        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>{w.dropAnywhere}</span>
          <span aria-hidden="true">•</span>
          <span>{ui.clipboardTip}</span>
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {w.processedLocally}
        </p>
      </div>

      {/* Settings */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 text-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-slate-800" id="format-label">{ui.formatSelect}</span>
          <div role="radiogroup" aria-labelledby="format-label" className="grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 sm:w-auto">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={format === f.id}
                onClick={() => {
                  if (f.id !== format) {
                    setFormat(f.id);
                    resetFinished();
                  }
                }}
                className={`min-h-[44px] rounded-md px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                  format === f.id ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            {showQuality ? (
              <label className="block">
                <span className="flex items-center justify-between font-medium text-slate-800 mb-1.5">
                  <span>{ui.qualityLabel.replace(/[:：]\s*$/, '')}</span>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">{Math.round(quality * 100)}%</span>
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => {
                    setQuality(parseFloat(e.target.value));
                    resetFinished();
                  }}
                  className="w-full h-2 accent-blue-600 cursor-pointer"
                />
              </label>
            ) : (
              <p className="text-slate-500 text-[13px] pt-1">{w.losslessNote}</p>
            )}
          </div>
          <label className="block">
            <span className="block font-medium text-slate-800 mb-1.5">{w.resizeLabel}</span>
            <select
              value={maxSide}
              onChange={(e) => {
                setMaxSide(parseInt(e.target.value, 10));
                resetFinished();
              }}
              className="w-full min-h-[42px] rounded-lg border border-slate-300 bg-white px-3 text-slate-800"
            >
              {MAX_SIDES.map((m) => (
                <option key={m} value={m}>{m === 0 ? w.resizeOriginal : `${m} px`}</option>
              ))}
            </select>
          </label>
        </div>

        {format === 'pdf' && (
          <div className="grid gap-4 sm:grid-cols-2 border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2.5 font-medium text-slate-800">
              <input
                type="checkbox"
                checked={pdfCombine}
                onChange={(e) => setPdfCombine(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              <span>{w.pdfCombine}</span>
            </label>
            <label className="block">
              <span className="block font-medium text-slate-800 mb-1.5">{w.pdfPage}</span>
              <select
                value={pdfPage}
                onChange={(e) => setPdfPage(e.target.value as PdfPageMode)}
                className="w-full min-h-[42px] rounded-lg border border-slate-300 bg-white px-3 text-slate-800"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="image">{w.pdfPageImage}</option>
              </select>
            </label>
          </div>
        )}
      </div>

      {/* File list */}
      {items.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden" data-testid="file-list">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <div className="font-semibold text-slate-800">
              {items.length} {items.length === 1 ? w.file : w.files}
              <span className="ml-2 font-normal text-slate-500">({done.length} {ui.statusDone.toLowerCase()})</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {pending.length > 0 && (
                <button
                  type="button"
                  onClick={convertAll}
                  disabled={running}
                  id="convert-all-btn"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  <RefreshCw className={`h-4 w-4 ${running ? 'animate-spin' : ''}`} aria-hidden="true" />
                  {running ? ui.statusConverting : `${ui.convertAllBtn} (${pending.length})`}
                </button>
              )}
              {done.length > 0 && combinedPdf && (
                <button
                  type="button"
                  onClick={downloadCombinedPdf}
                  disabled={busy}
                  id="download-pdf-btn"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-emerald-600 px-4 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {w.downloadPdf} ({done.length})
                </button>
              )}
              {done.length > 0 && !combinedPdf && (
                <button
                  type="button"
                  onClick={downloadZip}
                  disabled={busy}
                  id="download-zip-btn"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-emerald-600 px-4 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  <Archive className="h-4 w-4" aria-hidden="true" />
                  {busy ? w.zipping : `${ui.downloadAllBtn} (${done.length})`}
                </button>
              )}
              <button
                type="button"
                onClick={clearAll}
                title={ui.clearAllBtn}
                aria-label={ui.clearAllBtn}
                className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {running && (
            <div
              className="h-1 bg-slate-100"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={items.length}
              aria-valuenow={finishedCount}
            >
              <div className="h-1 bg-blue-600 transition-all" style={{ width: `${(finishedCount / items.length) * 100}%` }} />
            </div>
          )}

          <ul className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto" aria-live="polite">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap" data-status={item.status}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  {item.previewUrl ? (
                    <img src={item.previewUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <FileImage className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.fileName}</p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(item.fileSize)}
                    {item.status === 'done' && item.convertedSize ? (
                      <>
                        {' → '}
                        <span className="font-semibold text-emerald-700">{outLabel(item.outputFormat || format)} · {formatFileSize(item.convertedSize)}</span>
                        {item.width && item.height ? <span> · {item.width}×{item.height}</span> : null}
                      </>
                    ) : null}
                  </p>
                  {item.status === 'error' && (
                    <p className="mt-1 flex items-start gap-1 text-xs text-rose-700">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{item.errorMsg}</span>
                    </p>
                  )}
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {item.status === 'converting' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                      {ui.statusConverting}
                    </span>
                  )}
                  {item.status === 'pending' && <span className="text-xs text-slate-500">{ui.statusPending}</span>}
                  {item.status === 'done' && !combinedPdf && (
                    <button
                      type="button"
                      onClick={() => downloadOne(item)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      {ui.downloadBtn}
                    </button>
                  )}
                  {item.status === 'done' && combinedPdf && <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-label={ui.statusDone} />}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    title={w.removeFile}
                    aria-label={`${w.removeFile}: ${item.fileName}`}
                    className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
