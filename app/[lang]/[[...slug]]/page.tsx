import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { parsePath } from '@/i18n/languages';
import { listAllRoutes } from '@/routesList';
import { getPageMeta, toMetadata } from '@/head';
import { PageView } from '@/components/PageView';

export const dynamicParams = false;

/** Every URL of the site, pre-rendered at build time. */
export function generateStaticParams() {
  return listAllRoutes().map((r) => {
    const parts = r.path.split('/').filter(Boolean);
    const slug = r.lang === 'en' ? parts : parts.slice(1);
    return { lang: r.lang, slug };
  });
}

function resolve(lang: string, slug?: string[]) {
  const rest = (slug ?? []).join('/');
  const path = lang === 'en' ? `/${rest}` : `/${lang}${rest ? '/' + rest : ''}`;
  return parsePath(path);
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const parsed = resolve(lang, slug);
  if (parsed.kind === 'not-found') return {};
  return toMetadata(parsed);
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug } = await params;
  const parsed = resolve(lang, slug);
  if (parsed.kind === 'not-found') notFound();
  const { jsonLd } = getPageMeta(parsed);
  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/</g, '\\u003c') }} />}
      <PageView parsed={parsed} />
    </>
  );
}
