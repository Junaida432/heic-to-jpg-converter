import React from 'react';
import { SupportedLang } from '../types';
import { getConfig, getConverterStrings, getHomeSections } from '../i18n';
import { ConverterWidget } from './ConverterWidget';
import { HowToGuide } from './HowToGuide';
import { ComparisonTable } from './ComparisonTable';
import { FaqSection } from './FaqSection';
import { Prose, Sections } from './LongForm';
import { RelatedLinks } from './RelatedLinks';
import { TOOL_LONG_FORM } from '@locales/en/content/tools';

export const ToolPage: React.FC<{ lang: SupportedLang; routeKey: string }> = ({ lang, routeKey }) => {
  const cfg = getConfig(lang, routeKey);
  const cs = getConverterStrings(lang);
  const longForm = lang === 'en' ? TOOL_LONG_FORM[routeKey] : undefined;
  const localSections = lang !== 'en' && routeKey === '/' ? getHomeSections(lang) : undefined;

  return (
    <>
      <div className="text-center max-w-3xl mx-auto mb-8">
        {cfg.badge && (
          <p className="mb-3 inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">{cfg.badge}</p>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">{cfg.h1}</h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">{cfg.subheading}</p>
      </div>

      <ConverterWidget key={`${lang}-${routeKey}`} defaultFormat={cfg.defaultFormat} ui={cs.ui} w={cs.w} />

      {longForm ? (
        <>
          <Prose>
            <Sections sections={longForm.sections} />
          </Prose>
          <ComparisonTable config={cfg} currentLang={lang} />
          <FaqSection faqs={cfg.faqs} currentLang={lang} />
          <RelatedLinks tools={longForm.tools.filter((t) => t !== routeKey)} guides={longForm.guides} />
        </>
      ) : localSections ? (
        <>
          <Prose>
            <Sections sections={localSections} />
          </Prose>
          <ComparisonTable config={cfg} currentLang={lang} />
          <FaqSection faqs={cfg.faqs} currentLang={lang} />
        </>
      ) : (
        <>
          <HowToGuide currentLang={lang} />
          <ComparisonTable config={cfg} currentLang={lang} />
          <FaqSection faqs={cfg.faqs} currentLang={lang} />
        </>
      )}
    </>
  );
};
