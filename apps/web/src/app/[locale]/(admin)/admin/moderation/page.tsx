'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';

// TODO: Replace with real data fetching from Supabase challenge_submissions + content_reports
const mockQueue = [
  { id: '1', type: 'video', teamName: 'Trail Blazers', challengeTitle: 'Mountain Hike', submittedBy: 'Explorer42', submittedAt: '2 hours ago', reason: 'Auto-flagged by AI moderation' },
  { id: '2', type: 'video', teamName: 'Fire Foxes', challengeTitle: 'Team Relay', submittedBy: 'SpeedRunner', submittedAt: '5 hours ago', reason: 'User reported' },
  { id: '3', type: 'video', teamName: 'Ocean Riders', challengeTitle: 'River Crossing', submittedBy: 'WaveMaker', submittedAt: '1 day ago', reason: 'Auto-flagged by AI moderation' },
];

export default function AdminModerationPage() {
  const t = useTranslations('admin.moderation');

  const handleApprove = (id: string) => {
    // TODO: Update moderation_status to 'approved' in Supabase
    console.log('Approve:', id);
  };

  const handleReject = (id: string) => {
    // TODO: Update moderation_status to 'rejected' in Supabase
    console.log('Reject:', id);
  };

  const handleFlag = (id: string) => {
    // TODO: Create content_report entry in Supabase
    console.log('Flag:', id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>

      <Card variant="notebook">
        <CardHeader>
          <CardTitle>{t('queue')} ({mockQueue.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {mockQueue.length > 0 ? (
            <div className="space-y-4">
              {mockQueue.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-paper-warm border border-ink-100">
                  {/* Video thumbnail placeholder */}
                  <div className="w-full sm:w-48 aspect-video rounded-lg bg-ink-100 flex items-center justify-center shrink-0">
                    <svg className="w-10 h-10 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-heading font-bold text-ink-900">{item.challengeTitle}</p>
                        <p className="text-sm text-ink-500">
                          {item.teamName} &middot; {item.submittedBy}
                        </p>
                      </div>
                      <span className="text-xs text-ink-400">{item.submittedAt}</span>
                    </div>
                    <Badge variant="warning">{item.reason}</Badge>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={() => handleApprove(item.id)}>
                        {t('approve')}
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleReject(item.id)}>
                        {t('reject')}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleFlag(item.id)}>
                        {t('flag')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-tertiary-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-tertiary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-ink-500 font-heading">{t('noItems')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
