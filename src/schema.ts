import { FaqItem, RouteSeoConfig } from './types';
import { Guide } from './content/types';
import { SITE, absoluteUrl } from './site';

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    url: `${SITE.url}/`,
    logo: { '@type': 'ImageObject', url: `${SITE.url}/icon-512.png`, width: 512, height: 512 },
    email: SITE.email
  };
}

export function webSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    url: `${SITE.url}/`,
    publisher: { '@id': ORG_ID }
  };
}

/** Honest application markup: no ratings or reviews unless real ones are shown on the page. */
export function webApplicationNode(config: RouteSeoConfig, path: string, inLanguage: string) {
  return {
    '@type': 'WebApplication',
    '@id': `${absoluteUrl(path)}#app`,
    name: config.h1,
    url: absoluteUrl(path),
    description: config.description,
    inLanguage,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (runs in a web browser)',
    browserRequirements: 'Requires JavaScript and WebAssembly',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: config.features,
    publisher: { '@id': ORG_ID }
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path)
    }))
  };
}

export function faqNode(faqs: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };
}

export function articleNode(guide: Guide, path: string) {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: guide.h1,
    description: guide.metaDescription,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: 'en',
    image: SITE.ogImage,
    mainEntityOfPage: absoluteUrl(path),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID }
  };
}

export function webPageNode(name: string, description: string, path: string, type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' = 'WebPage', inLanguage = 'en') {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    inLanguage,
    isPartOf: { '@id': SITE_ID }
  };
}

export function graph(nodes: object[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
