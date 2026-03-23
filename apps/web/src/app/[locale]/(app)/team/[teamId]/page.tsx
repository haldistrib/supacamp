'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';

// TODO: Replace with real data fetching from Supabase using teamId param
const mockTeamDetail = {
  id: 'team-1',
  name: 'Trail Blazers',
  avatarPreset: 'team_fire',
  totalPoints: 2450,
  challengesCompleted: 7,
  rank: 12,
  region: 'North America',
  members: [
    { id: '1', displayName: 'Explorer42', avatarPreset: 'astronaut', role: 'captain', pointsContributed: 820 },
    { id: '2', displayName: 'StarRunner', avatarPreset: 'rocket', role: 'member', pointsContributed: 650 },
    { id: '3', displayName: 'NaturePal', avatarPreset: 'tree', role: 'member', pointsContributed: 540 },
    { id: '4', displayName: 'SpeedDemon', avatarPreset: 'lightning', role: 'member', pointsContributed: 440 },
  ],
  challengeHistory: [
    { id: '1', title: 'Mountain Hike', pointsAwarded: 300, completedAt: '2024-01-15', difficulty: 'hard' },
    { id: '2', title: 'Nature Photography', pointsAwarded: 150, completedAt: '2024-01-12', difficulty: 'easy' },
    { id: '3', title: 'River Crossing', pointsAwarded: 250, completedAt: '2024-01-08', difficulty: 'medium' },
  ],
};

interface TeamDetailPageProps {
  params: Promise<{ teamId: string }>;
}

export default function TeamDetailPage({ params: _params }: TeamDetailPageProps) {
  const t = useTranslations('app.teamDetail');
  const tTeam = useTranslations('app.team');
  const team = mockTeamDetail;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Team Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl">
          🔥
        </div>
        <div>
          <h1 className="font-heading text-3xl text-ink-900">{team.name}</h1>
          <p className="text-ink-500 mt-1">{team.region}</p>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="font-heading text-xl text-ink-900 mb-4">{t('stats')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: tTeam('points'), value: team.totalPoints.toLocaleString(), variant: 'primary' as const },
            { label: tTeam('challengesCompleted'), value: team.challengesCompleted.toString(), variant: 'success' as const },
            { label: tTeam('rank'), value: `#${team.rank}`, variant: 'secondary' as const },
            { label: tTeam('members'), value: team.members.length.toString(), variant: 'default' as const },
          ].map((stat) => (
            <Card key={stat.label} variant="paper" className="text-center">
              <CardContent>
                <p className="font-heading text-3xl text-ink-900">{stat.value}</p>
                <Badge variant={stat.variant} className="mt-2">{stat.label}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Members */}
      <Card variant="notebook">
        <CardHeader>
          <CardTitle>{tTeam('members')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg bg-paper-warm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-lg">
                    {member.avatarPreset === 'astronaut' ? '🧑‍🚀' :
                     member.avatarPreset === 'rocket' ? '🚀' :
                     member.avatarPreset === 'tree' ? '🌳' : '⚡'}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-ink-900 text-sm">{member.displayName}</p>
                    <Badge variant={member.role === 'captain' ? 'sticker' : 'default'} className="mt-0.5">
                      {member.role === 'captain' ? tTeam('captain') : tTeam('member')}
                    </Badge>
                  </div>
                </div>
                <span className="font-heading font-bold text-ink-700 text-sm">
                  {member.pointsContributed} pts
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge History */}
      <Card variant="folded">
        <CardHeader>
          <CardTitle>{t('challengeHistory')}</CardTitle>
        </CardHeader>
        <CardContent>
          {team.challengeHistory.length > 0 ? (
            <div className="space-y-3">
              {team.challengeHistory.map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-paper-warm"
                >
                  <div>
                    <p className="font-heading font-bold text-ink-900 text-sm">{challenge.title}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={
                        challenge.difficulty === 'hard' ? 'danger' :
                        challenge.difficulty === 'medium' ? 'warning' : 'success'
                      }>
                        {challenge.difficulty}
                      </Badge>
                      <span className="text-xs text-ink-400">{challenge.completedAt}</span>
                    </div>
                  </div>
                  <span className="font-heading font-bold text-primary-500">
                    +{challenge.pointsAwarded} pts
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ink-500 text-center py-4">{t('noHistory')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
