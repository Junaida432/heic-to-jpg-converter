import React from 'react';
import { Block, Section } from '../content/types';
import { Inline } from './Inline';

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case 'p':
      return <p className="mb-5"><Inline text={block.text} /></p>;
    case 'h3':
      return <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">{block.text}</h3>;
    case 'ul':
      return (
        <ul className="mb-6 space-y-2.5 pl-5 list-disc marker:text-blue-400">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1"><Inline text={it} /></li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="mb-6 space-y-2.5 pl-6 list-decimal marker:text-blue-600 marker:font-semibold">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1"><Inline text={it} /></li>
          ))}
        </ol>
      );
    case 'note':
      return (
        <aside className="mb-6 border-l-4 border-blue-500 bg-blue-50/60 pl-4 pr-3 py-3 text-[15px] leading-relaxed text-slate-700">
          {block.title && <p className="font-semibold text-slate-900 mb-1">{block.title}</p>}
          <p><Inline text={block.text} /></p>
        </aside>
      );
    case 'code':
      return (
        <figure className="mb-6">
          {block.label && <figcaption className="text-xs font-medium text-slate-500 mb-1">{block.label}</figcaption>}
          <pre className="overflow-x-auto rounded-lg bg-slate-900 text-slate-100 text-sm leading-relaxed p-4"><code>{block.text}</code></pre>
        </figure>
      );
    case 'table':
      return (
        <div className="mb-8 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[520px] text-left text-[15px] leading-snug">
            {block.caption && <caption className="p-3 text-left text-sm text-slate-500">{block.caption}</caption>}
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-semibold border-b border-slate-200 align-bottom">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-slate-100 last:border-b-0 align-top">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-3 ${c === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function Sections({ sections, headingLevel = 2 }: { sections: Section[]; headingLevel?: 2 | 3 }) {
  const H = (headingLevel === 2 ? 'h2' : 'h3') as 'h2' | 'h3';
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24">
          <H className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 mt-14 mb-5 leading-tight">{s.h2}</H>
          {s.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </section>
      ))}
    </>
  );
}

/** Wrapper that sets the reading typography for long-form copy. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[46rem] mx-auto text-[17px] leading-[1.75] text-slate-700">{children}</div>;
}
