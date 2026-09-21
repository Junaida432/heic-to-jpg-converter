import React from 'react';
import { AppLink } from './AppLink';

export function Breadcrumbs({ items, label = 'Breadcrumb' }: { items: { label: string; href?: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="text-sm text-slate-500 mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? (
              <AppLink href={it.href} className="hover:text-blue-700 underline-offset-2 hover:underline">{it.label}</AppLink>
            ) : (
              <span aria-current="page" className="text-slate-800 font-medium">{it.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true" className="text-slate-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
