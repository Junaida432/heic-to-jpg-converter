import React from 'react';
import { AppLink } from './AppLink';

export const NotFound: React.FC = () => (
  <div className="max-w-xl mx-auto text-center py-16">
    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Page not found</h1>
    <p className="mt-4 text-slate-600 leading-relaxed">
      The page you are looking for does not exist or has moved. You can convert your photos on the home page, or browse the guides.
    </p>
    <p className="mt-8 flex flex-wrap justify-center gap-3">
      <AppLink href="/" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Open the converter</AppLink>
      <AppLink href="/guides" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50">Read the guides</AppLink>
    </p>
  </div>
);
