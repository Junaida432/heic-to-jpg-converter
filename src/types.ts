export type TargetFormat = 'jpeg' | 'png' | 'webp' | 'pdf';

/** Languages that have every page translated (tool pages + legal pages). */
export type FullLang = 'en' | 'cn' | 'fr' | 'de' | 'ru' | 'ar' | 'es' | 'it' | 'pt';
/** Languages launched with a translated home page (converter + guide text) via i18n/packs. */
export type PackLang = 'ja' | 'ko' | 'tr' | 'id' | 'vi' | 'ur' | 'tw' | 'nl' | 'pl' | 'sv' | 'da' | 'no' | 'fi' | 'he' | 'cs' | 'hu' | 'el' | 'th';
export type SupportedLang = FullLang | PackLang;

export interface LanguageInfo {
  id: SupportedLang;
  code: string;
  name: string;
  localName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export interface UiTranslations {
  navJpg: string;
  navPng: string;
  navWebp: string;
  navBatch: string;
  privateBadge: string;
  dropzoneTitle: string;
  dropzoneSub: string;
  browseBtn: string;
  demoBtn: string;
  clipboardTip: string;
  formatSelect: string;
  qualityLabel: string;
  convertAllBtn: string;
  downloadAllBtn: string;
  clearAllBtn: string;
  statusPending: string;
  statusConverting: string;
  statusDone: string;
  statusError: string;
  downloadBtn: string;
  originalSize: string;
  newSize: string;
  howItWorksTitle: string;
  howItWorksSub: string;
  comparisonTitle: string;
  comparisonSub: string;
  faqTitle: string;
  faqSub: string;
  tableHeaders: {
    format: string;
    compression: string;
    transparency: string;
    compatibility: string;
    bestFor: string;
  };
  footerDesc: string;
  footerRights: string;
}

/** Extra converter-widget strings (translated for every language in i18n/widgetStrings.ts). */
export interface WidgetStrings {
  dropAnywhere: string;
  freePrivate: string;
  files: string;
  file: string;
  resizeLabel: string;
  resizeOriginal: string;
  pdfCombine: string;
  pdfPage: string;
  pdfPageImage: string;
  removeFile: string;
  zipping: string;
  downloadPdf: string;
  losslessNote: string;
  notHeic: string;
  webpUnsupported: string;
  tooLarge: string;
  genericError: string;
  addMore: string;
  processedLocally: string;
}

export interface ConversionItem {
  id: string;
  file: File;
  fileName: string;
  fileSize: number;
  status: 'pending' | 'converting' | 'done' | 'error';
  /** Encoded output (for PDF target this is the JPEG that will be embedded). */
  convertedBlob?: Blob;
  convertedSize?: number;
  width?: number;
  height?: number;
  previewUrl?: string;
  errorMsg?: string;
  /** Output format this item was converted to. */
  outputFormat?: TargetFormat;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RouteSeoConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  subheading: string;
  badge: string;
  defaultFormat: TargetFormat;
  keywords: string[];
  features: string[];
  faqs: FaqItem[];
  tableData?: {
    formatName: string;
    compression: string;
    transparency: string;
    compatibility: string;
    bestFor: string;
  }[];
}
