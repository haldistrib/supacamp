export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-cream">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="mt-4 font-heading text-lg text-ink-500">Loading...</p>
      </div>
    </div>
  );
}
