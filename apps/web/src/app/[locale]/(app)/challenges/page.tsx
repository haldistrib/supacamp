'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, Button, Badge, Select } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';

// TODO: Replace with real data fetching from Supabase
const mockChallenges = [
  { id: '1', title: 'Mountain Hike', description: 'Hike to the top of a local hill or mountain trail.', category: 'athletic', difficulty: 'hard', pointsReward: 300, estimatedDuration: '2 hours', requiredPlayersMin: 2, requiredPlayersMax: 8, isOutdoor: true },
  { id: '2', title: 'Nature Sketch', description: 'Draw three different plants you find in a park.', category: 'creative', difficulty: 'easy', pointsReward: 100, estimatedDuration: '45 min', requiredPlayersMin: 1, requiredPlayersMax: 4, isOutdoor: true },
  { id: '3', title: 'River Crossing', description: 'Build a small bridge using sticks and cross a stream.', category: 'teamwork', difficulty: 'medium', pointsReward: 250, estimatedDuration: '1 hour', requiredPlayersMin: 3, requiredPlayersMax: 6, isOutdoor: true },
  { id: '4', title: 'Star Gazing', description: 'Identify five constellations in the night sky.', category: 'exploration', difficulty: 'easy', pointsReward: 120, estimatedDuration: '1 hour', requiredPlayersMin: 1, requiredPlayersMax: 8, isOutdoor: true },
  { id: '5', title: 'Team Relay', description: 'Complete a relay race with creative obstacles.', category: 'athletic', difficulty: 'medium', pointsReward: 200, estimatedDuration: '30 min', requiredPlayersMin: 4, requiredPlayersMax: 8, isOutdoor: true },
  { id: '6', title: 'Indoor Fort', description: 'Build the most creative indoor fort using household items.', category: 'creative', difficulty: 'easy', pointsReward: 150, estimatedDuration: '1 hour', requiredPlayersMin: 2, requiredPlayersMax: 6, isOutdoor: false },
];

const categories = ['all', 'athletic', 'creative', 'exploration', 'teamwork'] as const;
const difficulties = ['all', 'easy', 'medium', 'hard'] as const;

export default function ChallengesPage() {
  const t = useTranslations('app.challenges');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filtered = mockChallenges.filter((c) => {
    if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
    if (difficultyFilter !== 'all' && c.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('available')}</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </Select>
        <Select
          label={t('difficulty')}
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff === 'all' ? 'All Difficulties' : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {/* Challenge Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((challenge) => (
            <Card key={challenge.id} variant="paper" className="flex flex-col">
              <CardContent className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-heading text-lg text-ink-900">{challenge.title}</h3>
                  <Badge variant={
                    challenge.difficulty === 'hard' ? 'danger' :
                    challenge.difficulty === 'medium' ? 'warning' : 'success'
                  }>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <p className="text-ink-600 text-sm">{challenge.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('duration', { duration: challenge.estimatedDuration })}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {t('players', { min: challenge.requiredPlayersMin, max: challenge.requiredPlayersMax })}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-ink-100">
                  <span className="font-heading font-bold text-primary-500">
                    {t('points', { points: challenge.pointsReward })}
                  </span>
                  <Link href={`/challenges/${challenge.id}` as '/challenges'}>
                    <Button size="sm">{t('viewDetails')}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-ink-500">No challenges match your filters.</p>
        </div>
      )}
    </div>
  );
}
