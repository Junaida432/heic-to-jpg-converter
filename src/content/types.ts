import { FaqItem, TargetFormat } from '../types';

/** Inline markup supported inside strings: [label](url), **bold**, `code`. */
export type Block =
  | { t: 'p'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'note'; title?: string; text: string }
  | { t: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { t: 'code'; text: string; label?: string };

export interface Section {
  id: string;
  h2: string;
  blocks: Block[];
}

export interface ToolLongForm {
  sections: Section[];
  /** Guide slugs shown under "Related guides". */
  guides: string[];
  /** Tool routes shown under "Other converters". */
  tools: string[];
}

export interface Guide {
  slug: string;
  /** <title> without the brand suffix (added automatically). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Short summary shown under the H1. */
  lead: string;
  /** ISO dates */
  published: string;
  updated: string;
  sections: Section[];
  faqs: FaqItem[];
  /** Tools linked from the guide. */
  tools: string[];
  /** Other guide slugs. */
  guides: string[];
  /** Authoritative external sources cited in the article. */
  sources: { label: string; url: string }[];
  /** Embed the converter widget below the lead (for how-to-convert guides). */
  embedConverter?: TargetFormat;
}
