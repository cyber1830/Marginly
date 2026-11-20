export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest font-display text-2xl text-white">
          M
        </span>
        <p className="mt-4 text-sm text-ink/50">Loading your workspace…</p>
      </div>
    </main>
  );
}
