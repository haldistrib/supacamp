'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';

// TODO: Replace with real data fetching from Supabase
const mockVideos = [
  { id: '1', title: 'Mountain Summit', challengeTitle: 'Mountain Hike', aiProcessingStatus: 'completed', moderationStatus: 'approved', createdAt: '2 hours ago', thumbnailColor: 'bg-primary-100' },
  { id: '2', title: 'Team Relay Race', challengeTitle: 'Team Relay', aiProcessingStatus: 'processing', moderationStatus: 'pending', createdAt: '30 min ago', thumbnailColor: 'bg-secondary-100' },
  { id: '3', title: 'Creek Bridge Build', challengeTitle: 'River Crossing', aiProcessingStatus: 'completed', moderationStatus: 'approved', createdAt: '1 day ago', thumbnailColor: 'bg-tertiary-100' },
  { id: '4', title: 'Park Sketches', challengeTitle: 'Nature Sketch', aiProcessingStatus: 'completed', moderationStatus: 'pending', createdAt: '3 days ago', thumbnailColor: 'bg-accent-100' },
  { id: '5', title: 'Night Sky Adventure', challengeTitle: 'Star Gazing', aiProcessingStatus: 'failed', moderationStatus: 'pending', createdAt: '5 days ago', thumbnailColor: 'bg-ink-100' },
  { id: '6', title: 'Epic Fort Build', challengeTitle: 'Indoor Fort', aiProcessingStatus: 'completed', moderationStatus: 'approved', createdAt: '1 week ago', thumbnailColor: 'bg-primary-50' },
];

type VideoStatus = 'completed' | 'processing' | 'failed';
type ModerationStatus = 'approved' | 'pending';

function getStatusBadge(aiStatus: string, modStatus: string, t: ReturnType<typeof useTranslations>) {
  if (aiStatus === 'processing') return { label: t('processing'), variant: 'warning' as const };
  if (aiStatus === 'failed') return { label: t('failed'), variant: 'danger' as const };
  if (modStatus === 'pending') return { label: t('pendingModeration'), variant: 'secondary' as const };
  return { label: t('ready'), variant: 'success' as const };
}

export default function VideosPage() {
  const t = useTranslations('app.videos');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('myVideos')}</h1>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => {
          const status = getStatusBadge(video.aiProcessingStatus, video.moderationStatus, t);
          return (
            <Card key={video.id} variant="folded" className="overflow-hidden p-0">
              {/* Thumbnail placeholder */}
              <div className={`aspect-video ${video.thumbnailColor} flex items-center justify-center relative`}>
                <svg className="w-12 h-12 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {video.aiProcessingStatus === 'completed' && video.moderationStatus === 'approved' && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="sticker">{t('transformed')}</Badge>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-bold text-ink-900">{video.title}</h3>
                <p className="text-sm text-ink-500">{video.challengeTitle}</p>
                <div className="flex items-center justify-between">
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <span className="text-xs text-ink-400">{video.createdAt}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
