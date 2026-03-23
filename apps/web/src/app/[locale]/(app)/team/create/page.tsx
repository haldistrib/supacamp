'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';

const avatarOptions = [
  { key: 'team_fire', emoji: '🔥', label: 'Fire' },
  { key: 'team_lightning', emoji: '⚡', label: 'Lightning' },
  { key: 'team_star', emoji: '⭐', label: 'Star' },
  { key: 'team_rocket', emoji: '🚀', label: 'Rocket' },
  { key: 'team_mountain', emoji: '⛰️', label: 'Mountain' },
  { key: 'team_wave', emoji: '🌊', label: 'Wave' },
  { key: 'team_forest', emoji: '🌲', label: 'Forest' },
  { key: 'team_eagle', emoji: '🦅', label: 'Eagle' },
  { key: 'team_wolf', emoji: '🐺', label: 'Wolf' },
  { key: 'team_dragon', emoji: '🐉', label: 'Dragon' },
  { key: 'team_unicorn', emoji: '🦄', label: 'Unicorn' },
  { key: 'team_trophy', emoji: '🏆', label: 'Trophy' },
];

export default function TeamCreatePage() {
  const t = useTranslations('app.teamCreate');
  const [teamName, setTeamName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('team_fire');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    setIsSubmitting(true);
    // TODO: Call Supabase to create team with teamName and selectedAvatar
    // Then redirect to /team
    setTimeout(() => setIsSubmitting(false), 1500); // Simulated delay
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 py-8">
      <h1 className="font-heading text-3xl text-ink-900 text-center">{t('title')}</h1>

      <form onSubmit={handleSubmit}>
        <Card variant="paper" className="space-y-6">
          <CardHeader>
            <CardTitle>{t('teamName')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              variant="paper"
              placeholder={t('teamNamePlaceholder')}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              maxLength={30}
              required
            />

            {/* Avatar Selection */}
            <div>
              <p className="font-heading font-bold text-ink-900 text-sm mb-3">
                {t('selectAvatar')}
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.key}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.key)}
                    className={`
                      flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200
                      ${selectedAvatar === avatar.key
                        ? 'bg-primary-100 ring-2 ring-primary-500 shadow-paper scale-110'
                        : 'bg-paper-warm hover:bg-secondary-50 hover:scale-105'
                      }
                    `}
                    aria-label={avatar.label}
                  >
                    <span className="text-2xl">{avatar.emoji}</span>
                    <span className="text-xs text-ink-500 font-heading">{avatar.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              disabled={!teamName.trim()}
            >
              {t('create')}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
