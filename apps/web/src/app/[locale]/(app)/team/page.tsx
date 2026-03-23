'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';

// TODO: Replace with real data fetching from Supabase
const mockTeam = {
  id: 'team-1',
  name: 'Trail Blazers',
  avatarPreset: 'team_fire',
  inviteCode: 'BLAZE42',
  totalPoints: 2450,
  challengesCompleted: 7,
  rank: 12,
  members: [
    { id: '1', displayName: 'Explorer42', avatarPreset: 'astronaut', role: 'captain', pointsContributed: 820 },
    { id: '2', displayName: 'StarRunner', avatarPreset: 'rocket', role: 'member', pointsContributed: 650 },
    { id: '3', displayName: 'NaturePal', avatarPreset: 'tree', role: 'member', pointsContributed: 540 },
    { id: '4', displayName: 'SpeedDemon', avatarPreset: 'lightning', role: 'member', pointsContributed: 440 },
  ],
};

// Set to null to test no-team state:
// const mockTeam = null;

export default function TeamPage() {
  const t = useTranslations('app.team');
  const tDash = useTranslations('app.dashboard');
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = () => {
    if (mockTeam) {
      navigator.clipboard.writeText(mockTeam.inviteCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  if (!mockTeam) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-16">
        <div className="w-24 h-24 mx-auto rounded-full bg-primary-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 className="font-heading text-2xl text-ink-900">{tDash('noTeam')}</h1>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/team/create">
            <Button size="lg">{tDash('createTeam')}</Button>
          </Link>
          <Button variant="outline" size="lg">{tDash('joinTeam')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Team Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl">
          🔥
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-3xl text-ink-900">{mockTeam.name}</h1>
          <div className="flex flex-wrap gap-3 mt-2">
            <Badge variant="primary">{t('rank')}: #{mockTeam.rank}</Badge>
            <Badge variant="success">{t('points')}: {mockTeam.totalPoints}</Badge>
            <Badge variant="secondary">{t('challengesCompleted')}: {mockTeam.challengesCompleted}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">{t('settings')}</Button>
      </div>

      {/* Invite Code */}
      <Card variant="paper">
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1">
              <p className="font-heading font-bold text-ink-900 text-sm">{t('inviteCode')}</p>
              <p className="font-mono text-2xl text-primary-500 tracking-widest mt-1">{mockTeam.inviteCode}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyCode}>
              {codeCopied ? t('codeCopied') : t('copyCode')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members */}
      <Card variant="notebook">
        <CardHeader>
          <CardTitle>{t('members')} ({mockTeam.members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTeam.members.map((member) => (
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
                      {member.role === 'captain' ? t('captain') : t('member')}
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

      {/* Actions */}
      <div className="flex justify-end">
        <Button variant="danger" size="sm">{t('leaveTeam')}</Button>
      </div>
    </div>
  );
}
