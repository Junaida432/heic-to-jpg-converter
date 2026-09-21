# HEIC2 – heic2.tools (Next.js + Node.js)

Free HEIC converter (JPG, PNG, WebP, PDF) that runs entirely in the browser.

* **Frontend:** Next.js 16 (App Router), React 19, Tailwind 4 – every page is pre-rendered (SSG).
* **Backend:** small Node.js/Express service in `backend/` (contact form + health check). Photos never reach it.
* **Languages:** one directory per language in `locales/<id>/` and in the URL (`/es/…`, `/ja/…`). English stays at the root, so no existing URL changed.

## Run

```bash
npm install
npm run dev                      # http://localhost:3000
npm run build && npm start       # production build + server
BASE_URL=http://localhost:3000 npm run verify   # SEO checks against a running server (110 pages)
```

### Optional backend (contact form)
```bash
cd backend && npm install
cp .env.example .env             # SMTP + CONTACT_TO
npm start                        # http://localhost:4000
# frontend: set BEFORE building
BACKEND_URL=http://localhost:4000 npm run build
```
`BACKEND_URL` turns on the form on `/contact` and proxies `/api/*` to the backend. Without it the site
works exactly the same and the contact page just shows the email address.

## Deploy on Vercel – checklist
1. **Replace the whole repo**, do not copy over the old Vite project. Delete: `bun.lock`, `vite.config.ts`, `index.html`, `server.ts`, `src/App.tsx`, `src/main.tsx`, `src/seoData.ts`, `scripts/prerender.tsx`, `src/i18n/*Translations.ts`, `src/i18n/packs/`. (`vercel.json` and `tsconfig.json` in this zip are hardened so stale files no longer break the build, but a clean repo is best.)
2. `vercel.json` forces **Framework = Next.js**, `npm install`, `next build`, output `.next` – this overrides an old "Vite / dist" preset in Project Settings.
3. **Node.js 20.9 or newer** (Project Settings → General → Node.js Version: 22.x). Next.js 16 fails on Node 18.
4. Root Directory must be the folder that contains `package.json` and `app/`.
5. Optional env var `BACKEND_URL` (only if you deploy `backend/`). The `backend/` folder is not part of the Vercel build.
6. If a deploy fails, the real reason is the last 30 lines of the *Build Logs* – send those.

## Deploy
* **Frontend:** Vercel (framework preset "Next.js", no extra config). Set `BACKEND_URL` in the project env if you deploy the backend.
* **Backend:** any Node host (Railway, Render, Fly, VPS). Set `PORT`, `CONTACT_TO`, `CONTACT_FROM`, `SMTP_*`, `ALLOWED_ORIGINS`, `TRUST_PROXY=1`.

## How routing works
* `app/[lang]/[[...slug]]/page.tsx` renders every page; `generateStaticParams` comes from `src/routesList.ts`.
* `next.config.mjs` rewrites unprefixed English URLs (`/heic-to-jpg` → `/en/heic-to-jpg`) and redirects `/en/…` back to the unprefixed URL (no duplicate content).
* Unknown URLs return a real 404. `/sitemap.xml` and `/robots.txt` come from `app/sitemap.ts` and `app/robots.ts` (with hreflang alternates).
* Server components load the translations; the converter (client component) only receives the strings of the current language.

## Where things live
| What | Where |
| --- | --- |
| Translations, one dir per language | `locales/<id>/*.json` (see `locales/README.md`) |
| English long-form copy, guides, legal | `locales/en/content/*.ts` |
| Site constants (brand, email, GA id) | `src/site.ts` |
| Converter engine (heic-to + canvas) / PDF writer | `src/converter.ts`, `src/pdf.ts` |
| Structured data / metadata | `src/schema.ts`, `src/head.ts` |
| Cookie consent + Google Analytics loader | `src/analytics.ts` |

## Rules worth keeping
* Never add `aggregateRating`/review markup without real visible reviews (`npm run verify` fails on it).
* Do not publish claims that are not true (benchmarks, "peer reviewed", lab tests).
* Google Analytics loads only after the visitor clicks Accept.
* Do not launch a language that no native speaker has read.
