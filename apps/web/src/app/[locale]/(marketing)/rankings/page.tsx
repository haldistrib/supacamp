import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return generatePageMetadata({
    locale: locale as Locale,
    path: '/leaderboard',
    title: t('leaderboardTitle'),
    description: t('leaderboardDescription'),
  });
}

const MOCK_TEAMS = [
  { rank: 1, name: 'Trail Blazers', points: 4820, challenges: 47 },
  { rank: 2, name: 'Sunset Squad', points: 4510, challenges: 43 },
  { rank: 3, name: 'Wild Explorers', points: 4200, challenges: 41 },
  { rank: 4, name: 'Mountain Lions', points: 3890, challenges: 38 },
  { rank: 5, name: 'River Runners', points: 3650, challenges: 35 },
  { rank: 6, name: 'Sky Hawks', points: 3420, challenges: 33 },
  { rank: 7, name: 'Forest Foxes', points: 3100, challenges: 30 },
  { rank: 8, name: 'Desert Wolves', points: 2880, challenges: 28 },
  { rank: 9, name: 'Ocean Otters', points: 2650, challenges: 26 },
  { rank: 10, name: 'Arctic Penguins', points: 2400, challenges: 24 },
];

export default function LeaderboardPage() {
  const t = useTranslations('marketing.leaderboardPage');
  const tCommon = useTranslations('common');

  return (
    <>
      <Breadcrumbs
        locale="en"
        items={[
          { label: tCommon('home'), href: '/' },
          { label: t('title'), href: '/leaderboard' },
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

      {/* Leaderboard Table */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-paper border border-ink-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-paper-warm border-b border-ink-100">
                  <th className="font-heading text-left px-6 py-4 text-ink-900">{t('rank')}</th>
                  <th className="font-heading text-left px-6 py-4 text-ink-900">{t('team')}</th>
                  <th className="font-heading text-right px-6 py-4 text-ink-900">{t('points')}</th>
                  <th className="font-heading text-right px-6 py-4 text-ink-900">{t('challenges')}</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TEAMS.map((team) => (
                  <tr key={team.rank} className="border-b border-ink-50 hover:bg-paper-warm transition-colors">
                    <td className="px-6 py-4">
                      <span className={`font-heading text-lg ${team.rank <= 3 ? 'text-primary-500' : 'text-ink-500'}`}>
                        #{team.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-heading text-ink-900">{team.name}</td>
                    <td className="px-6 py-4 text-right font-bold text-ink-700">{team.points.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-ink-500">{team.challenges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary-500 text-white text-center torn-edge-top">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl mb-4">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('ctaSubtitle')}</p>
          <Link href="/sign-up">
            <Button variant="secondary" size="lg">{t('ctaButton')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
