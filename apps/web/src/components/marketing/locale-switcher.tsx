'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { locales, type Locale, localeConfig } from '@/lib/i18n/config';
import { useState, useRef, useEffect } from 'react';

const FLAG: Record<Locale, string> = {
  en: '🇬🇧', fr: '🇫🇷', es: '🇪🇸', de: '🇩🇪', pt: '🇧🇷',
  ja: '🇯🇵', ko: '🇰🇷', zh: '🇨🇳', ar: '🇸🇦', hi: '🇮🇳',
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function switchLocale(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Change language"
      >
        <span>{FLAG[locale]}</span>
        <span className="hidden sm:inline text-gray-600">{localeConfig[locale].nativeName}</span>
        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50 max-h-80 overflow-y-auto">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-gray-50 transition-colors ${
                l === locale ? 'bg-gray-50 font-medium' : 'text-gray-700'
              }`}
            >
              <span>{FLAG[l]}</span>
              <span>{localeConfig[l].nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
