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
      <section className="py-20 px-4 text-center paper-texture">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6">
            {tIndex('title')}
          </h1>
          <p className="text-xl text-ink-700 max-w-2xl mx-auto">
            {tIndex('subtitle')}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_KEYS.map((feature) => (
              <Link
                key={feature}
                href={`/features/${t(`${feature}.slug`)}`}
                className="block hover:scale-[1.02] transition-transform"
              >
                <Card variant="default" className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{t(`${feature}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{t(`${feature}.description`)}</p>
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
