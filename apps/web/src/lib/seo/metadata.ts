import type { Metadata } from 'next';
import { locales, localeConfig, type Locale } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://supacamp.com';
const SITE_NAME = 'Supacamp';

interface SEOParams {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  article?: {
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
  };
  noindex?: boolean;
}

function getAbsoluteUrl(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${cleanPath}`;
}

function getAlternateLanguages(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[localeConfig[locale].hreflang] = getAbsoluteUrl(locale, path);
  }
  alternates['x-default'] = getAbsoluteUrl('en', path);
  return alternates;
}

export function generatePageMetadata({
  locale,
  path,
  title,
  description,
  image,
  article,
  noindex = false,
}: SEOParams): Metadata {
  const url = getAbsoluteUrl(locale, path);
  const ogImage = image || `${SITE_URL}/og/${locale}/default.png`;
  const config = localeConfig[locale];

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: config.ogLocale,
      type: article ? 'article' : 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: [article.author],
        tags: article.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export { SITE_URL, SITE_NAME, getAbsoluteUrl, getAlternateLanguages };
