/**
 * Locale loader. Every language has its own directory under /locales/<id>/ (JSON files).
 * Server-only: client components receive the few strings they need as props, so the browser
 * never downloads the translations of other languages.
 */
import { LOCALE_DATA } from '@locales/index';
import { RouteSeoConfig, SupportedLang, UiTranslations, WidgetStrings } from '@/types';
import { Section } from '@/content/types';

export interface Banner { text: string; link: string; decline: string; accept: string }
export interface NavLabels { home: string; converters: string; legal: string; about: string; privacy: string; terms: string; contact: string }
export interface LegalPage { title: string; badge: string; summary: string; sections: { title: string; content: string }[]; backBtn?: string }
export interface Legal {
  privacyPolicy: LegalPage;
  terms: LegalPage;
  about: LegalPage;
  contact: LegalPage & { contactEmail: string; emailLabel: string };
}
export interface HowTo {
  title: string; sub: string;
  steps: { title: string; desc: string; badge: string }[];
  tipTitle: string; tipText: string;
}

function file<T>(lang: string, name: string): T | undefined {
  return LOCALE_DATA[lang]?.[name] as T | undefined;
}

const get = <T,>(lang: string, name: string): T => (file<T>(lang, name) ?? file<T>('en', name)) as T;

export const getUi = (lang: SupportedLang | string = 'en'): UiTranslations => get<UiTranslations>(lang, 'ui');
export const getWidgetStrings = (lang: SupportedLang | string = 'en'): WidgetStrings => get<WidgetStrings>(lang, 'widget');
export const getBanner = (lang: SupportedLang | string = 'en'): Banner => get<Banner>(lang, 'banner');
export interface Chrome { skip: string; languages: string; changeLanguage: string; toggleMenu: string; breadcrumb: string }
export const getChrome = (lang: SupportedLang | string = 'en'): Chrome => get<Chrome>(lang, 'chrome');
export const getNavLabels = (lang: SupportedLang | string = 'en'): NavLabels => get<NavLabels>(lang, 'nav');
export const getHomeSections = (lang: SupportedLang | string): Section[] | undefined => file<Section[]>(lang, 'sections');
export const getLegal = (lang: SupportedLang | string): Legal | undefined => file<Legal>(lang, 'legal');
export const getHowTo = (lang: SupportedLang | string): HowTo => get<HowTo>(lang, 'howto');

/** SEO/page configuration for a route in a language (falls back to English). */
export function getConfig(lang: SupportedLang | string = 'en', routeKey = '/'): RouteSeoConfig {
  const pages = file<Record<string, RouteSeoConfig>>(lang, 'pages');
  return (pages?.[routeKey] ?? file<Record<string, RouteSeoConfig>>('en', 'pages')![routeKey]) as RouteSeoConfig;
}

/** The subset of UI strings the client-side converter needs. */
export function getConverterStrings(lang: SupportedLang | string = 'en') {
  const ui = getUi(lang);
  return {
    ui: {
      dropzoneTitle: ui.dropzoneTitle, dropzoneSub: ui.dropzoneSub, browseBtn: ui.browseBtn, clipboardTip: ui.clipboardTip,
      formatSelect: ui.formatSelect, qualityLabel: ui.qualityLabel, convertAllBtn: ui.convertAllBtn,
      downloadAllBtn: ui.downloadAllBtn, clearAllBtn: ui.clearAllBtn, statusPending: ui.statusPending,
      statusConverting: ui.statusConverting, statusDone: ui.statusDone, downloadBtn: ui.downloadBtn
    },
    w: getWidgetStrings(lang)
  };
}
export type ConverterStrings = ReturnType<typeof getConverterStrings>;
