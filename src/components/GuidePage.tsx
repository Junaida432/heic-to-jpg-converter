import React from 'react';
import { Guide } from '../content/types';
import { readingMinutes } from '@locales/en/content/guides';
import { Breadcrumbs } from './Breadcrumbs';
import { Prose, Sections } from './LongForm';
import { FaqSection } from './FaqSection';
import { RelatedLinks } from './RelatedLinks';
import { ConverterWidget } from './ConverterWidget';
import { Inline } from './Inline';
import { getConverterStrings } from '../i18n';

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}

export const GuidePage: React.FC<{ guide: Guide }> = ({ guide }) => {
  const minutes = readingMinutes(guide);
  const cs = getConverterStrings('en');
  return (
    <article className="max-w-[46rem] mx-auto">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: guide.h1 }]} />
      <header className="mb-8">
        <h1 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">{guide.h1}</h1>
        <p className="mt-4 text-lg sm:text-xl leading-relaxed text-slate-600">{guide.lead}</p>
        <p className="mt-4 text-sm text-slate-500">
          Updated <time dateTime={guide.updated}>{fmtDate(guide.updated)}</time> · {minutes} min read
        </p>
      </header>

      {guide.embedConverter && (
        <div className="mb-10 -mx-1 sm:mx-0">
          <ConverterWidget defaultFormat={guide.embedConverter} ui={cs.ui} w={cs.w} />
        </div>
      )}

      {guide.sections.length > 2 && (
        <nav aria-label="On this page" className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-[15px]">
          <p className="mb-2 font-semibold text-slate-900">On this page</p>
          <ol className="list-decimal space-y-1 pl-5 text-slate-700 marker:text-slate-400">
            {guide.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-blue-700 hover:underline underline-offset-2">{s.h2}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="text-[17px] leading-[1.75] text-slate-700">
        <Sections sections={guide.sections} />
      </div>

      <FaqSection faqs={guide.faqs} currentLang="en" />

      {guide.sources.length > 0 && (
        <section className="mt-14" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-lg font-bold text-slate-900 mb-3">Sources and further reading</h2>
          <ul className="space-y-1.5 text-[15px] list-disc pl-5 marker:text-slate-400">
            {guide.sources.map((s) => (
              <li key={s.url}><Inline text={`[${s.label}](${s.url})`} /></li>
            ))}
          </ul>
        </section>
      )}

      <RelatedLinks tools={guide.tools} guides={guide.guides} />
    </article>
  );
};
