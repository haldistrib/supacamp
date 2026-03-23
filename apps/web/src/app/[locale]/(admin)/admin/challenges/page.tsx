'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';

// TODO: Replace with real data fetching from Supabase challenges table
const mockChallenges = [
  { id: '1', title: 'Mountain Hike', category: 'athletic', difficulty: 'hard', status: 'approved', pointsReward: 300 },
  { id: '2', title: 'Nature Sketch', category: 'creative', difficulty: 'easy', status: 'approved', pointsReward: 100 },
  { id: '3', title: 'River Crossing', category: 'teamwork', difficulty: 'medium', status: 'pending', pointsReward: 250 },
  { id: '4', title: 'Star Gazing', category: 'exploration', difficulty: 'easy', status: 'pending', pointsReward: 120 },
  { id: '5', title: 'Team Relay', category: 'athletic', difficulty: 'medium', status: 'draft', pointsReward: 200 },
  { id: '6', title: 'Indoor Fort', category: 'creative', difficulty: 'easy', status: 'rejected', pointsReward: 150 },
];

function statusBadgeVariant(status: string) {
  switch (status) {
    case 'approved': return 'success' as const;
    case 'pending': return 'warning' as const;
    case 'rejected': return 'danger' as const;
    default: return 'default' as const;
  }
}

export default function AdminChallengesPage() {
  const t = useTranslations('admin.challenges');

  const handleApprove = (id: string) => {
    // TODO: Call Supabase to update challenge status to 'approved'
    console.log('Approve challenge:', id);
  };

  const handleReject = (id: string) => {
    // TODO: Call Supabase to update challenge status to 'rejected'
    console.log('Reject challenge:', id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>
        <Link href="/admin/challenges/new">
          <Button>{t('createNew')}</Button>
        </Link>
      </div>

      {/* Challenge list */}
      <Card variant="notebook">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-ink-200">
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500">Title</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500 hidden sm:table-cell">Category</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500 hidden md:table-cell">Difficulty</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500 hidden md:table-cell">Points</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500">{t('status')}</th>
                  <th className="text-right py-3 px-4 font-heading text-sm text-ink-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockChallenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b border-ink-100 hover:bg-paper-warm transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-heading font-bold text-ink-900">{challenge.title}</span>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <Badge variant="primary">{challenge.category}</Badge>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge variant={
                        challenge.difficulty === 'hard' ? 'danger' :
                        challenge.difficulty === 'medium' ? 'warning' : 'success'
                      }>
                        {challenge.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="font-heading text-ink-700">{challenge.pointsReward}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={statusBadgeVariant(challenge.status)}>{challenge.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        {challenge.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => handleApprove(challenge.id)}>
                              {t('approve')}
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => handleReject(challenge.id)}>
                              {t('reject')}
                            </Button>
                          </>
                        )}
                        {challenge.status !== 'pending' && (
                          <Button size="sm" variant="ghost">Edit</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
