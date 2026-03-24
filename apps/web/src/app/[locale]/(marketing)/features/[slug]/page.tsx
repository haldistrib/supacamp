import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { JsonLdScript } from '@/components/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { faqJsonLd } from '@/lib/seo/json-ld';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

const FEATURE_KEYS = [
  'aiVideo',
  'teams',
  'challenges',
  'leaderboard',
  'safety',
  'videoGallery',
  'teamVsTeam',
  'parentalControls',
  'rewards',
] as const;

type FeatureKey = (typeof FEATURE_KEYS)[number];

// English slug → feature key (canonical mapping)
const EN_SLUG_TO_KEY: Record<string, FeatureKey> = {
  'ai-video-transformation': 'aiVideo',
  'create-your-team': 'teams',
  'challenges': 'challenges',
  'leaderboard': 'leaderboard',
  'child-safety': 'safety',
  'video-gallery': 'videoGallery',
  'team-vs-team': 'teamVsTeam',
  'parental-controls': 'parentalControls',
  'rewards': 'rewards',
};

// Resolve a localized slug to its feature key by checking all locale message files
async function resolveFeatureKey(slug: string, locale: string): Promise<FeatureKey | null> {
  // First check English canonical slugs
  if (EN_SLUG_TO_KEY[slug]) return EN_SLUG_TO_KEY[slug];

  // Load the locale's messages to check translated slugs
  try {
    const t = await getTranslations({ locale, namespace: 'marketing.features' });
    for (const key of FEATURE_KEYS) {
      const localizedSlug = t(`${key}.slug`);
      if (localizedSlug === slug) return key;
    }
  } catch {
    // fallback
  }

  return null;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    try {
      const messages = (await import(`@/messages/${locale}.json`)).default;
      const features = messages?.marketing?.features;
      if (features) {
        for (const key of FEATURE_KEYS) {
          const slug = features[key]?.slug;
          if (slug) {
            params.push({ locale, slug });
          }
        }
      }
    } catch {
      // If locale file fails, use English slugs
      for (const slug of Object.keys(EN_SLUG_TO_KEY)) {
        params.push({ locale, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const featureKey = await resolveFeatureKey(slug, locale);
  if (!featureKey) return {};

  const t = await getTranslations({ locale, namespace: 'marketing.features' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: `/features/${slug}`,
    title: t(`${featureKey}.metaTitle`),
    description: t(`${featureKey}.metaDescription`),
  });
}

const STEPS = ['step1', 'step2', 'step3'] as const;
const FAQ_ITEMS = ['q1', 'q2', 'q3'] as const;

export default async function FeatureDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const featureKey = await resolveFeatureKey(slug, locale);

  if (!featureKey) {
    notFound();
  }

  const tFeature = await getTranslations({ locale, namespace: 'marketing.features' });
  const tDetail = await getTranslations({ locale, namespace: 'marketing.featureDetail' });
  const tHowItWorks = await getTranslations({ locale, namespace: `marketing.featureDetail.howItWorks.${featureKey}` });
  const tFaq = await getTranslations({ locale, namespace: `marketing.featureDetail.faq.${featureKey}` });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const faqItems = FAQ_ITEMS.map((item) => ({
    question: tFaq(`${item}.question`),
    answer: tFaq(`${item}.answer`),
  }));

  return (
    <>
      <JsonLdScript data={faqJsonLd(faqItems)} />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('features'), href: '/features' },
          { label: tFeature(`${featureKey}.title`), href: `/features/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink-900 mb-6 leading-[1.1]">
            {tFeature(`${featureKey}.title`)}
          </h1>
          <p className="text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
            {tFeature(`${featureKey}.description`)}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16">{tDetail('howItWorksTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div key={step} className="relative p-8 rounded-2xl bg-white border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center mb-5 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{tHowItWorks(`${step}.title`)}</h3>
                <p className="text-ink-500 leading-relaxed">{tHowItWorks(`${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{tDetail('faqTitle')}</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details key={item} className="group rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <summary className="font-medium text-ink-900 cursor-pointer list-none flex justify-between items-center p-5">
                  {tFaq(`${item}.question`)}
                  <svg className="w-5 h-5 text-ink-300 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-ink-500 leading-relaxed">{tFaq(`${item}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-ink-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{tDetail('ctaTitle')}</h2>
          <p className="text-lg text-gray-400 mb-8">{tDetail('ctaSubtitle')}</p>
          <Link href="/sign-up">
            <Button variant="secondary" size="lg">{tDetail('ctaButton')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
