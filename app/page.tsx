"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { LeadForm } from "../components/LeadForm";
import { api, type Benchmark } from "../lib/api";

const steps = [
  "Sync your menu",
  "Benchmark your market",
  "Engineer what sells",
  "Create the upgrade",
  "List your storefront",
  "Create demand",
  "Receive direct orders",
];
const descriptions = [
  "Import your current menu from platforms instantly.",
  "Compare prices, assortment and protein mix at PIN-code level.",
  "Human + our agent find practical changes that are easy to execute.",
  "Photoshoot-grade visuals that keep your food authentic.",
  "Launch a modular direct-order storefront with 0% platform commission.",
  "Approve ready-to-post social content and menu links.",
  "Orders and revenue flow straight to your POS.",
];
const faqs = [
  "Do I need to leave my current platforms?",
  "Which POS systems work?",
  "How is food authenticity preserved?",
  "What does it cost?",
  "Who owns the customer data?",
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-forest font-display text-lg text-white">
        M
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">
        Marginly
      </span>
    </a>
  );
}
function SampleTable({
  zipcode,
  benchmark,
}: {
  zipcode: string;
  benchmark: Benchmark | null;
}) {
  const fallbackRows = [
    ["Lucknowi chicken biryani", "₹319", "₹349", "↑ ₹30"],
    ["Tandoori paneer tikka", "₹219", "₹249", "↑ ₹30"],
    ["Masala chai", "₹80", "₹99", "↑ ₹19"],
  ];
  const rows =
    benchmark?.items?.map((item) => [
      item.name,
      `₹${item.yourPrice}`,
      `₹${item.median}`,
      item.opportunity ? `↑ ₹${item.opportunity}` : "—",
    ]) || fallbackRows;
  return (
    <div className="rounded-card bg-paper p-7 text-ink shadow-2xl">
      <div className="flex justify-between gap-4">
        <div>
          <small className="font-bold tracking-widest text-forest">
            DEMO BENCHMARK
          </small>
          <h3 className="mt-2 font-display text-2xl">
            {benchmark?.city || "Fort, Mumbai"}
          </h3>
        </div>
        <span className="text-xs text-forest">● Refreshed today</span>
      </div>
      <p className="mt-5 text-xs text-ink/50">
        {zipcode || "400001"} · {benchmark?.comparableMenus || 18} comparable
        menus · Illustrative sample data
      </p>
      <div className="mt-5 overflow-hidden rounded-lg border border-ink/10">
        <div className="grid grid-cols-4 bg-ink/[.04] p-3 text-[10px] text-ink/50">
          <span>Top seller</span>
          <span>Your price</span>
          <span>Median</span>
          <span>Delta</span>
        </div>
        {rows.map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-4 border-t border-ink/10 p-3 text-xs"
          >
            <span>{row[0]}</span>
            <span>{row[1]}</span>
            <span>{row[2]}</span>
            <b className="text-forest">{row[3]}</b>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Smash burger", "Family meal", "Seasonal pasta", "Value bundle"].map(
          (item) => (
            <span
              key={item}
              className="rounded-full bg-[#efe8dc] px-3 py-2 text-[11px]"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [direct, setDirect] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [zipcode, setZipcode] = useState("400001");
  const [queriedZipcode, setQueriedZipcode] = useState("400001");
  const [benchmark, setBenchmark] = useState<Benchmark | null>(null);
  const [split, setSplit] = useState(50);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  return (
    <main id="top">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="hidden gap-8 text-sm text-ink/60 md:flex">
            <a href="#process">How it works</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#upgrade">The upgrade</a>
            <a href="#pricing">Pricing</a>
            <a href="#agent">Agent</a>
            <a href="#faq">FAQ</a>
          </div>
          <a
            className="rounded-full bg-forest px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5"
            href="#cta"
          >
            Walk me through it <ArrowUpRight className="ml-2 inline h-3 w-3" />
          </a>
        </nav>
      </header>
      <section className="mx-auto grid min-h-[680px] max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.05fr_.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            India-first restaurant growth OS
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-6xl leading-[.95] tracking-[-.055em] md:text-8xl">
            Stop losing margin to marketplaces.{" "}
            <em className="not-italic text-forest">
              Grow direct orders in 7 days.
            </em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/60">
            Marginly brings your menu intelligence, AI agent, UPI ordering and
            customer relationship into one India-first workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              className="rounded-full bg-forest px-6 py-4 font-bold text-white"
              href="#cta"
            >
              Walk me through it{" "}
              <ArrowUpRight className="ml-3 inline h-4 w-4" />
            </a>
            <a className="font-bold" href="#process">
              See the 7-day plan <ArrowDown className="ml-2 inline h-4 w-4" />
            </a>
          </div>
          <p className="mt-12 text-xs text-ink/50">
            ✦ Built for Indian restaurants · UPI · GST · POS-ready
          </p>
        </motion.div>
        <motion.div
          style={{ y: heroY }}
          className="relative grid min-h-[430px] place-items-center bg-[radial-gradient(circle,#f0dfc7_0,transparent_58%)]"
        >
          <div className="relative grid h-80 w-80 place-items-center rounded-full bg-[conic-gradient(#e4472b_0_35%,#f2a93b_35%_65%,#b7a99a_65%_87%,#0f5b3a_87%)] shadow-2xl shadow-ink/10 before:absolute before:h-60 before:w-60 before:rounded-full before:bg-paper">
            <div className="relative text-center">
              <strong className="block font-display text-7xl text-tomato">
                35<span className="text-3xl">%</span>
              </strong>
              <small className="text-xs text-ink/50">
                typical marketplace
                <br />
                commission pressure
              </small>
            </div>
          </div>
          <div className="absolute right-0 top-14 rounded-xl bg-white px-4 py-3 text-xs font-bold shadow-xl">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-tomato" />
            Third-party
          </div>
          <div className="absolute bottom-16 left-0 rounded-xl bg-white px-4 py-3 text-xs font-bold shadow-xl">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-forest" />
            Direct orders <b className="ml-2 text-forest">+₹35</b>
          </div>
        </motion.div>
      </section>
      <section className="bg-night px-5 py-28 text-paper">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-saffron">
            The margin squeeze
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-none tracking-tight md:text-7xl">
            Every ₹100 order should leave more room for your kitchen.
          </h2>
          <p className="mt-6 max-w-xl leading-7 text-paper/60">
            Marketplace fees, discounts and weak customer ownership eat into
            Indian restaurant margins.
          </p>
          <div className="mt-16 rounded-card border border-white/10 bg-white/[.04] p-6">
            <div className="flex justify-between text-sm text-paper/60">
              <span>
                {direct ? "Direct order revenue" : "Third-party order revenue"}
              </span>
              <b className="font-display text-3xl text-white">₹100</b>
            </div>
            <button
              onClick={() => setDirect(!direct)}
              className="mt-5 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-paper"
            >
              {direct ? "Switch to third-party" : "See direct-order split"}
            </button>
            <div className="mt-6 flex h-24 overflow-hidden rounded-lg text-left font-display text-xl transition-all">
              <div
                className={`${direct ? "w-0 px-0" : "w-[35%] px-4"} overflow-hidden bg-tomato py-4 transition-all`}
              >
                ₹35
                <small className="block font-sans text-[10px]">
                  Commission
                </small>
              </div>
              <div className="w-[30%] bg-[#b8a99a] p-4 text-ink">
                ₹30
                <small className="block font-sans text-[10px]">
                  Cost of goods
                </small>
              </div>
              <div className="w-[22%] bg-saffron p-4 text-ink">
                ₹22
                <small className="block font-sans text-[10px]">
                  Operations
                </small>
              </div>
              <div
                className={`${direct ? "w-[48%]" : "w-[13%]"} bg-[#73a978] p-4 text-ink transition-all`}
              >
                {direct ? "₹48" : "₹13"}
                <small className="block font-sans text-[10px]">Net</small>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 p-5">
              <b className="font-display text-3xl text-saffron">35%</b>
              <p className="mt-2 text-sm text-paper/60">
                Typical commission pressure
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <b className="font-display text-3xl text-saffron">0</b>
              <p className="mt-2 text-sm text-paper/60">
                Customer relationship owned
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <b className="font-display text-3xl text-saffron">₹</b>
              <p className="mt-2 text-sm text-paper/60">
                Discount-driven demand
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="process"
        className="mx-auto grid max-w-6xl gap-20 px-5 py-32 md:grid-cols-[.8fr_1.2fr]"
      >
        <div className="md:sticky md:top-32 md:self-start">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            The Marginly process
          </p>
          <h2 className="mt-5 font-display text-5xl leading-none tracking-tight md:text-6xl">
            From menu to direct orders in{" "}
            <em className="not-italic text-forest">7 days.</em>
          </h2>
          <p className="mt-6 leading-7 text-ink/60">
            One connected workflow for the work that gets buried under service.
          </p>
        </div>
        <div>
          {steps.map((step, i) => (
            <motion.article
              key={step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 border-t border-ink/10 py-7"
            >
              <span className="font-display text-2xl text-ink/35">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold">{step}</h3>
                <p className="mt-2 max-w-lg leading-7 text-ink/55">
                  {descriptions[i]}
                </p>
                {i === 2 && (
                  <span className="mt-3 inline-block rounded-full bg-[#e6f0e8] px-3 py-1 text-[10px] font-bold text-forest">
                    Human + Agent
                  </span>
                )}
              </div>
              <ArrowUpRight className="ml-auto h-5 w-5 text-ink/30" />
            </motion.article>
          ))}
        </div>
      </section>
      <section id="intelligence" className="bg-night px-5 py-28 text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-saffron">
              Intelligence OS
            </p>
            <h2 className="mt-5 font-display text-5xl leading-none md:text-6xl">
              Your PIN code is telling you what to do next.
            </h2>
            <p className="mt-6 leading-7 text-paper/60">
              We turn competitor menus and market signals into decisions you can
              make before your next service.
            </p>
            <div className="mt-8 flex gap-2">
              <input
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                aria-label="Restaurant PIN code"
                className="w-32 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
              />
              <button
                onClick={async () => {
                  setQueriedZipcode(zipcode);
                  setBenchmark(await api.benchmark(zipcode));
                }}
                className="rounded-lg bg-saffron px-4 py-3 font-bold text-ink"
              >
                <Search className="inline h-4 w-4" /> Check
              </button>
            </div>
            <div className="mt-10 space-y-4 text-sm text-paper/60">
              <p>
                01{" "}
                <b className="ml-3 text-paper">
                  Competitive pricing intelligence
                </b>
              </p>
              <p>
                02 <b className="ml-3 text-paper">Assortment intelligence</b>
              </p>
              <p>
                03{" "}
                <b className="ml-3 text-paper">Engineering with macro trends</b>
              </p>
            </div>
          </div>
          <SampleTable zipcode={queriedZipcode} benchmark={benchmark} />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="rounded-card border border-forest/20 bg-[#e6f0e8] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Your restaurant operating model
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl leading-none md:text-6xl">
            Marginly helps restaurants make better decisions and keep more
            direct orders.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["1", "Understand", "Benchmark your PIN code and menu."],
              ["2", "Decide", "Agent drafts price, dish and combo ideas."],
              ["3", "Approve", "You approve every change before it goes live."],
              ["4", "Order", "Customers order via your storefront and UPI."],
            ].map((item) => (
              <div className="rounded-xl bg-paper p-5" key={item[0]}>
                <span className="font-display text-2xl text-forest">
                  {item[0]}
                </span>
                <h3 className="mt-4 font-bold">{item[1]}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/55">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="upgrade" className="mx-auto max-w-6xl px-5 py-32">
        <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
              The upgrade
            </p>
            <h2 className="mt-5 font-display text-5xl leading-none md:text-6xl">
              Same dish. Photoshoot quality.
            </h2>
            <p className="mt-6 leading-7 text-ink/60">
              Your food stays exactly as it is. We work on the background,
              lighting and colour until the thumbnail looks like your kitchen
              deserves.
            </p>
            <div className="mt-7 flex items-center gap-2 text-sm text-forest">
              <Sparkles className="h-4 w-4" /> Original food preserved ·
              illustrative visual demo
            </div>
          </div>
          <div>
            <div className="relative h-80 overflow-hidden rounded-card bg-[#d7b78e]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,#f5ddad,transparent_30%),linear-gradient(135deg,#9a6035,#e8c990)]" />
              <div
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ width: `${100 - split}%` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,#fff0c8,transparent_30%),linear-gradient(135deg,#462b1f,#e1b86c)]" />
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={split}
                onChange={(e) => setSplit(Number(e.target.value))}
                aria-label="Compare original and enhanced visual"
                className="absolute inset-x-4 bottom-4 accent-saffron"
              />
              <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold">
                Original
              </span>
              <span className="absolute right-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold">
                Enhanced scene
              </span>
            </div>
            <p className="mt-3 text-xs text-ink/50">
              Drag to compare · the dish itself is never altered.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#efe8dc] px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Early product, clearly labelled
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-card bg-paper p-6">
              <b className="font-display text-4xl text-forest">Illustrative</b>
              <p className="mt-3 text-sm leading-6 text-ink/55">
                Sample benchmark and report values are labelled until verified
                customer data is connected.
              </p>
            </div>
            <div className="rounded-card bg-paper p-6">
              <b className="font-display text-4xl text-forest">Owner-led</b>
              <p className="mt-3 text-sm leading-6 text-ink/55">
                Every menu, image, storefront and marketing action stays behind
                an approval gate.
              </p>
            </div>
            <div className="rounded-card bg-paper p-6">
              <b className="font-display text-4xl text-forest">7 days</b>
              <p className="mt-3 text-sm leading-6 text-ink/55">
                The target workflow is designed for an early partner, with final
                scope confirmed during onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">
            Start with the move your restaurant needs next.
          </h2>
          <p className="mt-5 leading-7 text-ink/55">
            Choose a starting point and continue in this same tab. Final pricing
            and integrations are confirmed before launch.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "Benchmark",
              "See your PIN-code pricing and menu gaps.",
              "See benchmark",
            ],
            [
              "Early access",
              "Launch Marginly Agent, approvals and direct ordering.",
              "Start with Marginly",
            ],
            [
              "Restaurant OS",
              "Orders, storefront, reports and team operations.",
              "Set up restaurant",
            ],
          ].map((plan, index) => (
            <article
              className={`rounded-card border p-7 ${index === 1 ? "border-forest bg-forest text-white" : "border-ink/10 bg-paper"}`}
              key={plan[0]}
            >
              <span
                className={`text-xs font-bold uppercase tracking-widest ${index === 1 ? "text-saffron" : "text-forest"}`}
              >
                0{index + 1}
              </span>
              <h3 className="mt-5 font-display text-3xl">{plan[0]}</h3>
              <p
                className={`mt-4 min-h-14 text-sm leading-6 ${index === 1 ? "text-white/70" : "text-ink/55"}`}
              >
                {plan[1]}
              </p>
              <a
                href={`/onboarding?plan=${encodeURIComponent(plan[0])}`}
                className={`mt-6 inline-block rounded-full px-4 py-3 text-sm font-bold ${index === 1 ? "bg-saffron text-ink" : "bg-forest text-white"}`}
              >
                {plan[2]} ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section id="agent" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-card border border-forest/20 bg-[#e6f0e8] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Marginly Agent
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-5xl leading-none md:text-6xl">
            Your restaurant team’s next decision, drafted in seconds.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-ink/60">
            Ask about pricing, menu gaps, combos or direct-order growth. The
            agent drafts the answer; you approve every action.
          </p>
          <a
            href="/onboarding"
            className="mt-7 inline-block rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
          >
            Try the Agent ↗
          </a>
        </div>
      </section>
      <section
        id="faq"
        className="mx-auto grid max-w-6xl gap-16 px-5 py-32 md:grid-cols-[.8fr_1.2fr]"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Questions, answered
          </p>
          <h2 className="mt-5 font-display text-5xl leading-none md:text-6xl">
            Good decisions need good context.
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <div key={faq} className="border-t border-ink/10 py-5">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="flex w-full justify-between text-left font-bold"
              >
                {faq}
                <ChevronDown
                  className={`h-5 w-5 text-forest transition ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <p className="mt-4 max-w-xl leading-7 text-ink/55">
                  Marginly is designed to work alongside your current tools
                  while you build a direct-order channel you own. Production
                  compatibility and data handling are confirmed during
                  onboarding.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section id="cta" className="mx-auto max-w-6xl px-5 pb-32">
        <div className="grid gap-10 rounded-card bg-forest p-8 text-paper md:grid-cols-2 md:p-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-saffron">
              Ready when you are
            </p>
            <h2 className="mt-5 font-display text-5xl leading-none md:text-6xl">
              Keep the order. Keep the relationship.
            </h2>
            <p className="mt-6 leading-7 text-paper/70">
              Tell us a little about your restaurant and we’ll show you where
              your next margin is hiding.
            </p>
          </div>
          <div className="self-center">
            <LeadForm />
          </div>
        </div>
      </section>
      <footer className="border-t border-ink/10 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-ink/50">
          <Logo />
          <span>
            © 2026 Marginly · Illustrative data is labelled where used.
          </span>
          <span>
            <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
          </span>
        </div>
      </footer>
    </main>
  );
}
