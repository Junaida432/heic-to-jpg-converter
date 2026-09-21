import '../globals.css';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { SUPPORTED_LANGUAGES, getLangInfo } from '@/i18n/languages';

// One directory per language: /es/..., /ja/... . English is served from the same tree and
// exposed without prefix through the rewrites in next.config.mjs.
export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((l) => ({ lang: l.id }));
}

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!SUPPORTED_LANGUAGES.some((l) => l.id === lang)) notFound();
  const info = getLangInfo(lang as never);
  return (
    <html lang={info.code} dir={info.dir}>
      <body>{children}</body>
    </html>
  );
}
