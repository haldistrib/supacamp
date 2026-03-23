'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(t('invalidEmail'));
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setIsSent(true);
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
          {t('forgotPasswordTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSent ? (
          <div className="text-center space-y-4">
            <p className="text-ink-700">{t('resetLinkSent')}</p>
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
              {t('forgotPasswordDescription')}
            </p>
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

              {error && (
                <p className="text-danger text-sm" role="alert">{error}</p>
              )}

              <Button type="submit" isLoading={isLoading} className="w-full">
                {isLoading ? t('sendingResetLink') : t('sendResetLink')}
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
