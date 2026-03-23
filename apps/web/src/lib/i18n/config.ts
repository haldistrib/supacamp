export const locales = ['en', 'fr', 'es', 'de', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

export const localeConfig: Record<Locale, {
  name: string;
  nativeName: string;
  hreflang: string;
  ogLocale: string;
  dateFormat: string;
  currency: string;
}> = {
  en: { name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dateFormat: 'MM/DD/YYYY', currency: 'USD' },
  fr: { name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dateFormat: 'DD/MM/YYYY', currency: 'EUR' },
  es: { name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dateFormat: 'DD/MM/YYYY', currency: 'EUR' },
  de: { name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dateFormat: 'DD.MM.YYYY', currency: 'EUR' },
  pt: { name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dateFormat: 'DD/MM/YYYY', currency: 'BRL' },
  ja: { name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dateFormat: 'YYYY/MM/DD', currency: 'JPY' },
  ko: { name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dateFormat: 'YYYY.MM.DD', currency: 'KRW' },
  zh: { name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dateFormat: 'YYYY-MM-DD', currency: 'CNY' },
  ar: { name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dateFormat: 'DD/MM/YYYY', currency: 'SAR' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dateFormat: 'DD/MM/YYYY', currency: 'INR' },
};
