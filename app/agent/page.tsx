"use client";
import { useState } from "react";
import Link from "next/link";
export default function AgentPage() {
  const [message, setMessage] = useState("");
  const [zipcode, setZipcode] = useState("400001");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  async function ask(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, zipcode }),
    });
    const data = await response.json();
    setReply(response.ok ? data.reply : "Please sign in to use the agent.");
    setBusy(false);
  }
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="font-bold text-forest">
          ← Dashboard
        </Link>
        <p className="mt-16 text-xs font-bold uppercase tracking-[.18em] text-forest">
          Marginly Agent
        </p>
        <h1 className="mt-4 font-display text-6xl">Ask your menu agent.</h1>
        <p className="mt-4 text-ink/55">
          The agent analyses Indian market signals and drafts suggestions.
          Nothing changes price, menu, image or order routing without your
          approval.
        </p>
        <section className="mt-10 rounded-card border border-ink/10 bg-paper p-7">
          <div className="min-h-40 rounded-xl bg-[#f3eee7] p-5 text-sm">
            {reply ? (
              <>
                <b className="text-forest">Agent</b>
                <p className="mt-3 leading-7">{reply}</p>
                <span className="mt-4 inline-block rounded-full bg-[#e6f0e8] px-3 py-1 text-xs text-forest">
                  Approval required
                </span>
              </>
            ) : (
              <p className="text-ink/45">
                Try: “What should I price my biryani at?”
              </p>
            )}
          </div>
          <form onSubmit={ask} className="mt-5 flex flex-wrap gap-2">
            <input
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              inputMode="numeric"
              aria-label="Restaurant PIN code"
              className="w-28 rounded-lg border border-ink/15 bg-white p-3 outline-none focus:border-forest"
            />
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              placeholder="Ask about price, menu gaps or a family combo"
              className="min-w-0 flex-1 rounded-lg border border-ink/15 bg-white p-3 outline-none focus:border-forest"
            />
            <button
              disabled={busy}
              className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {busy ? "Thinking…" : "Ask agent"}
            </button>
          </form>
          <p className="mt-4 text-xs text-ink/45">
            Illustrative agent response · connect an LLM and licensed market
            data for production.
          </p>
        </section>
      </div>
    </main>
  );
}
