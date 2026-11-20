"use client";
import { useState } from "react";

const integrations = [
  ["POS", "Order push and menu sync", "Needs connection"],
  ["Delivery platforms", "Import existing menu", "Menu import ready"],
  ["Payments", "Secure direct checkout", "Needs connection"],
  ["Analytics", "Funnel and revenue events", "Illustrative"],
];
export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(response.ok);
  }
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12 text-ink">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <a href="/dashboard" className="font-bold text-forest">
            ← Dashboard
          </a>
          <span className="rounded-full bg-[#e6f0e8] px-3 py-2 text-xs font-bold text-forest">
            Owner access
          </span>
        </div>
        <div className="mt-16">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Workspace settings
          </p>
          <h1 className="mt-4 font-display text-6xl">Connect the operation.</h1>
          <p className="mt-4 max-w-xl text-ink/55">
            Production connectors are kept explicit so nothing writes to a live
            system without your approval.
          </p>
        </div>
        <form
          onSubmit={save}
          className="mt-10 grid gap-5 md:grid-cols-[1.1fr_.9fr]"
        >
          <section className="rounded-card border border-ink/10 bg-paper p-7">
            <h2 className="font-display text-3xl">Location</h2>
            <div className="mt-5 grid gap-3">
              <label className="text-xs font-bold text-ink/60">
                Restaurant name
                <input
                  name="restaurant"
                  defaultValue="Marginly Kitchens"
                  className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-3 outline-none focus:border-forest"
                />
              </label>
              <label className="text-xs font-bold text-ink/60">
                Zipcode
                <input
                  name="zipcode"
                  defaultValue="400001"
                  className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-3 outline-none focus:border-forest"
                />
              </label>
              <label className="text-xs font-bold text-ink/60">
                Timezone
                <select
                  name="timezone"
                  className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-3"
                >
                  <option>America/Los_Angeles</option>
                  <option>America/New_York</option>
                  <option>Asia/Calcutta</option>
                </select>
              </label>
            </div>
            <button className="mt-6 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white">
              Save settings
            </button>
            {saved && (
              <p className="mt-3 text-sm text-forest" role="status">
                Settings saved · illustrative response
              </p>
            )}
          </section>
          <section className="rounded-card border border-ink/10 bg-paper p-7">
            <h2 className="font-display text-3xl">Integrations</h2>
            <div className="mt-5">
              {integrations.map((row) => (
                <div
                  className="border-b border-ink/10 py-4 last:border-0"
                  key={row[0]}
                >
                  <div className="flex justify-between gap-3">
                    <b>{row[0]}</b>
                    <span className="text-xs text-forest">{row[2]}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink/50">{row[1]}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-lg bg-[#f3eee7] p-4 text-xs leading-5 text-ink/55">
              Connectors are intentionally illustrative in this build.
              Production credentials, scopes and webhooks are documented in{" "}
              <a className="font-bold text-forest" href="/terms">
                Terms
              </a>
              .
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}
