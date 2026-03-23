'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const t = useTranslations('auth');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!password || password.length < 8) {
      setError(t('passwordMinLength'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('passwordsMustMatch'));
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setIsSuccess(true);
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
          {t('resetPasswordTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="text-center space-y-4">
            <p className="text-ink-700">{t('resetPasswordSuccess')}</p>
            <Link
              href="/sign-in"
              className="text-primary-500 hover:text-primary-600 font-bold text-sm transition-colors"
            >
              {t('backToSignIn')}
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-500 mb-4 text-center">
              {t('resetPasswordDescription')}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                label={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <Input
                type="password"
                label={t('confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              {error && (
                <p className="text-danger text-sm" role="alert">{error}</p>
              )}

              <Button type="submit" isLoading={isLoading} className="w-full">
                {isLoading ? t('resettingPassword') : t('resetPassword')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link
                href="/sign-in"
                className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
              >
                {t('backToSignIn')}
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
