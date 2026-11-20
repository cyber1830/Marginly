"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { track } from "../lib/analytics";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(new FormData(event.currentTarget).entries()),
      ),
    });
    if (!response.ok) {
      setError("We couldn’t save that yet. Please try again.");
      return;
    }
    await track("lead_form_submitted");
    setSubmitted(true);
  }
  if (submitted)
    return (
      <div className="rounded-xl bg-white/10 p-6">
        <Check className="mb-3 h-6 w-6 text-saffron" />
        <b>Thanks — we’ll be in touch.</b>
        <p className="mt-2 text-sm text-paper/70">
          Your walkthrough request is ready for the next step.
        </p>
      </div>
    );
  return (
    <form
      onFocus={() => {
        void track("lead_form_started");
      }}
      onSubmit={submit}
      className="space-y-3"
    >
      <input
        name="name"
        required
        className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-paper/50 focus:border-saffron"
        placeholder="Your name"
      />
      <input
        name="restaurant"
        required
        className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-paper/50 focus:border-saffron"
        placeholder="Restaurant name"
      />
      <input
        name="zipcode"
        inputMode="numeric"
        pattern="[0-9]{5}"
        className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-paper/50 focus:border-saffron"
        placeholder="Zipcode (optional)"
      />
      <input
        name="email"
        required
        type="email"
        className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-paper/50 focus:border-saffron"
        placeholder="Email address"
      />
      <button className="w-full rounded-full bg-saffron px-5 py-4 font-bold text-ink">
        Walk me through it <ArrowUpRight className="ml-2 inline h-4 w-4" />
      </button>
      {error && <p className="text-sm text-[#ffc0b4]">{error}</p>}
    </form>
  );
}
