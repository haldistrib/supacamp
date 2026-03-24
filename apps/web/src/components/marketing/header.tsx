'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui';
import { LocaleSwitcher } from './locale-switcher';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('features'), href: '/features' as const },
    { label: t('blog'), href: '/blog' as const },
    { label: t('about'), href: '/about' as const },
    { label: t('contact'), href: '/contact' as const },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper-cream/90 backdrop-blur-md border-b border-ink-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl text-primary-500 hover:text-primary-600 transition-colors tracking-wide">
          Supacamp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-primary-500 ${
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? 'text-primary-500'
                  : 'text-ink-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">{t('signIn')}</Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">{t('signUp')}</Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher />
          <button
            className="p-2 text-ink-500 hover:text-ink-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ink-100 bg-paper-cream px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-ink-700 text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-paper-warm transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-ink-100 mt-2">
            <Link href="/sign-in" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">{t('signIn')}</Button>
            </Link>
            <Link href="/sign-up" className="flex-1">
              <Button size="sm" className="w-full">{t('signUp')}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
