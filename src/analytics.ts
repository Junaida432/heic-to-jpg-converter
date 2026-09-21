import { SITE } from './site';

const KEY = 'heic2-consent';
export type Consent = 'granted' | 'denied' | null;

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function storeConsent(v: 'granted' | 'denied') {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* storage unavailable: the choice just will not persist */
  }
}

let loaded = false;

/** Google Analytics is only loaded after the visitor accepts – nothing is sent before that. */
export function loadAnalytics() {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', SITE.gaMeasurementId, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.gaMeasurementId}`;
  document.head.appendChild(s);
}

export function trackPageView(path: string, title: string) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (loaded && typeof w.gtag === 'function') {
    w.gtag('event', 'page_view', { page_path: path, page_title: title });
  }
}
