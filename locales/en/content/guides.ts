import { Guide } from '@/content/types';
import { GUIDE_SLUG_REGISTRY } from '@/i18n/languages';
import { guideWhatIsHeic, guideConvertToJpg, guideOpenOnWindows } from './guides1';
import { guideHeicVsJpg, guideStopHeic, guideQuality } from './guides2';
import { guideHeicToPdf, guideOpenOnAndroid, guideHeicVsHeif } from './guides3';

/** Display order on the /guides index page. */
export const GUIDES: Guide[] = [
  guideConvertToJpg,
  guideWhatIsHeic,
  guideOpenOnWindows,
  guideHeicVsJpg,
  guideStopHeic,
  guideQuality,
  guideHeicToPdf,
  guideOpenOnAndroid,
  guideHeicVsHeif
];

GUIDE_SLUG_REGISTRY.slugs = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Rough reading time from the visible text. */
export function readingMinutes(guide: Guide): number {
  const text: string[] = [guide.lead];
  for (const s of guide.sections) {
    text.push(s.h2);
    for (const b of s.blocks) {
      if ('text' in b) text.push(b.text);
      if ('items' in b) text.push(...b.items);
      if (b.t === 'table') text.push(...b.head, ...b.rows.flat());
    }
  }
  for (const f of guide.faqs) text.push(f.question, f.answer);
  const words = text.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}
