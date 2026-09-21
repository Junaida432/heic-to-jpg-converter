/** Single source of truth for site-wide constants. */
export const SITE = {
  /** Brand name. Google "site name": HEIC2, alternate: heic2.tools */
  name: 'HEIC2',
  alternateNames: ['heic2.tools', 'HEIC2 Tools'],
  url: 'https://www.heic2.tools',
  email: 'support@heic2.tools',
  /** Person named as author in the previous version of the site. Change if needed. */
  founder: 'Faraz Qaisrani',
  /** Fixed value so server-rendered and hydrated markup always match. */
  copyrightYear: 2026,
  /** ISO date of the last substantive content update (used in sitemap + Article schema). */
  contentUpdated: '2026-09-21',
  gaMeasurementId: 'G-51PHPP8XMR',
  ogImage: 'https://www.heic2.tools/og.png'
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path === '/' ? '/' : path}`;
}
