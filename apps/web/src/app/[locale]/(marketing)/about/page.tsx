import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { JsonLdScript } from '@/components/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { organizationJsonLd } from '@/lib/seo/json-ld';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/about',
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  });
}

const VALUE_KEYS = ['safety', 'creativity', 'teamwork', 'outdoor'] as const;

export default function AboutPage() {
  const t = useTranslations('marketing.about');
  const tCommon = useTranslations('common');

  return (
    <>
      <JsonLdScript data={organizationJsonLd()} />
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('about'), href: '/about' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 px-4 text-center paper-texture">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl text-ink-900 mb-6">{t('missionTitle')}</h2>
          <p className="text-xl text-ink-700 leading-relaxed">{t('missionText')}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-paper-warm paper-texture">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl text-ink-900 mb-6 text-center">{t('storyTitle')}</h2>
          <p className="text-lg text-ink-700 leading-relaxed">{t('storyText')}</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-16">{t('valuesTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {VALUE_KEYS.map((key) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-paper p-8 border border-ink-100 hand-drawn-border"
              >
                <h3 className="font-heading text-xl mb-3 text-ink-900">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-ink-700">{t(`values.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
