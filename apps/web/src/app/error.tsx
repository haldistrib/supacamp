'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-paper-cream font-body text-ink-900">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-xl shadow-paper p-10 hand-drawn-border paper-texture">
            <h1 className="font-heading text-6xl text-secondary-400 mb-4">Oops!</h1>
            <h2 className="font-heading text-2xl mb-3">Something Went Wrong</h2>
            <p className="text-ink-700 mb-8">
              An unexpected error occurred. Don&apos;t worry, these things happen on
              every adventure.
            </p>
            <button
              onClick={reset}
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg font-heading text-lg hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
