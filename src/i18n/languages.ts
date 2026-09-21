import { LanguageInfo, SupportedLang } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { id: 'en', code: 'en', name: 'English', localName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { id: 'cn', code: 'zh-CN', name: 'Chinese', localName: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { id: 'es', code: 'es', name: 'Spanish', localName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { id: 'fr', code: 'fr', name: 'French', localName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { id: 'de', code: 'de', name: 'German', localName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { id: 'ru', code: 'ru', name: 'Russian', localName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { id: 'ar', code: 'ar', name: 'Arabic', localName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { id: 'it', code: 'it', name: 'Italian', localName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { id: 'pt', code: 'pt', name: 'Portuguese', localName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { id: 'ja', code: 'ja', name: 'Japanese', localName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { id: 'ko', code: 'ko', name: 'Korean', localName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { id: 'tr', code: 'tr', name: 'Turkish', localName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { id: 'id', code: 'id', name: 'Indonesian', localName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { id: 'vi', code: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  { id: 'ur', code: 'ur', name: 'Urdu', localName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { id: 'tw', code: 'zh-TW', name: 'Chinese (Traditional)', localName: '繁體中文', flag: '🇹🇼', dir: 'ltr' },
  { id: 'nl', code: 'nl', name: 'Dutch', localName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { id: 'pl', code: 'pl', name: 'Polish', localName: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  { id: 'sv', code: 'sv', name: 'Swedish', localName: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
  { id: 'da', code: 'da', name: 'Danish', localName: 'Dansk', flag: '🇩🇰', dir: 'ltr' },
  { id: 'no', code: 'nb', name: 'Norwegian', localName: 'Norsk', flag: '🇳🇴', dir: 'ltr' },
  { id: 'fi', code: 'fi', name: 'Finnish', localName: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
  { id: 'he', code: 'he', name: 'Hebrew', localName: 'עברית', flag: '🇮🇱', dir: 'rtl' },
  { id: 'cs', code: 'cs', name: 'Czech', localName: 'Čeština', flag: '🇨🇿', dir: 'ltr' },
  { id: 'hu', code: 'hu', name: 'Hungarian', localName: 'Magyar', flag: '🇭🇺', dir: 'ltr' },
  { id: 'el', code: 'el', name: 'Greek', localName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
  { id: 'th', code: 'th', name: 'Thai', localName: 'ไทย', flag: '🇹🇭', dir: 'ltr' }
];

/** Languages that only have a translated home page (see i18n/packs). */
export const PACK_LANGS: readonly SupportedLang[] = ['ja', 'ko', 'tr', 'id', 'vi', 'ur', 'tw', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'he', 'cs', 'hu', 'el', 'th'];

/** True when the language has translated tool pages and legal pages, not just a home page. */
export function hasSubpages(lang: SupportedLang): boolean {
  return !PACK_LANGS.includes(lang);
}

/** Converter routes that exist in every language. */
export const MULTILINGUAL_TOOL_ROUTES = [
  '/',
  '/heic-to-jpg',
  '/heic-to-png',
  '/heic-to-webp',
  '/batch-heic-converter'
] as const;

/** Converter routes that only exist in English (for now). */
export const ENGLISH_ONLY_TOOL_ROUTES = ['/heic-to-pdf'] as const;

export const ALL_TOOL_ROUTES: readonly string[] = [...MULTILINGUAL_TOOL_ROUTES, ...ENGLISH_ONLY_TOOL_ROUTES];

export const STATIC_ROUTES = ['/privacy-policy', '/terms', '/about', '/contact'] as const;
export type StaticType = 'privacy-policy' | 'terms' | 'about' | 'contact';

export const VALID_ROUTE_KEYS = ALL_TOOL_ROUTES;

export function getLangInfo(lang: SupportedLang): LanguageInfo {
  return SUPPORTED_LANGUAGES.find((l) => l.id === lang) || SUPPORTED_LANGUAGES[0];
}

export type RouteKind = 'tool' | 'static' | 'guides-index' | 'guide' | 'not-found';

export interface ParsedPath {
  lang: SupportedLang;
  /** Language-independent route key, e.g. "/heic-to-jpg" or "/guides/heic-vs-jpg". */
  routeKey: string;
  kind: RouteKind;
  staticType?: StaticType;
  guideSlug?: string;
  /** Kept for backwards compatibility with older components. */
  isStatic: boolean;
}

const NON_EN_LANGS = ['es', 'fr', 'de', 'ru', 'ar', 'it', 'pt', 'ja', 'ko', 'tr', 'id', 'vi', 'ur', 'tw', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'he', 'cs', 'hu', 'el', 'th'];

/**
 * Parse any pathname (e.g. /cn/heic-to-jpg, /fr, /heic-to-png, /guides/heic-vs-jpg).
 * Unknown paths resolve to kind "not-found" so the server can answer with a real 404.
 */
export function parsePath(pathname: string, guideSlugs: readonly string[] = GUIDE_SLUG_REGISTRY.slugs): ParsedPath {
  const normalized = pathname.toLowerCase().split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const parts = normalized.split('/').filter(Boolean);

  let lang: SupportedLang = 'en';
  let remaining = [...parts];

  if (parts.length > 0) {
    const first = parts[0];
    if (first === 'zh' || first === 'cn') {
      lang = 'cn';
      remaining = parts.slice(1);
    } else if (NON_EN_LANGS.includes(first)) {
      lang = first as SupportedLang;
      remaining = parts.slice(1);
    }
  }

  const subPath = remaining.length === 0 ? '/' : '/' + remaining.join('/');
  const notFound: ParsedPath = { lang, routeKey: '/404', kind: 'not-found', isStatic: false };

  if ((STATIC_ROUTES as readonly string[]).includes(subPath)) {
    return { lang, routeKey: subPath, kind: 'static', staticType: subPath.slice(1) as StaticType, isStatic: true };
  }

  if ((MULTILINGUAL_TOOL_ROUTES as readonly string[]).includes(subPath)) {
    return { lang, routeKey: subPath, kind: 'tool', isStatic: false };
  }

  // English-only sections
  if (lang === 'en') {
    if ((ENGLISH_ONLY_TOOL_ROUTES as readonly string[]).includes(subPath)) {
      return { lang, routeKey: subPath, kind: 'tool', isStatic: false };
    }
    if (subPath === '/guides') {
      return { lang, routeKey: '/guides', kind: 'guides-index', isStatic: false };
    }
    if (remaining[0] === 'guides' && remaining.length === 2 && guideSlugs.includes(remaining[1])) {
      return { lang, routeKey: subPath, kind: 'guide', guideSlug: remaining[1], isStatic: false };
    }
  }

  return notFound;
}

/** Filled by content/en/guides.ts so this file never imports heavy content. */
export const GUIDE_SLUG_REGISTRY: { slugs: string[] } = { slugs: [] };

export function isRouteAvailable(lang: SupportedLang, routeKey: string): boolean {
  if (lang === 'en') return true;
  if (!hasSubpages(lang)) return routeKey === '/';
  return (
    (MULTILINGUAL_TOOL_ROUTES as readonly string[]).includes(routeKey) ||
    (STATIC_ROUTES as readonly string[]).includes(routeKey)
  );
}

/** Where to send a visitor who switches language on a page that is not translated. */
export function resolveLangRoute(lang: SupportedLang, routeKey: string): string {
  return isRouteAvailable(lang, routeKey) ? routeKey : '/';
}

/** Build the URL path for a route key in a given language. */
export function buildLangPath(lang: SupportedLang, routeKey: string): string {
  const cleanRoute = routeKey.startsWith('/') ? routeKey : '/' + routeKey;
  if (lang === 'en') return cleanRoute;
  if (cleanRoute === '/') return `/${lang}`;
  return `/${lang}${cleanRoute}`;
}
