import type { Locale } from '@/lib/i18n/config';

export function reportWebVitals(locale: Locale): void {
  if (typeof window === 'undefined') return;

  // Use web-vitals API if available
  import('web-vitals').then(({ onCLS, onINP, onLCP }) => {
    const sendVital = (metric: { name: string; value: number }) => {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'web_vital',
          pagePath: window.location.pathname,
          locale,
          metric: metric.name,
          value: metric.value,
          sessionId: sessionStorage.getItem('sc_sid') || '',
        }),
        keepalive: true,
      }).catch(() => {});
    };

    onCLS(sendVital);
    onINP(sendVital);
    onLCP(sendVital);
  }).catch(() => {});
}
