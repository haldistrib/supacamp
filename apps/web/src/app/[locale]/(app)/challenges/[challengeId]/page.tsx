'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';

// TODO: Replace with real data fetching from Supabase using challengeId param
const mockChallenge = {
  id: '1',
  title: 'Mountain Hike',
  description: 'Hike to the top of a local hill or mountain trail with your team. Record the journey and the view from the top!',
  instructions: `1. Choose a local trail or hill that is safe and appropriate for your group's age.
2. Make sure everyone has water, sunscreen, and proper footwear.
3. Hike to the summit together as a team.
4. Record a short video at the top showing your team and the view.
5. Head back down safely — watch your footing on the way down!`,
  safetyNotes: `- Always hike with at least one adult or guardian present.
- Stay on marked trails at all times.
- Bring plenty of water and snacks.
- Check weather conditions before heading out.
- Let someone know your planned route and expected return time.
- If anyone feels unwell, head back immediately.`,
  category: 'athletic',
  difficulty: 'hard',
  pointsReward: 300,
  estimatedDuration: '2 hours',
  requiredPlayersMin: 2,
  requiredPlayersMax: 8,
  isOutdoor: true,
  equipment: ['Water bottles', 'Proper footwear', 'Sunscreen', 'Camera/Phone'],
};

interface ChallengeDetailPageProps {
  params: Promise<{ challengeId: string }>;
}

export default function ChallengeDetailPage({ params: _params }: ChallengeDetailPageProps) {
  const t = useTranslations('app.challenges');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back link */}
      <Link href="/challenges" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Challenges
      </Link>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <Badge variant={
            mockChallenge.difficulty === 'hard' ? 'danger' :
            mockChallenge.difficulty === 'medium' ? 'warning' : 'success'
          }>
            {mockChallenge.difficulty}
          </Badge>
          <Badge variant="primary">{mockChallenge.category}</Badge>
          <Badge variant="default">{mockChallenge.isOutdoor ? 'Outdoor' : 'Indoor'}</Badge>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-ink-900">{mockChallenge.title}</h1>
        <p className="text-ink-600 mt-3 text-lg">{mockChallenge.description}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card variant="paper" className="text-center">
          <CardContent>
            <p className="font-heading text-2xl text-primary-500">{mockChallenge.pointsReward}</p>
            <p className="text-xs text-ink-500 mt-1">{t('points', { points: '' }).replace(' ', '')}</p>
          </CardContent>
        </Card>
        <Card variant="paper" className="text-center">
          <CardContent>
            <p className="font-heading text-2xl text-ink-900">{mockChallenge.estimatedDuration}</p>
            <p className="text-xs text-ink-500 mt-1">Duration</p>
          </CardContent>
        </Card>
        <Card variant="paper" className="text-center">
          <CardContent>
            <p className="font-heading text-2xl text-ink-900">{mockChallenge.requiredPlayersMin}-{mockChallenge.requiredPlayersMax}</p>
            <p className="text-xs text-ink-500 mt-1">Players</p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card variant="notebook">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-ink-700 leading-relaxed">
            {mockChallenge.instructions}
          </div>
        </CardContent>
      </Card>

      {/* Safety Notes */}
      <Card className="border-l-4 border-l-warning bg-secondary-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {t('safetyFirst')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-ink-700 leading-relaxed">
            {mockChallenge.safetyNotes}
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      {mockChallenge.equipment.length > 0 && (
        <Card variant="paper">
          <CardHeader>
            <CardTitle>Equipment Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockChallenge.equipment.map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Button */}
      <div className="text-center py-4">
        <Button size="lg" className="min-w-[200px]">
          {t('startChallenge')}
        </Button>
      </div>
    </div>
  );
}
