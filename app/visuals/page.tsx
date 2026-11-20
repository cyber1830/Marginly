"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type VisualAsset } from "../../lib/api";
export default function VisualsPage() {
  const [assets, setAssets] = useState<VisualAsset[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    api
      .visuals()
      .then((data) => setAssets(data.assets))
      .catch(() => setNotice("Illustrative visual data"));
  }, []);
  async function approve(id: string) {
    const response = await fetch("/api/visuals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setAssets((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status: "approved" } : item,
        ),
      );
      setNotice("Visual approved");
    }
  }
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="font-bold text-forest">
          ← Dashboard
        </Link>
        <p className="mt-16 text-xs font-bold uppercase tracking-[.18em] text-forest">
          Create
        </p>
        <h1 className="mt-4 font-display text-6xl">Visual approvals.</h1>
        <p className="mt-4 text-ink/55">
          Approve food visuals while keeping the original dish authentic.
        </p>
        {notice && (
          <p className="mt-4 text-sm text-forest" role="status">
            {notice}
          </p>
        )}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {(assets.length
            ? assets
            : [
                {
                  id: "visual_1",
                  dish: "Loading visual…",
                  status: "pending",
                  authenticity: "Original food preserved",
                },
              ]
          ).map((item) => (
            <section
              className="rounded-card border border-ink/10 bg-paper p-6"
              key={item.id}
            >
              <div className="grid h-48 place-items-center rounded-xl bg-[radial-gradient(circle_at_45%_45%,#f5ddad,transparent_32%),linear-gradient(135deg,#9a6035,#e8c990)]">
                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold">
                  {item.dish}
                </span>
              </div>
              <p className="mt-4 text-xs text-ink/50">
                {item.authenticity} · illustrative asset until image provider
                connects
              </p>
              <button
                disabled={item.status === "approved"}
                onClick={() => approve(item.id)}
                className="mt-5 rounded-full border border-forest px-4 py-2 text-xs font-bold text-forest disabled:opacity-50"
              >
                {item.status === "approved" ? "Approved ✓" : "Approve image"}
              </button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
