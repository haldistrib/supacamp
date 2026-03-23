import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { JsonLdScript } from '@/components/seo';
import { organizationJsonLd, websiteJsonLd, faqJsonLd } from '@/lib/seo/json-ld';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '',
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

export default function HomePage() {
  const t = useTranslations('marketing');
  const tCommon = useTranslations('common');
  const tFaq = useTranslations('marketing.faq');

  return (
    <>
      <JsonLdScript data={[organizationJsonLd(), websiteJsonLd('en')]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center paper-texture">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-ink-700 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">{t('hero.cta')}</Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">{t('hero.secondaryCta')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-paper-warm border-y border-ink-100">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 px-4">
          <div className="text-center">
            <span className="font-heading text-3xl text-primary-500">500+</span>
            <p className="text-ink-500 text-sm">{t('socialProof.teamsCreated', { count: '500+' })}</p>
          </div>
          <div className="text-center">
            <span className="font-heading text-3xl text-secondary-400">2,000+</span>
            <p className="text-ink-500 text-sm">{t('socialProof.challengesCompleted', { count: '2,000+' })}</p>
          </div>
          <div className="text-center">
            <span className="font-heading text-3xl text-tertiary-400">5,000+</span>
            <p className="text-ink-500 text-sm">{t('socialProof.videosTransformed', { count: '5,000+' })}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-16">{t('howItWorks.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(['step1', 'step2', 'step3'] as const).map((step, index) => (
              <div key={step} className="bg-white rounded-xl shadow-paper p-8 text-center hand-drawn-border">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mx-auto mb-4 font-heading text-2xl">
                  {index + 1}
                </div>
                <h3 className="font-heading text-xl mb-3">{t(`howItWorks.${step}.title`)}</h3>
                <p className="text-ink-700">{t(`howItWorks.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-paper-warm paper-texture">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-16">{tCommon('features')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['aiVideo', 'teams', 'challenges', 'leaderboard', 'safety', 'rewards'] as const).map((feature) => (
              <Link
                key={feature}
                href={`/features/${t(`features.${feature}.slug`)}`}
                className="bg-white rounded-xl shadow-paper p-6 hover:shadow-lg transition-shadow border border-ink-100"
              >
                <h3 className="font-heading text-lg mb-2">{t(`features.${feature}.title`)}</h3>
                <p className="text-ink-700 text-sm">{t(`features.${feature}.description`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-12">{tFaq('title')}</h2>
          <div className="space-y-4">
            {(['whatIs', 'isSafe', 'howAiWorks', 'cost', 'age'] as const).map((item) => (
              <details key={item} className="bg-white rounded-xl shadow-paper p-6 border border-ink-100 group">
                <summary className="font-heading text-lg cursor-pointer list-none flex justify-between items-center">
                  {tFaq(`items.${item}.question`)}
                  <span className="text-ink-300 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <p className="mt-4 text-ink-700">{tFaq(`items.${item}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-500 text-white text-center torn-edge-top">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl mb-4">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.subtitle')}</p>
          <Link href="/auth/signup">
            <Button variant="secondary" size="lg">{t('cta.button')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
