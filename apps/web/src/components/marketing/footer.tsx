import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-ink-900 text-paper-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="font-heading text-2xl text-primary-400">Supacamp</span>
            <p className="mt-2 text-ink-300 text-sm">Turn Real Adventures Into Epic Videos</p>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">{t('features')}</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li><Link href="/features/ai-video-transformation" className="hover:text-white transition-colors">AI Video</Link></li>
              <li><Link href="/features/create-your-team" className="hover:text-white transition-colors">Teams</Link></li>
              <li><Link href="/features/challenges" className="hover:text-white transition-colors">Challenges</Link></li>
              <li><Link href="/features/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li><Link href="/about" className="hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{t('blog')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">{t('privacy')}</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">{t('terms')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ink-700 pt-8 text-center text-sm text-ink-500">
          &copy; {new Date().getFullYear()} Supacamp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
