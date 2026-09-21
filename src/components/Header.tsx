import React from 'react';
import { Layers } from 'lucide-react';
import { SupportedLang } from '../types';
import { getUi, getChrome, getNavLabels, buildLangPath, hasSubpages } from '../i18n';
import { LanguageSelector } from './LanguageSelector';
import { MobileNav } from './MobileNav';
import { AppLink } from './AppLink';

interface HeaderProps {
  currentLang: SupportedLang;
  currentRouteKey: string;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, currentRouteKey }) => {
  const ui = getUi(currentLang);
  const chrome = getChrome(currentLang);
  const nav = getNavLabels(currentLang);
  const links: { key: string; label: string }[] = !hasSubpages(currentLang)
    ? []
    : [
        { key: '/heic-to-jpg', label: ui.navJpg },
        { key: '/heic-to-png', label: ui.navPng },
        { key: '/heic-to-webp', label: ui.navWebp },
        ...(currentLang === 'en' ? [{ key: '/heic-to-pdf', label: 'HEIC to PDF' }] : []),
        { key: '/batch-heic-converter', label: ui.navBatch },
        ...(currentLang === 'en' ? [{ key: '/guides', label: 'Guides' }] : [])
      ];
  const isActive = (key: string) => currentRouteKey === key || (key === '/guides' && currentRouteKey.startsWith('/guides'));
  const items = links.map((l) => ({ href: buildLangPath(currentLang, l.key), label: l.label, active: isActive(l.key) }));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <AppLink href={buildLangPath(currentLang, '/')} className="flex shrink-0 items-center gap-2.5" aria-label={`HEIC2 – ${nav.home}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Layers className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900">HEIC2</span>
        </AppLink>

        {items.length > 0 && (
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {items.map((l) => (
              <AppLink
                key={l.href}
                href={l.href}
                aria-current={l.active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 ${l.active ? 'bg-blue-50 font-semibold text-blue-700' : 'hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {l.label}
              </AppLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <LanguageSelector currentLang={currentLang} currentRouteKey={currentRouteKey} label={chrome.changeLanguage} />
          <MobileNav links={items} label={chrome.toggleMenu} />
        </div>
      </div>
    </header>
  );
};
