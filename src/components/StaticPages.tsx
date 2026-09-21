import React from 'react';
import { SupportedLang } from '../types';
import { getLegal, getNavLabels, getChrome, buildLangPath } from '../i18n';
import { ContactForm } from './ContactForm';
import { EN_STATIC } from '@locales/en/content/static';
import { Breadcrumbs } from './Breadcrumbs';
import { Sections } from './LongForm';
import { StaticType } from '../i18n/languages';

interface StaticPageProps {
  pageType: StaticType;
  currentLang: SupportedLang;
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}

export const StaticPage: React.FC<StaticPageProps> = ({ pageType, currentLang }) => {
  if (currentLang === 'en') {
    const page = EN_STATIC[pageType];
    return (
      <article className="max-w-[46rem] mx-auto">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: page.title }]} />
        <h1 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">{page.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{page.summary}</p>
        <p className="mt-3 text-sm text-slate-500">
          Last updated <time dateTime={page.updated}>{fmtDate(page.updated)}</time>
        </p>
        <div className="text-[17px] leading-[1.75] text-slate-700">
          <Sections sections={page.sections} />
        </div>
        {pageType === 'contact' && process.env.BACKEND_URL ? <ContactForm /> : null}
      </article>
    );
  }

  const t = getLegal(currentLang)!;
  const nav = getNavLabels(currentLang);
  const data =
    pageType === 'privacy-policy' ? t.privacyPolicy : pageType === 'terms' ? t.terms : pageType === 'about' ? t.about : t.contact;
  const isRtl = currentLang === 'ar';
  const contact = pageType === 'contact' && 'contactEmail' in data ? (data as typeof t.contact) : null;

  return (
    <article className="max-w-[46rem] mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <Breadcrumbs label={getChrome(currentLang).breadcrumb} items={[{ label: nav.home, href: buildLangPath(currentLang, '/') }, { label: data.title }]} />
      <h1 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">{data.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{data.summary}</p>
      {contact && (
        <p className="mt-6 text-lg">
          <span className="text-slate-500 text-sm block mb-1">{contact.emailLabel}</span>
          <a className="font-semibold text-blue-700 underline underline-offset-2" href={`mailto:${contact.contactEmail}`}>{contact.contactEmail}</a>
        </p>
      )}
      <div className="text-[17px] leading-[1.75] text-slate-700">
        {data.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-12 mb-4 leading-tight">{s.title}</h2>
            <p className="mb-5">{s.content}</p>
          </section>
        ))}
      </div>
    </article>
  );
};
