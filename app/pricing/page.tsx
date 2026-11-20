import Link from "next/link";
const plans = [
  {
    name: "Benchmark",
    price: "Demo",
    text: "See your zipcode pricing, assortment gaps and practical next moves.",
  },
  {
    name: "Early access",
    price: "Let's talk",
    text: "Build and approve the direct-order foundation with the Marginly team.",
  },
  {
    name: "Workspace",
    price: "Custom",
    text: "Bring together orders, reports, agent suggestions, visuals and team roles.",
  },
];
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-bold text-forest">
          ← Marginly
        </Link>
        <div className="mx-auto mb-14 mt-20 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Simple next steps
          </p>
          <h1 className="mt-5 font-display text-6xl leading-none">
            Start with the margin you can see.
          </h1>
          <p className="mt-6 leading-7 text-ink/55">
            Marginly is built for Indian restaurants: menu intelligence, an AI
            agent, direct ordering and UPI-ready operations in one product.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <section
              className={`rounded-card border p-7 ${index === 1 ? "border-forest bg-forest text-white" : "border-ink/10 bg-paper"}`}
              key={plan.name}
            >
              <p
                className={`text-xs font-bold uppercase tracking-widest ${index === 1 ? "text-saffron" : "text-forest"}`}
              >
                0{index + 1}
              </p>
              <h2 className="mt-5 font-display text-3xl">{plan.name}</h2>
              <p
                className={`mt-4 min-h-20 text-sm leading-6 ${index === 1 ? "text-white/70" : "text-ink/55"}`}
              >
                {plan.text}
              </p>
              <b
                className={`mt-6 block font-display text-4xl ${index === 1 ? "text-saffron" : "text-forest"}`}
              >
                {plan.price}
              </b>
              <Link
                href={`/onboarding?plan=${encodeURIComponent(plan.name)}`}
                className="mt-6 inline-block rounded-full bg-saffron px-4 py-3 text-sm font-bold text-ink"
              >
                {index === 0
                  ? "See benchmark ↗"
                  : index === 1
                    ? "Start with Marginly ↗"
                    : "Choose workspace ↗"}
              </Link>
            </section>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-ink/50">
          Illustrative packaging only. Final pricing, POS support and service
          scope will be confirmed before onboarding.
        </p>
      </div>
    </main>
  );
}
