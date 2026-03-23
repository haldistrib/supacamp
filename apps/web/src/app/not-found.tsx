import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-paper-cream font-body text-ink-900">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-xl shadow-paper p-10 hand-drawn-border paper-texture">
            <h1 className="font-heading text-8xl text-primary-500 mb-4">404</h1>
            <h2 className="font-heading text-2xl mb-3">Page Not Found</h2>
            <p className="text-ink-700 mb-8">
              Looks like this trail leads nowhere. The page you are looking for
              does not exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg font-heading text-lg hover:bg-primary-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
