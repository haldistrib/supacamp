import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Badge } from '@/components/ui';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/blog',
    title: t('blogTitle'),
    description: t('blogDescription'),
  });
}

const CATEGORY_KEYS = [
  'outdoorActivities',
  'aiCreativity',
  'teamBuilding',
  'parentingTips',
  'childSafety',
] as const;

export default function BlogPage() {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('blog'), href: '/blog' },
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

      {/* Category Tabs */}
      <section className="py-8 px-4 border-b border-ink-100">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center">
          {CATEGORY_KEYS.map((category) => (
            <Badge key={category} variant="primary" className="cursor-pointer">
              {t(`categories.${category}`)}
            </Badge>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-paper p-12 border border-ink-100 hand-drawn-border">
            <h2 className="font-heading text-3xl text-ink-900 mb-4">{t('comingSoon')}</h2>
            <p className="text-lg text-ink-700">{t('comingSoonText')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
