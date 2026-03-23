'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';

// TODO: Replace with real data fetching from Supabase
const mockUser = { displayName: 'Explorer42' };
const mockTeam = { name: 'Trail Blazers', rank: 12, points: 2450, avatarPreset: 'team_fire' };
const mockChallenges = [
  { id: '1', title: 'River Crossing', difficulty: 'medium', points: 200, status: 'in_progress' },
  { id: '2', title: 'Nature Sketch', difficulty: 'easy', points: 100, status: 'in_progress' },
];
const mockVideos = [
  { id: '1', title: 'Mountain Climb', status: 'ready', createdAt: '2 hours ago' },
  { id: '2', title: 'Team Relay', status: 'processing', createdAt: '30 min ago' },
];

export default function DashboardPage() {
  const t = useTranslations('app.dashboard');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <h1 className="font-heading text-3xl md:text-4xl text-ink-900">
        {t('welcome', { name: mockUser.displayName })}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Card */}
        <Card variant="paper" className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t('yourTeam')}</CardTitle>
          </CardHeader>
          <CardContent>
            {mockTeam ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                    🔥
                  </div>
                  <div>
                    <p className="font-heading font-bold text-ink-900">{mockTeam.name}</p>
                    <p className="text-sm text-ink-500">
                      {t('teamRank')}: #{mockTeam.rank}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-ink-100">
                  <span className="text-sm text-ink-500">{mockTeam.points} pts</span>
                  <Link href="/team">
                    <Button variant="ghost" size="sm">
                      {t('yourTeam')}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 py-4">
                <p className="text-ink-500">{t('noTeam')}</p>
                <div className="flex gap-2 justify-center">
                  <Link href="/team/create">
                    <Button size="sm">{t('createTeam')}</Button>
                  </Link>
                  <Link href="/team">
                    <Button variant="outline" size="sm">{t('joinTeam')}</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <Card variant="notebook" className="md:col-span-1 lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{t('activeChallenges')}</CardTitle>
            <Link href="/challenges">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {mockChallenges.length > 0 ? (
              <div className="space-y-3">
                {mockChallenges.map((challenge) => (
                  <Link
                    key={challenge.id}
                    href={`/challenges/${challenge.id}` as '/challenges'}
                    className="flex items-center justify-between p-3 rounded-lg bg-paper-warm hover:bg-secondary-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading font-bold text-ink-900 text-sm">{challenge.title}</p>
                        <Badge variant="primary" className="mt-1">{challenge.difficulty}</Badge>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-primary-500">{challenge.points} pts</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-ink-500 text-center py-4">No active challenges</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Videos */}
        <Card variant="folded" className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{t('recentVideos')}</CardTitle>
            <Link href="/videos">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockVideos.map((video) => (
                <div key={video.id} className="rounded-lg bg-paper-warm p-3 space-y-2">
                  <div className="aspect-video rounded-md bg-ink-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-heading font-bold text-ink-900 text-sm">{video.title}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={video.status === 'ready' ? 'success' : 'warning'}>
                      {video.status === 'ready' ? 'Ready' : 'Processing...'}
                    </Badge>
                    <span className="text-xs text-ink-400">{video.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
