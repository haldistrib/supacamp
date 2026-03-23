import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { JsonLdScript } from '@/components/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { faqJsonLd } from '@/lib/seo/json-ld';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';
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

const SLUG_TO_KEY: Record<string, FeatureKey> = {
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

export function generateStaticParams() {
  return Object.keys(SLUG_TO_KEY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const featureKey = SLUG_TO_KEY[slug];
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

export default function FeatureDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const featureKey = SLUG_TO_KEY[slug];

  if (!featureKey) {
    notFound();
  }

  const tFeature = useTranslations('marketing.features');
  const tDetail = useTranslations('marketing.featureDetail');
  const tHowItWorks = useTranslations(`marketing.featureDetail.howItWorks.${featureKey}`);
  const tFaq = useTranslations(`marketing.featureDetail.faq.${featureKey}`);
  const tCommon = useTranslations('common');

  const faqItems = FAQ_ITEMS.map((item) => ({
    question: tFaq(`${item}.question`),
    answer: tFaq(`${item}.answer`),
  }));

  return (
    <>
      <JsonLdScript data={faqJsonLd(faqItems)} />
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('features'), href: '/features' },
          { label: tFeature(`${featureKey}.title`), href: `/features/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="py-20 px-4 text-center paper-texture">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6">
            {tFeature(`${featureKey}.title`)}
          </h1>
          <p className="text-xl text-ink-700 max-w-2xl mx-auto">
            {tFeature(`${featureKey}.description`)}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-16">{tDetail('howItWorksTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div key={step} className="bg-white rounded-xl shadow-paper p-8 text-center hand-drawn-border">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mx-auto mb-4 font-heading text-2xl">
                  {index + 1}
                </div>
                <h3 className="font-heading text-xl mb-3">{tHowItWorks(`${step}.title`)}</h3>
                <p className="text-ink-700">{tHowItWorks(`${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-paper-warm paper-texture">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-12">{tDetail('faqTitle')}</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item} className="bg-white rounded-xl shadow-paper p-6 border border-ink-100 group">
                <summary className="font-heading text-lg cursor-pointer list-none flex justify-between items-center">
                  {tFaq(`${item}.question`)}
                  <span className="text-ink-300 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <p className="mt-4 text-ink-700">{tFaq(`${item}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary-500 text-white text-center torn-edge-top">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl mb-4">{tDetail('ctaTitle')}</h2>
          <p className="text-xl mb-8 opacity-90">{tDetail('ctaSubtitle')}</p>
          <Link href="/auth/signup">
            <Button variant="secondary" size="lg">{tDetail('ctaButton')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
