'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';

type Step = 'age' | 'parent-email' | 'parent-consent' | 'profile';

const AVATAR_PRESETS = [
  'explorer', 'astronaut', 'ninja', 'wizard',
  'robot', 'dragon', 'unicorn', 'pirate',
] as const;

const MIN_AGE = 6;
const COPPA_AGE = 13;

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function SignUpPage() {
  const t = useTranslations('auth');
  const { signUp } = useAuth();

  const [step, setStep] = useState<Step>('age');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Age step
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState<number | null>(null);

  // Parent step
  const [parentEmail, setParentEmail] = useState('');

  // Consent step
  const [consentData, setConsentData] = useState(false);
  const [consentSafety, setConsentSafety] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);

  // Profile step
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarPreset, setAvatarPreset] = useState<string>(AVATAR_PRESETS[0]);

  const isUnder13 = age !== null && age < COPPA_AGE;

  const totalSteps = isUnder13 ? 4 : 2;

  function getCurrentStepNumber(): number {
    if (step === 'age') return 1;
    if (step === 'parent-email') return 2;
    if (step === 'parent-consent') return 3;
    // profile
    return isUnder13 ? 4 : 2;
  }

  function handleAgeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!dateOfBirth) {
      setError(t('requiredField'));
      return;
    }

    const calculatedAge = calculateAge(new Date(dateOfBirth));
    setAge(calculatedAge);

    if (calculatedAge < MIN_AGE) {
      setError(t('tooYoung'));
      return;
    }

    if (calculatedAge < COPPA_AGE) {
      setStep('parent-email');
    } else {
      setStep('profile');
    }
  }

  function handleParentEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!parentEmail) {
      setError(t('invalidEmail'));
      return;
    }

    setStep('parent-consent');
  }

  function handleConsentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!consentData || !consentSafety || !consentTerms) {
      setError(t('requiredField'));
      return;
    }

    setStep('profile');
  }

  async function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(t('invalidEmail'));
      return;
    }
    if (!password || password.length < 8) {
      setError(t('passwordMinLength'));
      return;
    }
    if (!displayName) {
      setError(t('requiredField'));
      return;
    }

    setIsLoading(true);
    try {
      const metadata: Record<string, string | boolean> = {
        display_name: displayName,
        avatar_preset: avatarPreset,
        date_of_birth: dateOfBirth,
      };

      if (isUnder13) {
        metadata.parent_email = parentEmail;
        metadata.parent_consent_given = true;
      }

      const { error: signUpError } = await signUp(email, password, metadata);
      if (signUpError) {
        setError(signUpError.message);
      }
    } catch {
      setError(t('unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {t('signUpTitle')}
        </CardTitle>
        <p className="text-center text-sm text-ink-500 mt-1">
          {t('step', { current: getCurrentStepNumber(), total: totalSteps })}
        </p>
      </CardHeader>
      <CardContent>
        {/* Step 1: Age Check */}
        {step === 'age' && (
          <form onSubmit={handleAgeSubmit} className="space-y-4">
            <div>
              <h3 className="font-heading text-lg mb-1">{t('ageCheck')}</h3>
              <p className="text-sm text-ink-500 mb-3">{t('ageCheckDescription')}</p>
            </div>
            <Input
              type="date"
              label={t('dateOfBirth')}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
            {error && (
              <p className="text-danger text-sm" role="alert">{error}</p>
            )}
            <Button type="submit" className="w-full">
              {t('signUpButton')}
            </Button>
          </form>
        )}

        {/* Step 2: Parent Email (under 13 only) */}
        {step === 'parent-email' && (
          <form onSubmit={handleParentEmailSubmit} className="space-y-4">
            <div>
              <h3 className="font-heading text-lg mb-1">{t('parentRequired')}</h3>
              <p className="text-sm text-ink-500 mb-3">{t('parentEmailDescription')}</p>
            </div>
            <Input
              type="email"
              label={t('parentEmail')}
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              placeholder="parent@example.com"
              autoComplete="email"
              required
            />
            {error && (
              <p className="text-danger text-sm" role="alert">{error}</p>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('age')}
                className="flex-1"
              >
                {t('backToSignIn')}
              </Button>
              <Button type="submit" className="flex-1">
                {t('signUpButton')}
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Parent Consent (under 13 only) */}
        {step === 'parent-consent' && (
          <form onSubmit={handleConsentSubmit} className="space-y-4">
            <div>
              <h3 className="font-heading text-lg mb-1">{t('parentConsentTitle')}</h3>
              <p className="text-sm text-ink-500 mb-3">{t('parentConsentDescription')}</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentData}
                onChange={(e) => setConsentData(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink-300 text-primary-500 focus:ring-primary-400"
              />
              <span className="text-sm text-ink-700">{t('parentConsentDataCollection')}</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentSafety}
                onChange={(e) => setConsentSafety(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink-300 text-primary-500 focus:ring-primary-400"
              />
              <span className="text-sm text-ink-700">{t('parentConsentSafety')}</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink-300 text-primary-500 focus:ring-primary-400"
              />
              <span className="text-sm text-ink-700">{t('parentConsentTerms')}</span>
            </label>

            {error && (
              <p className="text-danger text-sm" role="alert">{error}</p>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('parent-email')}
                className="flex-1"
              >
                {t('backToSignIn')}
              </Button>
              <Button
                type="submit"
                disabled={!consentData || !consentSafety || !consentTerms}
                className="flex-1"
              >
                {t('signUpButton')}
              </Button>
            </div>
          </form>
        )}

        {/* Step 4 (or 2): Profile Setup */}
        {step === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <h3 className="font-heading text-lg mb-1">{t('profileSetup')}</h3>
              <p className="text-sm text-ink-500 mb-3">{t('profileSetupDescription')}</p>
            </div>

            <Input
              type="email"
              label={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Input
              type="password"
              label={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <Input
              type="text"
              label={t('displayName')}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={t('displayNamePlaceholder')}
              maxLength={20}
              required
            />
            <p className="text-xs text-ink-400 -mt-2">{t('displayNameHint')}</p>

            <div>
              <p className="font-heading font-bold text-ink-900 text-sm mb-2">
                {t('chooseAvatar')}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {AVATAR_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAvatarPreset(preset)}
                    className={`
                      aspect-square rounded-xl border-2 flex items-center justify-center
                      text-2xl transition-all capitalize text-xs font-heading
                      ${avatarPreset === preset
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-300'
                        : 'border-ink-100 bg-white hover:border-ink-300'
                      }
                    `}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-danger text-sm" role="alert">{error}</p>
            )}
            <div className="flex gap-3">
              {isUnder13 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('parent-consent')}
                  className="flex-1"
                >
                  {t('backToSignIn')}
                </Button>
              )}
              <Button
                type="submit"
                isLoading={isLoading}
                className={isUnder13 ? 'flex-1' : 'w-full'}
              >
                {isLoading ? t('creatingAccount') : t('signUpButton')}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-ink-500">
            {t('hasAccount')}{' '}
            <Link
              href="/sign-in"
              className="text-primary-500 hover:text-primary-600 font-bold transition-colors"
            >
              {t('signInButton')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
