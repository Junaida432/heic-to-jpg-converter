import { SUPPORTED_LANGUAGES, hasSubpages, MULTILINGUAL_TOOL_ROUTES, ENGLISH_ONLY_TOOL_ROUTES, STATIC_ROUTES, buildLangPath, isRouteAvailable } from './i18n/languages';
import { GUIDES } from '@locales/en/content/guides';
import { SupportedLang } from './types';

export interface RouteEntry {
  path: string;
  lang: SupportedLang;
  /** language-independent key */
  routeKey: string;
}

/** Every indexable URL on the site. Drives prerendering, the sitemap and the build verification. */
export function listAllRoutes(): RouteEntry[] {
  const out: RouteEntry[] = [];
  for (const lang of SUPPORTED_LANGUAGES) {
    const keys = hasSubpages(lang.id) ? [...MULTILINGUAL_TOOL_ROUTES, ...STATIC_ROUTES] : ['/'];
    for (const key of keys) {
      out.push({ path: buildLangPath(lang.id, key), lang: lang.id, routeKey: key });
    }
  }
  for (const key of ENGLISH_ONLY_TOOL_ROUTES) out.push({ path: key, lang: 'en', routeKey: key });
  out.push({ path: '/guides', lang: 'en', routeKey: '/guides' });
  for (const g of GUIDES) out.push({ path: `/guides/${g.slug}`, lang: 'en', routeKey: `/guides/${g.slug}` });
  return out;
}

export function alternatesFor(routeKey: string): { hreflang: string; path: string }[] {
  const alts: { hreflang: string; path: string }[] = [];
  for (const l of SUPPORTED_LANGUAGES) {
    if (isRouteAvailable(l.id, routeKey)) alts.push({ hreflang: l.code, path: buildLangPath(l.id, routeKey) });
  }
  return alts;
}
