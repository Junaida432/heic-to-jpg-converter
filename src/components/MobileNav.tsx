'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileNav({ links, label }: { links: { href: string; label: string; active: boolean }[]; label: string }) {
  const [open, setOpen] = useState(false);
  if (!links.length) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700"
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden absolute inset-x-0 top-16 border-t border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-3 text-sm ${l.active ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
