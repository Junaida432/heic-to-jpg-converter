import React from 'react';
import { ParsedPath, buildLangPath, getLangInfo, hasSubpages } from '../i18n/languages';
import { getBanner, getChrome } from '../i18n';
import { getGuide } from '@locales/en/content/guides';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToolPage } from './ToolPage';
import { StaticPage } from './StaticPages';
import { GuidesIndex } from './GuidesIndex';
import { GuidePage } from './GuidePage';
import { NotFound } from './NotFound';
import { ConsentBanner } from './ConsentBanner';

/** Renders one page (server component). Client-side JS is limited to the converter, menus and cookie banner. */
export function PageView({ parsed }: { parsed: ParsedPath }) {
  const langInfo = getLangInfo(parsed.lang);
  const banner = getBanner(parsed.lang);
  const chrome = getChrome(parsed.lang);

  let body: React.ReactNode;
  switch (parsed.kind) {
    case 'tool':
      body = <ToolPage lang={parsed.lang} routeKey={parsed.routeKey} />;
      break;
    case 'static':
      body = <StaticPage pageType={parsed.staticType!} currentLang={parsed.lang} />;
      break;
    case 'guides-index':
      body = <GuidesIndex />;
      break;
    case 'guide':
      body = <GuidePage guide={getGuide(parsed.guideSlug!)!} />;
      break;
    default:
      body = <NotFound />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-slate-900 font-sans" dir={langInfo.dir}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {chrome.skip}
      </a>
      <Header currentLang={parsed.lang} currentRouteKey={parsed.routeKey} />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
        {body}
      </main>
      <Footer currentLang={parsed.lang} currentRouteKey={parsed.routeKey} />
      <ConsentBanner
        text={banner.text}
        link={banner.link}
        decline={banner.decline}
        accept={banner.accept}
        privacyHref={buildLangPath(hasSubpages(parsed.lang) ? parsed.lang : 'en', '/privacy-policy')}
      />
    </div>
  );
}
