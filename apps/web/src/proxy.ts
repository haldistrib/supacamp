import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(en|fr|es|de|pt|ja|ko|zh|ar|hi)/:path*',
  ],
};
