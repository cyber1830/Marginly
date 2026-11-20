"use client";
import { FormEvent, useState } from "react";

export default function TeamPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/team/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        role: form.get("role"),
      }),
    });
    if (!response.ok) {
      setError("Invite service is unavailable. Please try again.");
      return;
    }
    setSent(true);
    event.currentTarget.reset();
  };
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-4xl">
        <a href="/dashboard" className="font-bold text-forest">
          ← Dashboard
        </a>
        <div className="mt-16 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
              Manage access
            </p>
            <h1 className="mt-4 font-display text-6xl">Your team.</h1>
            <p className="mt-4 text-ink/55">
              Invite the people who keep service moving.
            </p>
          </div>
          <span className="rounded-full bg-[#e6f0e8] px-3 py-2 text-xs font-bold text-forest">
            Owner access
          </span>
        </div>
        <section className="mt-10 rounded-card border border-ink/10 bg-paper p-7">
          <h2 className="font-display text-3xl">Invite a teammate</h2>
          <form
            onSubmit={submit}
            className="mt-5 flex flex-col gap-3 md:flex-row"
          >
            <input
              name="email"
              required
              type="email"
              placeholder="teammate@restaurant.com"
              className="flex-1 rounded-lg border border-ink/15 bg-white p-3 outline-none focus:border-forest"
            />
            <select
              name="role"
              className="rounded-lg border border-ink/15 bg-white p-3"
            >
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
            <button className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white">
              Send invite
            </button>
          </form>
          {sent && (
            <p className="mt-4 text-sm text-forest" role="status">
              Invite prepared. Delivery is marked illustrative until email is
              connected.
            </p>
          )}
          {error && (
            <p className="mt-4 text-sm text-tomato" role="alert">
              {error}
            </p>
          )}
        </section>
        <section className="mt-5 rounded-card border border-ink/10 bg-paper p-7">
          <h2 className="font-display text-3xl">Current team</h2>
          {[
            ["Maya Chen", "Owner"],
            ["Jordan Lee", "Manager"],
            ["Service team", "Staff"],
          ].map((row) => (
            <div
              className="flex justify-between border-b border-ink/10 py-5 text-sm last:border-0"
              key={row[0]}
            >
              <span>
                <b>{row[0]}</b>
                <small className="ml-2 text-ink/50">missionkitchen.com</small>
              </span>
              <span className="rounded-full bg-[#e6f0e8] px-3 py-1 text-xs font-bold text-forest">
                {row[1]}
              </span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
