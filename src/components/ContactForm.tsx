'use client';

import React, { useState } from 'react';

/** Talks to the Node backend (/api/contact is proxied to BACKEND_URL). Only rendered when a backend is configured. */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setStatus('sent');
      setMessage('Thanks – your message was sent. We will reply by email.');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage((err as Error).message || 'Could not send the message. Please email us instead.');
    }
  }

  return (
    <section className="mt-14" aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading" className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Send a message</h2>
      <form onSubmit={onSubmit} className="space-y-4 text-[15px]">
        {/* honeypot: real visitors never see or fill this */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <label className="block">
          <span className="mb-1 block font-medium text-slate-800">Your email</span>
          <input name="email" type="email" required maxLength={200} className="w-full min-h-[44px] rounded-lg border border-slate-300 px-3" />
        </label>
        <label className="block">
          <span className="mb-1 block font-medium text-slate-800">Message</span>
          <textarea name="message" required minLength={10} maxLength={4000} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <p className="text-sm text-slate-500">Please do not attach or paste private photos. We use your email only to reply.</p>
        <button type="submit" disabled={status === 'sending'} className="min-h-[44px] rounded-lg bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status !== 'idle' && status !== 'sending' && (
          <p role="status" className={status === 'sent' ? 'text-emerald-700' : 'text-rose-700'}>{message}</p>
        )}
      </form>
    </section>
  );
}
