import type { Locale } from '@/lib/i18n/config';

interface AnalyticsEvent {
  eventType: string;
  pagePath: string;
  locale: Locale;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  sessionId: string;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const key = 'sc_sid';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

function getUtmParams(): { utmSource: string | null; utmMedium: string | null; utmCampaign: string | null } {
  if (typeof window === 'undefined') return { utmSource: null, utmMedium: null, utmCampaign: null };
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  };
}

export async function trackEvent(eventType: string, locale: Locale): Promise<void> {
  try {
    const utm = getUtmParams();
    const event: AnalyticsEvent = {
      eventType,
      pagePath: window.location.pathname,
      locale,
      referrer: document.referrer || null,
      ...utm,
      deviceType: getDeviceType(),
      sessionId: getSessionId(),
    };

    // Send to our own API endpoint — no third-party tracking
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      keepalive: true,
    });
  } catch {
    // Silently fail — analytics should never break the app
  }
}

export function trackPageView(locale: Locale): void {
  trackEvent('page_view', locale);
}
