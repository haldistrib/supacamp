import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-7xl font-bold text-ink-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-3">{t('notFound')}</h2>
        <p className="text-ink-500 mb-8">
          {t('notFoundDescription')}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-ink-900 text-white rounded-lg text-sm font-medium hover:bg-ink-700 transition-colors"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
