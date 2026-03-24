import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <span className="text-lg font-bold text-ink-900">Supacamp</span>
            <p className="mt-2 text-ink-500 text-sm leading-relaxed">Turn Real Adventures Into Epic Videos</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900 mb-3">{t('features')}</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li><Link href={{ pathname: '/features/[slug]', params: { slug: 'ai-video-transformation' } }} className="hover:text-ink-900 transition-colors">AI Video</Link></li>
              <li><Link href={{ pathname: '/features/[slug]', params: { slug: 'create-your-team' } }} className="hover:text-ink-900 transition-colors">Teams</Link></li>
              <li><Link href={{ pathname: '/features/[slug]', params: { slug: 'challenges' } }} className="hover:text-ink-900 transition-colors">Challenges</Link></li>
              <li><Link href={{ pathname: '/features/[slug]', params: { slug: 'leaderboard' } }} className="hover:text-ink-900 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900 mb-3">Company</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li><Link href="/about" className="hover:text-ink-900 transition-colors">{t('about')}</Link></li>
              <li><Link href="/blog" className="hover:text-ink-900 transition-colors">{t('blog')}</Link></li>
              <li><Link href="/contact" className="hover:text-ink-900 transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900 mb-3">Legal</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li><Link href="/legal/privacy" className="hover:text-ink-900 transition-colors">{t('privacy')}</Link></li>
              <li><Link href="/legal/terms" className="hover:text-ink-900 transition-colors">{t('terms')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-ink-300">
          &copy; {new Date().getFullYear()} Supacamp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
