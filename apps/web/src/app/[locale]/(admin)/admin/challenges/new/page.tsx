'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Textarea } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';

const categoryOptions = ['athletic', 'creative', 'exploration', 'teamwork'] as const;
const difficultyOptions = ['easy', 'medium', 'hard'] as const;

export default function AdminChallengeNewPage() {
  const t = useTranslations('admin.challengeForm');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    instructions: '',
    safetyNotes: '',
    category: 'athletic',
    difficulty: 'easy',
    pointsReward: 100,
    estimatedDuration: '',
    minPlayers: 1,
    maxPlayers: 8,
    isIndoor: false,
    isOutdoor: true,
  });

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Call Supabase to insert into challenges + challenge_translations tables
    console.log('Creating challenge:', form);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back link */}
      <Link href="/admin/challenges" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Challenges
      </Link>

      <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Description */}
        <Card variant="paper">
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label={t('challengeTitle')}
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
            />
            <Textarea
              label={t('description')}
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              required
            />
          </CardContent>
        </Card>

        {/* Instructions & Safety */}
        <Card variant="notebook">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              label={t('instructions')}
              variant="paper"
              value={form.instructions}
              onChange={(e) => updateField('instructions', e.target.value)}
              required
            />
            <Textarea
              label={t('safetyNotes')}
              value={form.safetyNotes}
              onChange={(e) => updateField('safetyNotes', e.target.value)}
              required
            />
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card variant="paper">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label={t('category')}
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </Select>
              <Select
                label={t('difficulty')}
                value={form.difficulty}
                onChange={(e) => updateField('difficulty', e.target.value)}
              >
                {difficultyOptions.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label={t('pointsReward')}
                type="number"
                value={form.pointsReward.toString()}
                onChange={(e) => updateField('pointsReward', parseInt(e.target.value) || 0)}
                min={0}
                required
              />
              <Input
                label={t('estimatedDuration')}
                value={form.estimatedDuration}
                onChange={(e) => updateField('estimatedDuration', e.target.value)}
                placeholder="e.g. 1 hour"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('minPlayers')}
                type="number"
                value={form.minPlayers.toString()}
                onChange={(e) => updateField('minPlayers', parseInt(e.target.value) || 1)}
                min={1}
                max={8}
                required
              />
              <Input
                label={t('maxPlayers')}
                type="number"
                value={form.maxPlayers.toString()}
                onChange={(e) => updateField('maxPlayers', parseInt(e.target.value) || 1)}
                min={1}
                max={8}
                required
              />
            </div>

            {/* Indoor / Outdoor toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isIndoor}
                  onChange={(e) => updateField('isIndoor', e.target.checked)}
                  className="w-4 h-4 rounded border-ink-300 text-primary-500 focus:ring-primary-400"
                />
                <span className="font-heading font-bold text-sm text-ink-900">{t('indoor')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isOutdoor}
                  onChange={(e) => updateField('isOutdoor', e.target.checked)}
                  className="w-4 h-4 rounded border-ink-300 text-primary-500 focus:ring-primary-400"
                />
                <span className="font-heading font-bold text-sm text-ink-900">{t('outdoor')}</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" isLoading={isSubmitting}>
            {t('create')}
          </Button>
        </div>
      </form>
    </div>
  );
}
