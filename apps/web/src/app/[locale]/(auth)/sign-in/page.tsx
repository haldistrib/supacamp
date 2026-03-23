'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';

export default function SignInPage() {
  const t = useTranslations('auth');
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(t('invalidEmail'));
      return;
    }
    if (!password) {
      setError(t('requiredField'));
      return;
    }

    setIsLoading(true);
    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message);
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
          {t('signInTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="text-danger text-sm" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full">
            {isLoading ? t('signingIn') : t('signInButton')}
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <Link
            href="/forgot-password"
            className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
          >
            {t('forgotPassword')}
          </Link>
          <p className="text-sm text-ink-500">
            {t('noAccount')}{' '}
            <Link
              href="/sign-up"
              className="text-primary-500 hover:text-primary-600 font-bold transition-colors"
            >
              {t('signUpButton')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
