/**
 * HEIC2 backend (Node.js + Express).
 *
 * The converter itself runs in the browser – photos never reach this server. The backend only
 * handles what a static site cannot: the contact form (and a health check).
 *
 *   POST /api/contact   { email, message, website(honeypot) }
 *   GET  /api/health
 *
 * Environment:
 *   PORT                 default 4000
 *   ALLOWED_ORIGINS      comma-separated, e.g. https://www.heic2.tools (default: same origin / no CORS)
 *   CONTACT_TO           inbox that receives messages
 *   CONTACT_FROM         From address (must be allowed by your SMTP provider)
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   MAIL_TRANSPORT=json  test mode: builds the mail but does not send it
 *   TRUST_PROXY=1        set when running behind a reverse proxy / Vercel rewrite (real client IP for rate limits)
 */
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const ALLOWED = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);

app.disable('x-powered-by');
if (process.env.TRUST_PROXY) app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));

// --- CORS (only needed if the browser calls this server directly; the Next.js rewrite is same-origin)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// --- tiny in-memory rate limiter: 5 messages / hour / IP
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= 5) { hits.set(ip, list); return true; }
  list.push(now);
  hits.set(ip, list);
  return false;
}
setInterval(() => { const now = Date.now(); for (const [ip, l] of hits) if (l.every((t) => now - t > 3600000)) hits.delete(ip); }, 10 * 60 * 1000).unref();

function makeTransport() {
  if (process.env.MAIL_TRANSPORT === 'json') return nodemailer.createTransport({ jsonTransport: true });
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !process.env.CONTACT_TO) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  });
}
const transport = makeTransport();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (s) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();

app.get('/api/health', (_req, res) => res.json({ ok: true, mail: Boolean(transport) }));

app.post('/api/contact', async (req, res) => {
  const body = req.body || {};
  if (clean(body.website)) return res.json({ ok: true }); // honeypot: pretend success to bots

  const email = clean(body.email);
  const message = clean(body.message);
  if (!EMAIL_RE.test(email) || email.length > 200) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (message.length < 10 || message.length > 4000) return res.status(400).json({ error: 'Please write a message between 10 and 4000 characters.' });
  if (!transport) return res.status(503).json({ error: 'The contact form is not available right now. Please email us directly.' });
  if (rateLimited(req.ip)) return res.status(429).json({ error: 'Too many messages. Please try again later.' });

  try {
    const info = await transport.sendMail({
      from: process.env.CONTACT_FROM || process.env.CONTACT_TO || 'contact@localhost',
      to: process.env.CONTACT_TO || 'inbox@localhost',
      replyTo: email,
      subject: 'HEIC2 contact form',
      text: `From: ${email}\n\n${message}\n`
    });
    // nothing is stored on this server – only log that a message was handled, never its content
    console.log(`[contact] message handled (${info.messageId ? 'sent' : 'built'})`);
    res.json({ ok: true, ...(process.env.MAIL_TRANSPORT === 'json' ? { test: JSON.parse(info.message) } : {}) });
  } catch (err) {
    console.error('[contact] mail error:', err.message);
    res.status(502).json({ error: 'Could not send the message. Please email us directly.' });
  }
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`HEIC2 backend listening on :${PORT} (mail ${transport ? 'configured' : 'NOT configured'})`));
