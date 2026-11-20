"use client";
import { FormEvent, useState } from "react";
export default function OnboardingPage() {
  const [role, setRole] = useState("Owner");
  const [ready, setReady] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const session = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!session.ok) return;
    setReady(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 500);
  };
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="font-bold text-forest">
          ← Marginly
        </a>
        <div className="mt-16 rounded-card border border-ink/10 bg-paper p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
            Restaurant setup
          </p>
          <h1 className="mt-5 font-display text-5xl leading-none">
            Set up your Marginly restaurant account.
          </h1>
          <p className="mt-5 max-w-lg leading-7 text-ink/55">
            Choose your restaurant details, then open your dashboard with the
            Marginly Agent, menu tools and direct-order setup.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-ink/50">
              Your email
              <input
                name="email"
                required
                type="email"
                placeholder="owner@restaurant.in"
                className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-4 font-normal normal-case tracking-normal outline-none focus:border-forest"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-widest text-ink/50">
              Restaurant name
              <input
                required
                placeholder="Your restaurant name"
                className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-4 font-normal normal-case tracking-normal outline-none focus:border-forest"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-widest text-ink/50">
              Primary zipcode
              <input
                required
                inputMode="numeric"
                placeholder="400001"
                className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-4 font-normal normal-case tracking-normal outline-none focus:border-forest"
              />
            </label>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ink/50">
                Your role
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                {["Owner", "Manager", "Staff"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setRole(item)}
                    className={`rounded-xl border p-4 text-left text-sm ${role === item ? "border-forest bg-[#e6f0e8]" : "border-ink/15"}`}
                  >
                    <b className="block text-forest">{item}</b>
                    <span className="mt-2 block text-xs text-ink/50">
                      {item === "Owner"
                        ? "Margin, orders and approvals"
                        : item === "Manager"
                          ? "Menu edits and order handling"
                          : "Incoming orders and availability"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <button className="rounded-full bg-forest px-5 py-4 font-bold text-white">
              {ready ? "Workspace ready ✓" : "Create workspace ↗"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
