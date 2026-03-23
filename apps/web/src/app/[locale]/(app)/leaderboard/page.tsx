'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, Badge, Tabs } from '@/components/ui';

// TODO: Replace with real data fetching from Supabase leaderboard_cache
const mockLeaderboard = [
  { rank: 1, teamName: 'Storm Chasers', points: 5200, challengesWon: 15, region: 'Europe', avatarEmoji: '🌪️' },
  { rank: 2, teamName: 'Mountain Lions', points: 4800, challengesWon: 13, region: 'North America', avatarEmoji: '🦁' },
  { rank: 3, teamName: 'Ocean Riders', points: 4350, challengesWon: 12, region: 'Asia', avatarEmoji: '🏄' },
  { rank: 4, teamName: 'Sky Hawks', points: 3900, challengesWon: 11, region: 'North America', avatarEmoji: '🦅' },
  { rank: 5, teamName: 'Fire Foxes', points: 3500, challengesWon: 10, region: 'Europe', avatarEmoji: '🦊' },
  { rank: 6, teamName: 'Ice Bears', points: 3200, challengesWon: 9, region: 'Europe', avatarEmoji: '🐻‍❄️' },
  { rank: 7, teamName: 'Thunder Wolves', points: 2900, challengesWon: 8, region: 'South America', avatarEmoji: '🐺' },
  { rank: 8, teamName: 'Trail Blazers', points: 2450, challengesWon: 7, region: 'North America', avatarEmoji: '🔥' },
  { rank: 9, teamName: 'Star Gazers', points: 2100, challengesWon: 6, region: 'Asia', avatarEmoji: '⭐' },
  { rank: 10, teamName: 'River Runners', points: 1800, challengesWon: 5, region: 'Oceania', avatarEmoji: '🏞️' },
];

function LeaderboardTable({ entries, t }: { entries: typeof mockLeaderboard; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-ink-200">
            <th className="text-left py-3 px-4 font-heading text-sm text-ink-500">{t('rank')}</th>
            <th className="text-left py-3 px-4 font-heading text-sm text-ink-500">{t('team')}</th>
            <th className="text-right py-3 px-4 font-heading text-sm text-ink-500">{t('points')}</th>
            <th className="text-right py-3 px-4 font-heading text-sm text-ink-500 hidden sm:table-cell">{t('challengesWon')}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.rank} className="border-b border-ink-100 hover:bg-paper-warm transition-colors">
              <td className="py-3 px-4">
                <span className={`font-heading font-bold text-lg ${
                  entry.rank === 1 ? 'text-secondary-500' :
                  entry.rank === 2 ? 'text-ink-400' :
                  entry.rank === 3 ? 'text-accent-400' : 'text-ink-700'
                }`}>
                  #{entry.rank}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{entry.avatarEmoji}</span>
                  <div>
                    <p className="font-heading font-bold text-ink-900">{entry.teamName}</p>
                    <p className="text-xs text-ink-400">{entry.region}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="font-heading font-bold text-primary-500">{entry.points.toLocaleString()}</span>
              </td>
              <td className="py-3 px-4 text-right hidden sm:table-cell">
                <Badge variant="success">{entry.challengesWon}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LeaderboardPage() {
  const t = useTranslations('app.leaderboard');

  const tabs = [
    {
      value: 'global',
      label: t('global'),
      content: (
        <Card variant="notebook">
          <CardContent>
            <LeaderboardTable entries={mockLeaderboard} t={t} />
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'regional',
      label: t('regional'),
      content: (
        <Card variant="notebook">
          <CardContent>
            <LeaderboardTable
              entries={mockLeaderboard.filter((e) => e.region === 'North America')}
              t={t}
            />
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'weekly',
      label: t('weekly'),
      content: (
        <Card variant="notebook">
          <CardContent>
            <LeaderboardTable entries={mockLeaderboard.slice(0, 5)} t={t} />
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'monthly',
      label: t('monthly'),
      content: (
        <Card variant="notebook">
          <CardContent>
            <LeaderboardTable entries={mockLeaderboard.slice(0, 7)} t={t} />
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>
      <Tabs tabs={tabs} defaultValue="global" />
    </div>
  );
}
