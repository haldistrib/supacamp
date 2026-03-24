import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/features',
    title: t('featuresTitle'),
    description: t('featuresDescription'),
  });
}

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

export default function FeaturesPage() {
  const t = useTranslations('marketing.features');
  const tIndex = useTranslations('marketing.featuresIndex');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('features'), href: '/features' },
        ]}
      />

      {/* Hero */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink-900 mb-6 leading-[1.1]">
            {tIndex('title')}
          </h1>
          <p className="text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
            {tIndex('subtitle')}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_KEYS.map((feature) => (
              <Link
                key={feature}
                href={{ pathname: '/features/[slug]', params: { slug: t(`${feature}.slug`) } }}
                className="block group"
              >
                <Card variant="default" className="h-full hover:shadow-md hover:border-gray-300 transition-all">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary-500 transition-colors">{t(`${feature}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{t(`${feature}.description`)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
