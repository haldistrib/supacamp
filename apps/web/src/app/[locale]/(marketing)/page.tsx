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
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {t('hero.subtitle')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink-900 mb-6 leading-[1.1]">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-ink-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/sign-up">
              <Button size="lg">{t('hero.cta')}</Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">{t('hero.secondaryCta')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12 md:gap-20 px-4">
          <div className="text-center">
            <span className="text-3xl font-bold text-ink-900">500+</span>
            <p className="text-ink-500 text-sm mt-1">{t('socialProof.teamsCreated', { count: '500+' })}</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-ink-900">2,000+</span>
            <p className="text-ink-500 text-sm mt-1">{t('socialProof.challengesCompleted', { count: '2,000+' })}</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-ink-900">5,000+</span>
            <p className="text-ink-500 text-sm mt-1">{t('socialProof.videosTransformed', { count: '5,000+' })}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('howItWorks.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(['step1', 'step2', 'step3'] as const).map((step, index) => (
              <div key={step} className="relative p-8 rounded-2xl bg-gray-50 hover:bg-gray-100/80 transition-colors">
                <div className="w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center mb-5 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(`howItWorks.${step}.title`)}</h3>
                <p className="text-ink-500 leading-relaxed">{t(`howItWorks.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{tCommon('features')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(['aiVideo', 'teams', 'challenges', 'leaderboard', 'safety', 'rewards'] as const).map((feature) => (
              <Link
                key={feature}
                href={`/features/${t(`features.${feature}.slug`)}`}
                className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-200 hover:border-gray-300 group"
              >
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary-500 transition-colors">{t(`features.${feature}.title`)}</h3>
                <p className="text-ink-500 text-sm leading-relaxed">{t(`features.${feature}.description`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{tFaq('title')}</h2>
          </div>
          <div className="space-y-3">
            {(['whatIs', 'isSafe', 'howAiWorks', 'cost', 'age'] as const).map((item) => (
              <details key={item} className="group rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <summary className="font-medium text-ink-900 cursor-pointer list-none flex justify-between items-center p-5">
                  {tFaq(`items.${item}.question`)}
                  <svg className="w-5 h-5 text-ink-300 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-ink-500 leading-relaxed">{tFaq(`items.${item}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-ink-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('cta.title')}</h2>
          <p className="text-lg text-gray-400 mb-8">{t('cta.subtitle')}</p>
          <Link href="/sign-up">
            <Button variant="secondary" size="lg">{t('cta.button')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
