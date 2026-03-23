import type { ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper-cream px-4 py-8">
      <Link href="/" className="mb-8 font-heading text-3xl text-primary-500 hover:text-primary-600 transition-colors">
        Supacamp
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
