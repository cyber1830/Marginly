import Link from "next/link";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12 text-ink">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="font-bold text-forest">
          ← Dashboard
        </Link>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
              Reports
            </p>
            <h1 className="mt-4 font-display text-6xl">
              See what you reclaimed.
            </h1>
            <p className="mt-4 text-ink/55">
              Illustrative report values until POS and payment data are
              connected.
            </p>
          </div>
          <a
            href="/api/reports/export"
            className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
          >
            Export CSV ↗
          </a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["$4,812", "Commission saved"],
            ["61%", "Direct order mix"],
            ["2.4×", "Repeat customer value"],
          ].map((row) => (
            <section
              className="rounded-card border border-ink/10 bg-paper p-6"
              key={row[1]}
            >
              <b className="font-display text-4xl text-forest">{row[0]}</b>
              <p className="mt-2 text-xs text-ink/50">{row[1]}</p>
            </section>
          ))}
        </div>
        <section className="mt-5 rounded-card border border-ink/10 bg-paper p-7">
          <h2 className="font-display text-3xl">Margin trend</h2>
          <div className="mt-6 h-48 rounded-lg bg-[repeating-linear-gradient(0deg,#fffaf5,#fffaf5_45px,#e9e1d7_46px)]">
            <svg
              viewBox="0 0 700 190"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M0 160 C120 155 180 135 260 145 S390 95 470 105 S560 50 700 60"
                fill="none"
                stroke="#e4472b"
                strokeWidth="4"
              />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
}
