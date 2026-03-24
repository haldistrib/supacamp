import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 paper-texture">
      <div className="max-w-md mx-auto text-center">
        <h1 className="font-heading text-8xl text-primary-500 mb-4">404</h1>
        <h2 className="font-heading text-2xl mb-3 tracking-wide">{t('notFound')}</h2>
        <p className="text-ink-500 mb-8">
          {t('notFoundDescription')}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl font-heading text-lg hover:bg-primary-600 transition-colors"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
