import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { JsonLdScript } from '@/components/seo';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
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

      {/* ═══════ HERO — Collage editorial ═══════ */}
      <section className="relative overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 dots-pattern opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left — Text */}
            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-widest text-primary-500 mb-4">
                {t('hero.secondaryCta')}
              </p>
              <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6 tracking-wide leading-[1.1]">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-ink-500 mb-8 max-w-md leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/sign-up">
                  <Button size="lg">{t('hero.cta')}</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">{tCommon('about')}</Button>
                </Link>
              </div>

              {/* Social proof — stamp style */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-ink-100">
                <div>
                  <span className="font-heading text-3xl text-primary-500">500+</span>
                  <p className="text-ink-500 text-xs mt-1">{t('socialProof.teamsCreated', { count: '500+' })}</p>
                </div>
                <div>
                  <span className="font-heading text-3xl text-secondary-400">2k+</span>
                  <p className="text-ink-500 text-xs mt-1">{t('socialProof.challengesCompleted', { count: '2,000+' })}</p>
                </div>
                <div>
                  <span className="font-heading text-3xl text-tertiary-400">5k+</span>
                  <p className="text-ink-500 text-xs mt-1">{t('socialProof.videosTransformed', { count: '5,000+' })}</p>
                </div>
              </div>
            </div>

            {/* Right — Collage */}
            <div className="relative h-[480px] md:h-[560px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[75%] h-[65%] collage-img collage-img-1 rounded-2xl overflow-hidden z-20">
                <Image
                  src="https://images.unsplash.com/photo-1638202951770-2240942c7d1c?w=800&q=80"
                  alt="Kids in hammock in the woods"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                  priority
                />
              </div>
              {/* Secondary image */}
              <div className="absolute bottom-4 left-0 w-[55%] h-[45%] collage-img collage-img-2 rounded-2xl overflow-hidden z-30">
                <Image
                  src="https://images.unsplash.com/photo-1603961051164-e8e79358faa4?w=600&q=80"
                  alt="Boy holding camera"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 30vw"
                />
              </div>
              {/* Accent — washi tape strip */}
              <div className="absolute top-[30%] left-[10%] w-24 h-6 bg-secondary-200 opacity-70 rotate-[-8deg] z-10 rounded-sm" />
              {/* Accent — dots cluster */}
              <div className="absolute bottom-[35%] right-[5%] w-20 h-20 z-10">
                <svg viewBox="0 0 80 80" className="w-full h-full text-ink-900 opacity-20">
                  <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" fill="currentColor" />
                  </pattern>
                  <rect width="80" height="80" fill="url(#dots)" />
                </svg>
              </div>
              {/* Accent — scribble circle */}
              <div className="absolute top-[60%] right-[30%] w-16 h-16 border-2 border-primary-400 rounded-full opacity-40 z-10" style={{ borderRadius: '60% 40% 50% 50% / 40% 60% 40% 60%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS — Editorial strip ═══════ */}
      <section id="how-it-works" className="relative bg-ink-900 text-white py-20 px-4 torn-edge-top torn-edge-bottom overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl text-center mb-16 tracking-wide">{t('howItWorks.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(['step1', 'step2', 'step3'] as const).map((step, index) => (
              <div key={step} className="relative">
                <span className="font-heading text-8xl text-white/10 absolute -top-6 -left-2">
                  {index + 1}
                </span>
                <div className="relative z-10 pt-8">
                  <h3 className="font-heading text-xl mb-3 tracking-wide text-primary-400">{t(`howItWorks.${step}.title`)}</h3>
                  <p className="text-ink-300 leading-relaxed">{t(`howItWorks.${step}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES — Collage grid ═══════ */}
      <section className="py-24 px-4 paper-texture">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl tracking-wide mb-4">{tCommon('features')}</h2>
            <p className="text-ink-500 max-w-lg mx-auto">Everything your team needs to turn real adventures into epic content</p>
          </div>

          {/* Feature: AI Video — Big editorial block */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[350px] rounded-2xl overflow-hidden collage-img collage-img-3">
              <Image
                src="https://images.unsplash.com/photo-1748436575142-25dcc0605eee?w=800&q=80"
                alt="Child taking picture with camera"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Washi tape accent */}
              <div className="absolute top-4 right-4 w-20 h-5 bg-primary-400 opacity-60 rotate-[4deg] rounded-sm" />
            </div>
            <div className="flex flex-col justify-center">
              <Link href={{ pathname: '/features/[slug]', params: { slug: t('features.aiVideo.slug') } }} className="group">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-500">01</span>
                <h3 className="font-heading text-3xl mt-2 mb-3 tracking-wide group-hover:text-primary-500 transition-colors">{t('features.aiVideo.title')}</h3>
                <p className="text-ink-500 leading-relaxed mb-4">{t('features.aiVideo.description')}</p>
                <span className="text-primary-500 font-semibold text-sm scribble-underline">Learn more &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Feature cards — smaller grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['teams', 'challenges', 'leaderboard', 'safety', 'rewards'] as const).map((feature, i) => (
              <Link
                key={feature}
                href={{ pathname: '/features/[slug]', params: { slug: t(`features.${feature}.slug`) } }}
                className={`bg-white rounded-2xl shadow-paper p-6 border border-ink-100/50 group hover:shadow-collage transition-all ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-ink-300">0{i + 2}</span>
                <h3 className="font-heading text-lg mt-2 mb-2 tracking-wide group-hover:text-primary-500 transition-colors">{t(`features.${feature}.title`)}</h3>
                <p className="text-ink-500 text-sm leading-relaxed">{t(`features.${feature}.description`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL BREAK — Full-width image strip ═══════ */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1710301431051-ee6923af04aa?w=1600&q=80"
          alt="Kids playing on green field"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-heading text-4xl md:text-6xl text-white text-center tracking-wide px-4">
            Real adventures.<br />
            <span className="text-secondary-300">Epic stories.</span>
          </p>
        </div>
      </section>

      {/* ═══════ FAQ — Paper notebook style ═══════ */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-12 tracking-wide">{tFaq('title')}</h2>
          <div className="space-y-3">
            {(['whatIs', 'isSafe', 'howAiWorks', 'cost', 'age'] as const).map((item) => (
              <details key={item} className="group bg-white rounded-2xl shadow-paper border border-ink-100/50">
                <summary className="font-semibold text-ink-900 cursor-pointer list-none flex justify-between items-center p-5">
                  {tFaq(`items.${item}.question`)}
                  <svg className="w-5 h-5 text-ink-300 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-ink-500 leading-relaxed">{tFaq(`items.${item}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA — Bold coral ═══════ */}
      <section className="relative py-24 px-4 bg-primary-500 text-white text-center overflow-hidden torn-edge-top">
        {/* Decorative dots */}
        <div className="absolute top-8 left-8 w-24 h-24 opacity-20">
          <svg viewBox="0 0 80 80" className="w-full h-full text-white">
            <pattern id="cta-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </pattern>
            <rect width="80" height="80" fill="url(#cta-dots)" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl mb-4 tracking-wide">{t('cta.title')}</h2>
          <p className="text-lg mb-8 opacity-90">{t('cta.subtitle')}</p>
          <Link href="/sign-up">
            <Button variant="secondary" size="lg">{t('cta.button')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
