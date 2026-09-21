import React from 'react';
import { AppLink } from './AppLink';
import { GUIDES, getGuide } from '@locales/en/content/guides';
import { getConfig } from '../i18n';

export function RelatedLinks({ tools, guides }: { tools: string[]; guides: string[] }) {
  const guideItems = guides.map((s) => getGuide(s)).filter((g): g is NonNullable<ReturnType<typeof getGuide>> => Boolean(g));
  if (!tools.length && !guideItems.length) return null;
  return (
    <section className="mt-16 max-w-[46rem] mx-auto grid gap-10 sm:grid-cols-2" aria-label="Related pages">
      {tools.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Other converters</h2>
          <ul className="space-y-2">
            {tools.map((t) => (
              <li key={t}>
                <AppLink href={t} className="text-blue-700 font-medium hover:underline underline-offset-2">{getConfig('en', t)?.h1 ?? t}</AppLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {guideItems.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Related guides</h2>
          <ul className="space-y-2">
            {guideItems.map((g) => (
              <li key={g.slug}>
                <AppLink href={`/guides/${g.slug}`} className="text-blue-700 font-medium hover:underline underline-offset-2">{g.h1}</AppLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export { GUIDES };
