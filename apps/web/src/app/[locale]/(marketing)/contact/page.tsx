import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Card, Button } from '@/components/ui';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
  });
}

export default function ContactPage() {
  const t = useTranslations('marketing.contact');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('contact'), href: '/contact' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 px-4 text-center paper-texture">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl text-ink-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-ink-700 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <Card variant="paper">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-heading text-sm text-ink-900 mb-2">
                  {t('nameLabel')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t('namePlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-white text-ink-900 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-heading text-sm text-ink-900 mb-2">
                  {t('emailLabel')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-white text-ink-900 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-heading text-sm text-ink-900 mb-2">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder={t('messagePlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-white text-ink-900 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-vertical"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                {t('submitButton')}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
