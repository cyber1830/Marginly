import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-tomato">
          404 · Wrong turn
        </p>
        <h1 className="mt-4 font-display text-7xl leading-none">
          This page wandered off.
        </h1>
        <p className="mt-5 text-lg text-ink/55">
          The restaurant is still here. Head back to the main story.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
        >
          Back home ↗
        </Link>
      </div>
    </main>
  );
}
