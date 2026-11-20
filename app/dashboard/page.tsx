"use client";
import { useEffect, useState } from "react";
import {
  Check,
  Bot,
  ChevronRight,
  CircleAlert,
  Image as ImageIcon,
  LayoutDashboard,
  LineChart,
  Megaphone,
  Package,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import { api, type Benchmark, type Order, type Report } from "../../lib/api";
type View =
  | "home"
  | "benchmark"
  | "menu"
  | "visuals"
  | "storefront"
  | "orders"
  | "marketing"
  | "reports"
  | "agent";
const nav: Array<{ id: View; label: string; icon: typeof LayoutDashboard }> = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "benchmark", label: "Benchmark", icon: LineChart },
  { id: "menu", label: "Menu Studio", icon: Package },
  { id: "visuals", label: "Visuals", icon: ImageIcon },
  { id: "storefront", label: "Storefront", icon: Store },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "reports", label: "Reports", icon: LineChart },
  { id: "agent", label: "Ask Agent", icon: Bot },
];
const suggestions = [
  "Raise chicken biryani to ₹349",
  "Add a family combo",
  "Feature the paneer tikka",
];
function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-card border border-ink/10 bg-paper p-6 ${className}`}
    >
      {children}
    </section>
  );
}
function Header({
  title,
  eyebrow,
  ready,
}: {
  title: string;
  eyebrow: string;
  ready: boolean;
}) {
  return (
    <header className="mb-8 flex items-start justify-between">
      <div>
        <p className="text-xs text-ink/50">{eyebrow}</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">{title}</h1>
      </div>
      <span className="text-xs text-forest">
        {ready ? "● API connected" : "○ Illustrative data"}
      </span>
    </header>
  );
}
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-[#f3eee7] p-5">
      <b className="block font-display text-4xl text-forest">{value}</b>
      <span className="text-xs text-ink/50">{label}</span>
    </div>
  );
}
export default function DashboardPage() {
  const [view, setView] = useState<View>("home");
  const [benchmark, setBenchmark] = useState<Benchmark | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [decisions, setDecisions] = useState<Record<number, string>>({});
  const [published, setPublished] = useState(false);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    Promise.all([api.benchmark(), api.orders(), api.reports()])
      .then(([b, o, r]) => {
        setBenchmark(b);
        setOrders(o.orders);
        setReport(r);
        setReady(true);
      })
      .catch(() => setReady(false));
  }, []);
  const go = (next: View) => {
    setView(next);
    setNotice("");
  };
  const decide = async (index: number, decision: string) => {
    setDecisions((current) => ({ ...current, [index]: decision }));
    setNotice(`${decision} saved`);
    try {
      await fetch(`/api/approvals/${index + 1}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
    } catch {
      setNotice("Saved locally · integration pending");
    }
  };
  const publish = async () => {
    setPublished(true);
    setNotice("Publishing storefront…");
    try {
      const response = await fetch("/api/storefront", { method: "POST" });
      if (!response.ok) throw new Error();
      setNotice("Storefront published");
    } catch {
      setNotice("Published locally · integration pending");
    }
  };
  return (
    <main className="min-h-screen bg-[#f3eee7] text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 bg-night p-5 text-paper lg:block">
          <a
            href="/"
            className="flex items-center gap-2 font-bold tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-forest font-display text-lg">
              M
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              Marginly
            </span>
          </a>
          <p className="mb-2 mt-12 px-3 text-[10px] uppercase tracking-[.18em] text-paper/35">
            Workspace
          </p>
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm ${view === id ? "bg-white/10 text-white" : "text-paper/55 hover:bg-white/5 hover:text-white"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
          <p className="mb-2 mt-10 px-3 text-[10px] uppercase tracking-[.18em] text-paper/35">
            Manage
          </p>
          <a
            href="/team"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-paper/55 hover:text-white"
          >
            <Users className="h-4 w-4" />
            Team
          </a>
        </aside>
        <div className="flex-1 px-5 py-8 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <a href="/" className="font-bold text-forest">
                ← Marginly
              </a>
              <select
                value={view}
                onChange={(e) => go(e.target.value as View)}
                className="rounded-full border border-ink/10 bg-paper px-3 py-2 text-xs"
              >
                {nav.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {notice && (
              <div
                className="mb-5 rounded-lg border border-forest/20 bg-[#e6f0e8] px-4 py-3 text-sm text-forest"
                role="status"
              >
                {notice}
              </div>
            )}
            {view === "home" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Fort, Mumbai · Restaurant dashboard"
                  title="Good morning, Maya."
                />
                <Panel className="mb-5 border-forest/20 bg-[#e6f0e8]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
                        Marginly Agent
                      </p>
                      <h2 className="mt-2 font-display text-3xl">
                        Your next menu move is ready.
                      </h2>
                      <p className="mt-2 text-sm text-ink/60">
                        Ask about Indian pricing, menu gaps or a family combo.
                        You approve every action.
                      </p>
                    </div>
                    <a
                      href="/agent"
                      className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
                    >
                      Ask the Agent ↗
                    </a>
                  </div>
                </Panel>
                <div className="grid gap-5">
                  <Panel>
                    <h2 className="font-display text-3xl">Margin reclaimed</h2>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <Metric
                        value={
                          report
                            ? `₹${report.metrics.commissionSaved.toLocaleString("en-IN")}`
                            : "₹12,840"
                        }
                        label="This month"
                      />
                      <Metric
                        value={orders.length ? String(orders.length) : "86"}
                        label="Direct orders"
                      />
                      <Metric
                        value={
                          report ? `${report.metrics.directOrderMix}%` : "42%"
                        }
                        label="Direct order mix"
                      />
                    </div>
                    <div className="mt-7 h-36 rounded-lg bg-[repeating-linear-gradient(0deg,#fffaf5,#fffaf5_35px,#e9e1d7_36px)]">
                      <svg
                        viewBox="0 0 700 150"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                      >
                        <path
                          d="M0 125 C80 118 130 95 210 110 S300 70 390 86 S500 35 700 45"
                          fill="none"
                          stroke="#0f5b3a"
                          strokeWidth="4"
                        />
                        <path
                          d="M0 125 C80 118 130 95 210 110 S300 70 390 86 S500 35 700 45 L700 150 L0 150Z"
                          fill="#dceade"
                          opacity=".7"
                        />
                      </svg>
                    </div>
                  </Panel>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Panel>
                      <h2 className="font-display text-3xl">
                        7-day launch plan
                      </h2>
                      {[
                        "Menu synced",
                        "Benchmark reviewed",
                        "Approve suggestions",
                        "Choose storefront",
                      ].map((item, index) => (
                        <div
                          className="flex justify-between border-b border-ink/10 py-4 text-sm"
                          key={item}
                        >
                          <span>{item}</span>
                          {index < 2 ? (
                            <Check className="h-4 w-4 text-forest" />
                          ) : (
                            <CircleAlert className="h-4 w-4 text-saffron" />
                          )}
                        </div>
                      ))}
                    </Panel>
                    <Panel>
                      <h2 className="font-display text-3xl">
                        Needs your approval
                      </h2>
                      {suggestions.map((item, index) => (
                        <button
                          onClick={() => go(index === 2 ? "visuals" : "menu")}
                          className="flex w-full items-center justify-between border-b border-ink/10 py-4 text-left text-sm"
                          key={item}
                        >
                          <span>{item}</span>
                          <ChevronRight className="h-4 w-4 text-ink/35" />
                        </button>
                      ))}
                    </Panel>
                  </div>
                </div>
              </>
            )}
            {view === "benchmark" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Intelligence OS"
                  title="Benchmark your market."
                />
                <Panel>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-ink/55">
                        {benchmark?.city || "Fort, Mumbai"} ·{" "}
                        {benchmark?.zipcode || "400001"} ·{" "}
                        {benchmark?.comparableMenus || 12} comparable menus
                      </p>
                      <p className="mt-1 text-xs text-forest">
                        ● Refreshed today ·{" "}
                        {benchmark?.illustrative
                          ? "Illustrative sample data"
                          : "Connected data"}
                      </p>
                    </div>
                    <button
                      onClick={() => api.benchmark().then(setBenchmark)}
                      className="rounded-full bg-forest px-4 py-2 text-xs font-bold text-white"
                    >
                      Refresh benchmark
                    </button>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-xl border border-ink/10">
                    <div className="grid grid-cols-4 bg-ink/[.04] p-4 text-xs text-ink/50">
                      <span>Top seller</span>
                      <span>Your price</span>
                      <span>Market median</span>
                      <span>Delta</span>
                    </div>
                    {(
                      benchmark?.items || [
                        {
                          name: "Chicken sandwich",
                          yourPrice: 15,
                          median: 17,
                          opportunity: 2,
                        },
                        {
                          name: "Spicy rigatoni",
                          yourPrice: 18,
                          median: 19.5,
                          opportunity: 1.5,
                        },
                        {
                          name: "Caesar salad",
                          yourPrice: 12,
                          median: 12,
                          opportunity: 0,
                        },
                      ]
                    ).map((row) => (
                      <div
                        className="grid grid-cols-4 border-t border-ink/10 p-4 text-sm"
                        key={row.name}
                      >
                        <span>{row.name}</span>
                        <span>₹{row.yourPrice.toFixed(2)}</span>
                        <span>₹{row.median.toFixed(2)}</span>
                        <b className="text-forest">
                          {row.opportunity ? `↑ ₹${row.opportunity}` : "—"}
                        </b>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(
                      benchmark?.gaps || [
                        "Smash burger",
                        "Family meal",
                        "Seasonal pasta",
                      ]
                    ).map((gap) => (
                      <span
                        className="rounded-full bg-[#efe8dc] px-3 py-2 text-xs"
                        key={gap}
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </Panel>
              </>
            )}
            {view === "menu" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Human + Agent"
                  title="Menu Studio"
                />
                <p className="mb-5 text-sm text-ink/55">
                  Nothing publishes without your approval. Every suggestion
                  includes its reason and expected impact.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {suggestions.map((item, index) => (
                    <Panel
                      key={item}
                      className={decisions[index] ? "opacity-50" : ""}
                    >
                      <span className="text-sm text-tomato">0{index + 1}</span>
                      <h2 className="mt-5 font-display text-2xl">{item}</h2>
                      <p className="mt-3 text-sm leading-6 text-ink/55">
                        A practical change based on your PIN code, menu mix and
                        illustrative demand signals.
                      </p>
                      <div className="mt-5 rounded-lg bg-[#f3eee7] p-3 text-xs">
                        <b className="block text-forest">
                          Why this suggestion?
                        </b>
                        Market median is higher and estimated margin impact is
                        positive.
                      </div>
                      <div className="mt-5 flex gap-2">
                        <button
                          onClick={() => decide(index, "Accepted")}
                          className="flex-1 rounded-full bg-forest px-3 py-2 text-xs font-bold text-white"
                        >
                          {decisions[index] || "Accept"}
                        </button>
                        <button
                          onClick={() => decide(index, "Skipped")}
                          className="rounded-full border border-ink/15 px-3 py-2 text-xs"
                        >
                          Skip
                        </button>
                      </div>
                    </Panel>
                  ))}
                </div>
              </>
            )}
            {view === "visuals" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Create"
                  title="Visual approvals"
                />
                <Panel>
                  {[
                    "Rigatoni · Enhanced scene",
                    "Chicken sandwich · Original upload",
                    "Caesar salad · Enhanced scene",
                  ].map((item, index) => (
                    <div
                      className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 py-5 last:border-0"
                      key={item}
                    >
                      <div>
                        <b>{item}</b>
                        <p className="mt-1 text-xs text-ink/50">
                          Original food preserved · owner approval required
                        </p>
                      </div>
                      <button
                        onClick={() => decide(index, "Approved")}
                        className="rounded-full border border-forest px-4 py-2 text-xs font-bold text-forest"
                      >
                        {decisions[index] || "Approve image"}
                      </button>
                    </div>
                  ))}
                </Panel>
              </>
            )}
            {view === "storefront" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="List"
                  title="Your direct storefront."
                />
                <Panel>
                  <div className="rounded-lg bg-[#e6f0e8] p-4 text-sm text-forest">
                    Your storefront is{" "}
                    {published
                      ? "live"
                      : "private until you approve and publish it"}
                    .
                  </div>
                  {[
                    ["Restaurant name", "Marginly Kitchens"],
                    ["Menu items", "86 items"],
                    ["Commission", "0% platform commission"],
                  ].map((row) => (
                    <div
                      className="flex justify-between border-b border-ink/10 py-5 text-sm"
                      key={row[0]}
                    >
                      <span className="text-ink/55">{row[0]}</span>
                      <b
                        className={row[0] === "Commission" ? "text-forest" : ""}
                      >
                        {row[1]}
                      </b>
                    </div>
                  ))}
                  <button
                    onClick={publish}
                    className="mt-6 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
                  >
                    {published ? "Published ✓" : "Publish storefront"}
                  </button>
                </Panel>
              </>
            )}
            {view === "orders" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Direct Orders"
                  title="Order queue."
                />
                <Panel>
                  {(orders.length
                    ? orders.map((order) => [
                        order.id,
                        order.items,
                        `₹${order.total.toFixed(2)}`,
                        order.status,
                      ])
                    : [
                        [
                          "ML-1048",
                          "Chicken biryani ×2",
                          "₹698.00",
                          "Preparing",
                        ],
                        ["ML-1047", "Paneer tikka, chai", "₹329.00", "Ready"],
                        [
                          "ML-1046",
                          "Family thali combo",
                          "₹899.00",
                          "Delivered",
                        ],
                      ]
                  ).map((row) => (
                    <div
                      className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 py-5 last:border-0"
                      key={row[0]}
                    >
                      <span>
                        <b>{row[0]}</b> · {row[1]}
                      </span>
                      <b>{row[2]}</b>
                      <span className="text-xs text-forest">{row[3]}</span>
                    </div>
                  ))}
                </Panel>
              </>
            )}
            {view === "marketing" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Demand"
                  title="Marketing approvals."
                />
                <Panel>
                  {[
                    "Friday family meal post",
                    "Rigatoni launch story",
                    "Weekend direct-order reminder",
                  ].map((item, index) => (
                    <div
                      className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 py-5 last:border-0"
                      key={item}
                    >
                      <div>
                        <b>{item}</b>
                        <p className="mt-1 text-xs text-ink/50">
                          Ready-to-review caption and menu link
                        </p>
                      </div>
                      <button
                        onClick={() => decide(index, "Approved ✓")}
                        className="rounded-full border border-forest px-4 py-2 text-xs font-bold text-forest"
                      >
                        {decisions[index] || "Approve post"}
                      </button>
                    </div>
                  ))}
                </Panel>
              </>
            )}
            {view === "reports" && (
              <>
                <Header
                  ready={ready}
                  eyebrow="Reports"
                  title="See what you reclaimed."
                />
                <div className="grid gap-3 md:grid-cols-3">
                  <Metric
                    value={
                      report
                        ? `₹${report.metrics.commissionSaved.toLocaleString("en-IN")}`
                        : "₹48,120"
                    }
                    label="Commission saved"
                  />
                  <Metric
                    value={report ? `${report.metrics.directOrderMix}%` : "61%"}
                    label="Direct order mix"
                  />
                  <Metric
                    value={
                      report ? `${report.metrics.repeatCustomerValue}×` : "2.4×"
                    }
                    label="Repeat customer value"
                  />
                </div>
                <Panel className="mt-5">
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
                  <p className="mt-4 text-xs text-ink/50">
                    {report?.illustrative
                      ? "Illustrative report view · connect POS and payment data to replace samples."
                      : "Connected report data."}
                  </p>
                </Panel>
              </>
            )}
            {view === "agent" && (
              <div className="rounded-card border border-ink/10 bg-paper p-8">
                <Header
                  ready={ready}
                  eyebrow="Marginly Agent"
                  title="Ask your menu agent."
                />
                <p className="max-w-xl text-ink/55">
                  Ask about Indian pricing, menu gaps, combos or direct-order
                  growth. Open the agent workspace to continue the conversation.
                </p>
                <a
                  href="/agent"
                  className="mt-6 inline-block rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
                >
                  Open Agent ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
