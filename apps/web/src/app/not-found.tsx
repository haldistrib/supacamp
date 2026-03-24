import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-paper-cream font-body text-ink-900">
        <div className="max-w-md mx-auto text-center px-4">
          <h1 className="font-heading text-8xl text-primary-500 mb-4">404</h1>
          <h2 className="font-heading text-2xl mb-3">Page Not Found</h2>
          <p className="text-ink-500 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl font-heading text-lg hover:bg-primary-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
