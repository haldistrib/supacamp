import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { routing } from '@/lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_SEGMENTS = ['(app)', '(admin)', 'dashboard', 'team', 'challenges', 'videos', 'settings', 'admin'];

function isProtectedPath(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  // Remove locale prefix (e.g., "en")
  const pathSegments = segments.length > 0 ? segments.slice(1) : [];
  return pathSegments.some((segment) => PROTECTED_SEGMENTS.includes(segment));
}

function getSignInUrl(request: NextRequest): string {
  const url = request.nextUrl.clone();
  // Extract locale from path, default to 'en'
  const pathLocale = url.pathname.split('/')[1];
  const locale = routing.locales.includes(pathLocale as typeof routing.locales[number])
    ? pathLocale
    : routing.defaultLocale;
  url.pathname = `/${locale}/sign-in`;
  return url.toString();
}

export async function proxy(request: NextRequest) {
  // Create a response from the intl middleware
  const intlResponse = intlMiddleware(request);

  // Create a mutable response to set cookies on
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Copy intl middleware headers and status
  intlResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  // Refresh the Supabase session by creating a server client that reads/writes cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request for downstream usage
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Set cookies on the response for the browser
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh the session (this also updates cookies if the token was refreshed)
  const { data: { user } } = await supabase.auth.getUser();

  // Protect routes that require authentication
  if (isProtectedPath(request.nextUrl.pathname) && !user) {
    return NextResponse.redirect(getSignInUrl(request));
  }

  // If the intl middleware returned a redirect, honour it
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(en|fr|es|de|pt|ja|ko|zh|ar|hi)/:path*',
  ],
};
