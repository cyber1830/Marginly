"use client";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-tomato">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-5xl">Let’s try that again.</h1>
        <p className="mt-4 text-ink/55">
          The demo encountered an unexpected state.
        </p>
        <button
          onClick={() => reset()}
          className="mt-7 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
