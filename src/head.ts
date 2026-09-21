import { ParsedPath, SUPPORTED_LANGUAGES, buildLangPath, getLangInfo, isRouteAvailable } from './i18n/languages';
import { SupportedLang, RouteSeoConfig } from './types';
import { getConfig } from './i18n/locale';
import { EN_STATIC } from '@locales/en/content/static';
import { getGuide, GUIDES } from '@locales/en/content/guides';
import { SITE, absoluteUrl } from './site';
import {
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  webApplicationNode,
  webPageNode,
  webSiteNode
} from './schema';

const OG_LOCALE: Record<SupportedLang, string> = {
  en: 'en_US',
  cn: 'zh_CN',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ru: 'ru_RU',
  ar: 'ar_AR',
  it: 'it_IT',
  pt: 'pt_BR',
  ja: 'ja_JP',
  ko: 'ko_KR',
  tr: 'tr_TR',
  id: 'id_ID',
  vi: 'vi_VN',
  ur: 'ur_PK',
  tw: 'zh_TW',
  nl: 'nl_NL',
  pl: 'pl_PL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'nb_NO',
  fi: 'fi_FI',
  he: 'he_IL',
  cs: 'cs_CZ',
  hu: 'hu_HU',
  el: 'el_GR',
  th: 'th_TH'
};

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface PageMeta {
  title: string;
  description: string;
  path: string; // canonical path
  robots: string;
  ogType: 'website' | 'article';
  jsonLd: string;
  /** route key + whether hreflang alternates apply */
  alternatesFor?: string;
}

export const GUIDES_INDEX_META = {
  title: 'HEIC Guides – Open, Convert and Understand HEIC Photos | HEIC2',
  description:
    'Plain-language guides to HEIC photos: what they are, how to open them on Windows and Android, how to convert to JPG or PDF, and how to stop your iPhone saving them.',
  h1: 'HEIC guides'
};

export function getPageMeta(p: ParsedPath): PageMeta {
  const lang = p.lang;
  const langInfo = getLangInfo(lang);
  const path = buildLangPath(lang, p.routeKey);
  const robotsIndex = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  if (p.kind === 'not-found') {
    return {
      title: 'Page not found | HEIC2',
      description: 'This page does not exist. Use the HEIC converter or browse the guides.',
      path: '/404',
      robots: 'noindex, follow',
      ogType: 'website',
      jsonLd: ''
    };
  }

  if (p.kind === 'guides-index') {
    const nodes = [
      organizationNode(),
      webSiteNode(),
      webPageNode(GUIDES_INDEX_META.h1, GUIDES_INDEX_META.description, '/guides', 'CollectionPage'),
      breadcrumbNode([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' }
      ])
    ];
    return {
      title: GUIDES_INDEX_META.title,
      description: GUIDES_INDEX_META.description,
      path: '/guides',
      robots: robotsIndex,
      ogType: 'website',
      jsonLd: graph(nodes)
    };
  }

  if (p.kind === 'guide') {
    const guide = getGuide(p.guideSlug!)!;
    const nodes: object[] = [
      organizationNode(),
      webSiteNode(),
      articleNode(guide, path),
      breadcrumbNode([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: guide.h1, path }
      ])
    ];
    if (guide.faqs.length) nodes.push(faqNode(guide.faqs));
    return {
      title: `${guide.metaTitle} | ${SITE.name}`,
      description: guide.metaDescription,
      path,
      robots: robotsIndex,
      ogType: 'article',
      jsonLd: graph(nodes)
    };
  }

  if (p.kind === 'static') {
    if (lang === 'en') {
      const page = EN_STATIC[p.staticType!];
      const nodes = [
        organizationNode(),
        webSiteNode(),
        webPageNode(page.title, page.metaDescription, path, p.staticType === 'about' ? 'AboutPage' : p.staticType === 'contact' ? 'ContactPage' : 'WebPage'),
        breadcrumbNode([
          { name: 'Home', path: '/' },
          { name: page.title, path }
        ])
      ];
      return {
        title: page.metaTitle,
        description: page.metaDescription,
        path,
        robots: robotsIndex,
        ogType: 'website',
        jsonLd: graph(nodes),
        alternatesFor: p.routeKey
      };
    }
    const cfg = getConfig(lang, p.routeKey);
    const nodes = [
      organizationNode(),
      webSiteNode(),
      webPageNode(cfg.h1, cfg.description, path, 'WebPage', langInfo.code),
      breadcrumbNode([
        { name: cfg.h1, path }
      ])
    ];
    return {
      title: cfg.title,
      description: cfg.description,
      path,
      robots: robotsIndex,
      ogType: 'website',
      jsonLd: graph(nodes),
      alternatesFor: p.routeKey
    };
  }

  // tool pages
  const cfg: RouteSeoConfig = getConfig(lang, p.routeKey);
  const nodes: object[] = [organizationNode(), webSiteNode()];
  if (p.routeKey === '/') {
    // keep the WebSite/Organization nodes and add the application description
  }
  nodes.push(webApplicationNode(cfg, path, langInfo.code));
  if (p.routeKey !== '/') {
    nodes.push(
      breadcrumbNode([
        { name: lang === 'en' ? 'Home' : cfg.h1, path: buildLangPath(lang, '/') },
        { name: cfg.h1, path }
      ])
    );
  }
  if (cfg.faqs.length) nodes.push(faqNode(cfg.faqs));
  return {
    title: cfg.title,
    description: cfg.description,
    path,
    robots: robotsIndex,
    ogType: 'website',
    jsonLd: graph(nodes),
    alternatesFor: p.routeKey
  };
}


import type { Metadata } from 'next';
import { alternatesFor } from './routesList';

/** Convert our page meta into the Next.js Metadata object (title, canonical, hreflang, OG, Twitter, robots). */
export function toMetadata(p: ParsedPath): Metadata {
  const meta = getPageMeta(p);
  const canonical = absoluteUrl(meta.path);
  const languages: Record<string, string> = {};
  if (meta.alternatesFor) {
    for (const a of alternatesFor(meta.alternatesFor)) languages[a.hreflang] = absoluteUrl(a.path);
    languages['x-default'] = absoluteUrl(buildLangPath('en', meta.alternatesFor));
  }
  const noindex = meta.robots.startsWith('noindex');
  return {
    metadataBase: new URL(SITE.url),
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      ...(p.kind === 'not-found' ? {} : { canonical }),
      ...(Object.keys(languages).length ? { languages } : {})
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      type: meta.ogType,
      siteName: SITE.name,
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [SITE.ogImage],
      locale: OG_LOCALE[p.lang]
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: [SITE.ogImage] },
    icons: { icon: '/favicon.png', apple: '/icon-192.png' },
    manifest: '/manifest.json',
    other: { 'theme-color': '#2563eb' }
  };
}
