'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select } from '@/components/ui';

const avatarOptions = [
  { key: 'astronaut', emoji: '🧑‍🚀' },
  { key: 'rocket', emoji: '🚀' },
  { key: 'star', emoji: '⭐' },
  { key: 'lightning', emoji: '⚡' },
  { key: 'tree', emoji: '🌳' },
  { key: 'wave', emoji: '🌊' },
  { key: 'fox', emoji: '🦊' },
  { key: 'bear', emoji: '🐻' },
  { key: 'eagle', emoji: '🦅' },
  { key: 'unicorn', emoji: '🦄' },
  { key: 'dragon', emoji: '🐉' },
  { key: 'penguin', emoji: '🐧' },
];

const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'pt', label: 'Português' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'zh', label: '中文' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'ar', label: 'العربية' },
];

// TODO: Replace with real user data from Supabase
const mockUser = {
  displayName: 'Explorer42',
  avatarPreset: 'astronaut',
  locale: 'en',
};

export default function SettingsPage() {
  const t = useTranslations('app.settings');
  const [displayName, setDisplayName] = useState(mockUser.displayName);
  const [selectedAvatar, setSelectedAvatar] = useState(mockUser.avatarPreset);
  const [locale, setLocale] = useState(mockUser.locale);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    // TODO: Call Supabase to update profile
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage(t('saveSuccess'));
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Display Name */}
        <Card variant="paper">
          <CardHeader>
            <CardTitle>{t('displayName')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              variant="paper"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={30}
              required
            />
          </CardContent>
        </Card>

        {/* Avatar */}
        <Card variant="notebook">
          <CardHeader>
            <CardTitle>{t('avatar')}</CardTitle>
            <p className="text-sm text-ink-500 mt-1">
              {t('currentAvatar')}: {avatarOptions.find((a) => a.key === selectedAvatar)?.emoji}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.key}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.key)}
                  className={`
                    flex items-center justify-center p-3 rounded-xl text-2xl transition-all duration-200
                    ${selectedAvatar === avatar.key
                      ? 'bg-primary-100 ring-2 ring-primary-500 shadow-paper scale-110'
                      : 'bg-paper-warm hover:bg-secondary-50 hover:scale-105'
                    }
                  `}
                  aria-label={avatar.key}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locale */}
        <Card variant="paper">
          <CardHeader>
            <CardTitle>{t('locale')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
            >
              {localeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex items-center gap-4">
          <Button type="submit" size="lg" isLoading={isSaving}>
            {t('title')}
          </Button>
          {saveMessage && (
            <p className="text-tertiary-400 font-heading font-bold text-sm">{saveMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
