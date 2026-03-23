import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/legal/terms',
    title: t('termsTitle'),
    description: t('termsDescription'),
  });
}

export default function TermsPage() {
  const t = useTranslations('marketing.terms');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('terms'), href: '/legal/terms' },
        ]}
      />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl text-ink-900 mb-4">{t('title')}</h1>
          <p className="text-sm text-ink-500 mb-12">{t('lastUpdated')}</p>

          <div className="prose prose-ink max-w-none space-y-10">
            <p className="text-lg text-ink-700">{t('intro')}</p>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('eligibilityTitle')}</h2>
              <p className="text-ink-700">{t('eligibilityText')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('accountsTitle')}</h2>
              <p className="text-ink-700">{t('accountsText')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('contentTitle')}</h2>
              <p className="text-ink-700 mb-3">{t('contentText1')}</p>
              <p className="text-ink-700 mb-3">{t('contentText2')}</p>
              <p className="text-ink-700">{t('contentText3')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('safetyTitle')}</h2>
              <p className="text-ink-700 mb-3">{t('safetyText1')}</p>
              <p className="text-ink-700 mb-3">{t('safetyText2')}</p>
              <p className="text-ink-700">{t('safetyText3')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('ipTitle')}</h2>
              <p className="text-ink-700">{t('ipText')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('terminationTitle')}</h2>
              <p className="text-ink-700">{t('terminationText')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('disclaimerTitle')}</h2>
              <p className="text-ink-700">{t('disclaimerText')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('contactTitle')}</h2>
              <p className="text-ink-700">{t('contactText')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
