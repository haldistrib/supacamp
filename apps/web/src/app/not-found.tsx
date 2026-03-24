import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white font-body text-ink-900">
        <div className="max-w-md mx-auto text-center px-4">
          <h1 className="text-7xl font-bold text-ink-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-ink-500 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-ink-900 text-white rounded-lg text-sm font-medium hover:bg-ink-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
