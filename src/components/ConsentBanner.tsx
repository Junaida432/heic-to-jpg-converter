'use client';

import React, { useEffect, useState } from 'react';
import { loadAnalytics, readConsent, storeConsent } from '../analytics';

interface Props {
  text: string;
  link: string;
  decline: string;
  accept: string;
  privacyHref: string;
}

export const ConsentBanner: React.FC<Props> = ({ text, link, decline, accept, privacyHref }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (c === 'granted') loadAnalytics();
    if (c === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (v: 'granted' | 'denied') => {
    storeConsent(v);
    if (v === 'granted') loadAnalytics();
    setVisible(false);
  };

  return (
    <div role="region" aria-label="Cookies" className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white p-4 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-700">
          {text}{' '}
          <a href={privacyHref} className="font-medium text-blue-700 underline underline-offset-2">{link}</a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose('denied')} className="min-h-[42px] rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">{decline}</button>
          <button type="button" onClick={() => choose('granted')} className="min-h-[42px] rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700">{accept}</button>
        </div>
      </div>
    </div>
  );
};
