'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SupportedLang } from '../types';
import { SUPPORTED_LANGUAGES, getLangInfo, buildLangPath, resolveLangRoute } from '../i18n/languages';

interface Props {
  currentLang: SupportedLang;
  currentRouteKey: string;
  label: string;
}

export const LanguageSelector: React.FC<Props> = ({ currentLang, currentRouteKey, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = getLangInfo(currentLang);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={label}
      >
        <Globe className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        <span aria-hidden="true">{active.flag}</span>
        <span className="hidden sm:inline">{active.localName}</span>
        <span className="sm:hidden uppercase">{active.id}</span>
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-56 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const target = buildLangPath(lang.id, resolveLangRoute(lang.id, currentRouteKey));
            const selected = lang.id === currentLang;
            return (
              <li key={lang.id}>
                <a
                  href={target}
                  hrefLang={lang.code}
                  lang={lang.code}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-sm ${selected ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{lang.flag}</span>
                    <span>{lang.localName}</span>
                  </span>
                  {selected && <Check className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
