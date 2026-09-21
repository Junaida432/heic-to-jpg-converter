import React from 'react';
import { AppLink } from './AppLink';
import { GUIDES, readingMinutes } from '@locales/en/content/guides';
import { GUIDES_INDEX_META } from '../head';
import { Breadcrumbs } from './Breadcrumbs';

export const GuidesIndex: React.FC = () => (
  <div className="max-w-[46rem] mx-auto">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />
    <h1 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">{GUIDES_INDEX_META.h1}</h1>
    <p className="mt-4 text-lg text-slate-600 leading-relaxed">
      Plain-language answers about HEIC photos: what they are, how to open them, and how to convert them without uploading anything.
    </p>
    <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
      {GUIDES.map((g) => (
        <li key={g.slug} className="py-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            <AppLink href={`/guides/${g.slug}`} className="hover:text-blue-700 hover:underline underline-offset-2">{g.h1}</AppLink>
          </h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-slate-600">{g.lead}</p>
          <p className="mt-2 text-xs text-slate-500">{readingMinutes(g)} min read</p>
        </li>
      ))}
    </ul>
    <p className="mt-10 text-[15px] text-slate-600">
      Ready to convert? Use the <AppLink href="/heic-to-jpg" className="text-blue-700 font-medium underline underline-offset-2">HEIC to JPG converter</AppLink> or the{' '}
      <AppLink href="/batch-heic-converter" className="text-blue-700 font-medium underline underline-offset-2">batch converter</AppLink>.
    </p>
  </div>
);
