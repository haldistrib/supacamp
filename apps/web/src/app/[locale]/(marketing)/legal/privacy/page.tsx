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
    path: '/legal/privacy',
    title: t('privacyTitle'),
    description: t('privacyDescription'),
  });
}

export default function PrivacyPage() {
  const t = useTranslations('marketing.privacy');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: tCommon('privacy'), href: '/legal/privacy' },
        ]}
      />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl text-ink-900 mb-4">{t('title')}</h1>
          <p className="text-sm text-ink-500 mb-12">{t('lastUpdated')}</p>

          <div className="prose prose-ink max-w-none space-y-10">
            <p className="text-lg text-ink-700">{t('intro')}</p>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('coppaTitle')}</h2>
              <p className="text-ink-700 mb-3">{t('coppaText1')}</p>
              <p className="text-ink-700 mb-3">{t('coppaText2')}</p>
              <p className="text-ink-700">{t('coppaText3')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('gdprTitle')}</h2>
              <p className="text-ink-700 mb-3">{t('gdprText1')}</p>
              <p className="text-ink-700 mb-3">{t('gdprText2')}</p>
              <p className="text-ink-700 mb-3">{t('gdprText3')}</p>
              <p className="text-ink-700">{t('gdprText4')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('dataCollectionTitle')}</h2>
              <p className="text-ink-700">{t('dataCollectionText')}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-ink-900 mb-4">{t('dataSecurityTitle')}</h2>
              <p className="text-ink-700">{t('dataSecurityText')}</p>
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
