/**
 * Post-build SEO checks against a running server.
 *   npm run build && npm start   (in one terminal)
 *   BASE_URL=http://localhost:3000 npm run verify   (in another)
 */
import { listAllRoutes } from '../src/routesList';
import { SITE } from '../src/site';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const routes = listAllRoutes();
const pathSet = new Set(routes.map((r) => r.path));
const errors: string[] = [];
const warnings: string[] = [];
const titles = new Map<string, string>();
const descs = new Map<string, string>();
const wordCounts: { path: string; words: number }[] = [];

const strip = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
// the root URL is written without a trailing slash by Next.js metadata – both forms are the same URL
const abs = (p: string) => `${SITE.url}${p === '/' ? '' : p}`;

async function get(path: string, init?: RequestInit) {
  return fetch(BASE + path, { redirect: 'manual', ...init });
}

async function main() {
  const pages = new Map<string, string>();
  const CONC = 8;
  for (let i = 0; i < routes.length; i += CONC) {
    await Promise.all(
      routes.slice(i, i + CONC).map(async (r) => {
        const res = await get(r.path);
        if (res.status !== 200) return errors.push(`${r.path}: status ${res.status}`);
        pages.set(r.path, await res.text());
      })
    );
  }

  for (const r of routes) {
    const html = pages.get(r.path);
    if (!html) continue;
    const m = (re: RegExp) => html.match(re)?.[1];
    const title = m(/<title>([\s\S]*?)<\/title>/);
    const desc = m(/<meta name="description" content="([^"]*)"/);
    const canonical = m(/<link rel="canonical" href="([^"]*)"/);
    const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
    const lang = m(/<html lang="([^"]*)"/);

    if (!title) errors.push(`${r.path}: no <title>`);
    else {
      if (titles.has(title)) errors.push(`${r.path}: duplicate title with ${titles.get(title)}`);
      titles.set(title, r.path);
      if (title.length > 70) warnings.push(`${r.path}: title is ${title.length} chars`);
    }
    if (!desc) errors.push(`${r.path}: no meta description`);
    else {
      if (descs.has(desc)) errors.push(`${r.path}: duplicate description with ${descs.get(desc)}`);
      descs.set(desc, r.path);
      if (desc.length > 175) warnings.push(`${r.path}: description is ${desc.length} chars`);
    }
    if (canonical !== abs(r.path)) errors.push(`${r.path}: canonical is ${canonical}`);
    if (h1s !== 1) errors.push(`${r.path}: ${h1s} <h1> elements`);
    if (!lang) errors.push(`${r.path}: <html> has no lang`);
    if (/aggregateRating/.test(html)) errors.push(`${r.path}: contains aggregateRating (fake ratings are not allowed)`);

    for (const j of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(j[1]); } catch { errors.push(`${r.path}: invalid JSON-LD`); }
    }
    for (const h of html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)) {
      const target = h[2].replace(SITE.url, '') || '/';
      if (!pathSet.has(target)) errors.push(`${r.path}: hreflang ${h[1]} -> unknown ${target}`);
      else if (!pages.get(target)?.includes(`href="${abs(r.path)}"`)) errors.push(`${r.path}: ${target} does not link back (hreflang)`);
    }
    for (const a of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
      const href = a[1].replace(/\/+$/, '') || '/';
      if (/\.(png|xml|xsl|json|txt|ico|js|css|html)$/.test(href) || href.startsWith('/_next')) continue;
      if (!pathSet.has(href)) errors.push(`${r.path}: broken internal link ${href}`);
    }

    // English interface strings must never appear on a translated page
    if (r.lang !== 'en') {
      for (const leak of ['Skip to content', '>Languages<', 'aria-label="Change language"', 'aria-label="Toggle menu"', 'aria-label="Breadcrumb"']) {
        if (html.includes(leak)) errors.push(`${r.path}: English UI string left on a translated page: ${leak}`);
      }
    }
    const text = strip(html.slice(html.indexOf('<body')));
    wordCounts.push({ path: r.path, words: text.split(' ').length });
    if (r.lang !== 'en' && r.routeKey === '/') {
      const min = ['cn', 'tw', 'ja', 'ko'].includes(r.lang) ? 2200 : ['he', 'th'].includes(r.lang) ? 3800 : 4000;
      if (text.length < min) errors.push(`${r.path}: home page has only ${text.length} characters of copy (minimum ${min})`);
    }
  }

  // sitemap
  const sm = await (await get('/sitemap.xml')).text();
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1].replace(SITE.url, '') || '/');
  for (const r of routes) if (!locs.includes(r.path)) errors.push(`sitemap missing ${r.path}`);
  for (const l of locs) if (!pathSet.has(l)) errors.push(`sitemap lists unknown ${l}`);

  // status behaviour
  const expect = async (path: string, status: number, loc?: string) => {
    const res = await get(path);
    if (res.status !== status) errors.push(`${path}: expected ${status}, got ${res.status}`);
    if (loc && !(res.headers.get('location') || '').endsWith(loc)) errors.push(`${path}: expected redirect to ${loc}`);
  };
  await expect('/definitely-not-a-page', 404);
  await expect('/es/guides', 404);
  await expect('/guides/not-a-guide', 404);
  await expect('/en', 308, '/');
  await expect('/en/heic-to-jpg', 308, '/heic-to-jpg');

  console.log('English pages – visible words:');
  for (const w of wordCounts.filter((x) => !/^\/(cn|es|fr|de|ru|ar|it|pt|ja|ko|tr|id|vi|ur|tw|nl|pl|sv|da|no|fi|he|cs|hu|el|th)(\/|$)/.test(x.path))) console.log(`  ${String(w.words).padStart(5)}  ${w.path}`);
  console.log(`\nPages checked: ${routes.length} | sitemap URLs: ${locs.length}`);
  if (warnings.length) console.log('\nWarnings:\n' + warnings.map((w) => '  - ' + w).join('\n'));
  if (errors.length) {
    console.log('\nERRORS:\n' + errors.map((e) => '  - ' + e).join('\n'));
    process.exit(1);
  }
  console.log('\n✔ All hard checks passed');
}

main();
