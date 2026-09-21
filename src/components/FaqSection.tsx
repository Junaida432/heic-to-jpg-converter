import React from 'react';
import { FaqItem, SupportedLang } from '../types';
import { getUi } from '../i18n';

interface FaqSectionProps {
  faqs: FaqItem[];
  currentLang?: SupportedLang;
}

/**
 * Native <details> accordion: every answer is present in the HTML (good for crawlers and
 * screen readers) and it needs no JavaScript to work.
 */
export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, currentLang = 'en' }) => {
  const ui = getUi(currentLang);
  if (!faqs.length) return null;
  return (
    <section className="mt-16 max-w-[46rem] mx-auto" id="frequently-asked-questions" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 mb-2 leading-tight">
        {ui.faqTitle}
      </h2>
      <p className="text-slate-600 mb-6 text-[15px]">{ui.faqSub}</p>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group py-1" {...(idx === 0 ? { open: true } : {})}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-semibold text-slate-900 text-[16px] leading-snug [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-blue-600 rounded">
              <span>{faq.question}</span>
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-blue-600 text-xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 pr-8 text-[15.5px] leading-relaxed text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
