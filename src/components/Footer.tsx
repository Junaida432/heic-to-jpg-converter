import React from 'react';
import { AppLink } from './AppLink';
import { ShieldCheck, Globe } from 'lucide-react';
import { SupportedLang } from '../types';
import { getUi, buildLangPath, SUPPORTED_LANGUAGES, getNavLabels, getChrome, hasSubpages, resolveLangRoute } from '../i18n';
import { SITE } from '../site';

interface FooterProps {
  currentLang: SupportedLang;
  currentRouteKey: string;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, currentRouteKey }) => {
  const ui = getUi(currentLang);
  const nav = getNavLabels(currentLang);
  const chrome = getChrome(currentLang);
  const en = currentLang === 'en';
  const sub = hasSubpages(currentLang);
  // Languages without translated legal pages link to the English versions
  const legalLang = sub ? currentLang : 'en';

  const converters = [
    { key: '/heic-to-jpg', label: ui.navJpg },
    { key: '/heic-to-png', label: ui.navPng },
    { key: '/heic-to-webp', label: ui.navWebp },
    ...(en ? [{ key: '/heic-to-pdf', label: 'HEIC to PDF' }] : []),
    { key: '/batch-heic-converter', label: ui.navBatch }
  ];
  const guides = [
    { key: '/guides/how-to-convert-heic-to-jpg', label: 'How to convert HEIC to JPG' },
    { key: '/guides/how-to-open-heic-files-on-windows', label: 'Open HEIC on Windows' },
    { key: '/guides/heic-vs-jpg', label: 'HEIC vs JPG' },
    { key: '/guides/what-is-a-heic-file', label: 'What is a HEIC file?' },
    { key: '/guides', label: 'All guides' }
  ];
  const legal = [
    { key: '/about', label: nav.about },
    { key: '/contact', label: nav.contact },
    { key: '/privacy-policy', label: nav.privacy },
    { key: '/terms', label: nav.terms }
  ];

  const col = (title: string, list: { key: string; label: string }[], lang = currentLang) => (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-900">{title}</p>
      <ul className="space-y-2">
        {list.map((item) => (
          <li key={item.key}>
            <AppLink href={buildLangPath(lang, item.key)} className="text-slate-600 hover:text-blue-700 hover:underline underline-offset-2">
              {item.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="mt-24 w-full border-t border-slate-200 bg-white text-sm text-slate-600">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className={`grid grid-cols-1 gap-8 mb-10 ${en ? 'sm:grid-cols-4' : sub ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <div className="space-y-3">
            <AppLink href={buildLangPath(currentLang, '/')} className="text-base font-bold tracking-tight text-slate-900">HEIC2</AppLink>
            <p className="text-[13px] leading-relaxed text-slate-500">{ui.footerDesc}</p>
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-700">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{ui.privateBadge}</span>
            </p>
          </div>
          {sub && col(nav.converters, converters)}
          {en && col('Guides', guides)}
          {col(nav.legal, legal, legalLang)}
        </div>

        <div className="border-t border-slate-200 py-6">
          <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-slate-700">
            <Globe className="h-4 w-4 text-blue-600" aria-hidden="true" />
            <span>{chrome.languages}</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const target = buildLangPath(lang.id, resolveLangRoute(lang.id, currentRouteKey));
              const current = lang.id === currentLang;
              return (
                <li key={lang.id}>
                  <AppLink
                    href={target}
                    hrefLang={lang.code}
                    lang={lang.code}
                    prefetch={false}
                    aria-current={current ? 'true' : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs ${current ? 'border-blue-200 bg-blue-50 font-semibold text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    <span aria-hidden="true">{lang.flag}</span>
                    <span>{lang.localName}</span>
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {SITE.copyrightYear} {SITE.name} (heic2.tools). {ui.footerRights}
        </p>
      </div>
    </footer>
  );
};
