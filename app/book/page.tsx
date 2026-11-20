import { LeadForm } from "@/components/LeadForm";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-night px-6 py-20 text-paper">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-forest font-display text-lg">
            M
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Marginly
          </span>
        </a>
        <div className="mt-24 grid gap-12 rounded-card bg-forest p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-saffron">
              Ready when you are
            </p>
            <h1 className="mt-5 font-display text-5xl leading-none">
              Let’s find your next margin.
            </h1>
            <p className="mt-6 leading-7 text-paper/70">
              Share a few details and we’ll walk you through the benchmark, menu
              plan and direct-order path.
            </p>
          </div>
          <LeadForm />
        </div>
      </div>
    </main>
  );
}
