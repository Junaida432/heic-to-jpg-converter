import type { Metadata } from 'next';
import { NotFound } from '@/components/NotFound';

export const metadata: Metadata = { title: 'Page not found | HEIC2', robots: { index: false, follow: true } };

export default function NotFoundPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <NotFound />
    </main>
  );
}
