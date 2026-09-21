import type { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/site';
import { listAllRoutes, alternatesFor } from '@/routesList';
import { buildLangPath } from '@/i18n/languages';

export default function sitemap(): MetadataRoute.Sitemap {
  return listAllRoutes().map((r) => {
    const alts = alternatesFor(r.routeKey);
    const languages: Record<string, string> = {};
    for (const a of alts) languages[a.hreflang] = absoluteUrl(a.path);
    if (alts.length) languages['x-default'] = absoluteUrl(buildLangPath('en', r.routeKey));
    return {
      url: absoluteUrl(r.path),
      lastModified: SITE.contentUpdated,
      ...(alts.length ? { alternates: { languages } } : {})
    };
  });
}
