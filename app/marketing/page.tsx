"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Campaign } from "../../lib/api";
export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    api
      .marketing()
      .then((data) => setCampaigns(data.campaigns))
      .catch(() => setNotice("Illustrative campaign data"));
  }, []);
  async function approve(id: string) {
    const response = await fetch("/api/marketing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setCampaigns((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status: "approved" } : item,
        ),
      );
      setNotice("Campaign approved");
    }
  }
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="font-bold text-forest">
          ← Dashboard
        </Link>
        <p className="mt-16 text-xs font-bold uppercase tracking-[.18em] text-forest">
          Demand
        </p>
        <h1 className="mt-4 font-display text-6xl">Marketing approvals.</h1>
        <p className="mt-4 text-ink/55">
          Approve ready-to-post content before it reaches your audience.
        </p>
        {notice && (
          <p className="mt-4 text-sm text-forest" role="status">
            {notice}
          </p>
        )}
        <section className="mt-10 rounded-card border border-ink/10 bg-paper p-7">
          {(campaigns.length
            ? campaigns
            : [
                {
                  id: "campaign_1",
                  title: "Loading campaigns…",
                  status: "pending",
                  copy: "",
                },
              ]
          ).map((item) => (
            <div
              className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 py-5 last:border-0"
              key={item.id}
            >
              <div>
                <b>{item.title}</b>
                <p className="mt-2 max-w-xl text-sm text-ink/55">{item.copy}</p>
                <span className="mt-2 inline-block text-[10px] uppercase tracking-widest text-forest">
                  {item.status} · illustrative until social credentials connect
                </span>
              </div>
              <button
                disabled={item.status === "approved"}
                onClick={() => approve(item.id)}
                className="rounded-full border border-forest px-4 py-2 text-xs font-bold text-forest disabled:opacity-50"
              >
                {item.status === "approved" ? "Approved ✓" : "Approve post"}
              </button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
