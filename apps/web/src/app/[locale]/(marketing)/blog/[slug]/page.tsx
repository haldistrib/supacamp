import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: `/blog/${(await params).slug}`,
    title: t('blogPostNotFoundTitle'),
    description: t('blogPostNotFoundDescription'),
    noindex: true,
  });
}

export default function BlogPostPage() {
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

      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-paper p-12 border border-ink-100 hand-drawn-border">
            <h1 className="font-heading text-3xl text-ink-900 mb-4">{t('postNotFound')}</h1>
            <p className="text-lg text-ink-700 mb-8">{t('postNotFoundText')}</p>
            <Link href="/blog">
              <Button variant="outline">{t('backToBlog')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
