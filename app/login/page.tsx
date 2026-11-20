"use client";
import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";
export default function LoginPage() {
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setMessage("Demo session created. Opening workspace…");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 400);
  };
  return (
    <main className="min-h-screen bg-night px-6 py-20 text-paper">
      <div className="mx-auto max-w-md">
        <a href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-forest font-display text-lg">
            M
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Marginly
          </span>
        </a>
        <section className="mt-24 rounded-card border border-white/10 bg-white/[.04] p-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-saffron">
            Restaurant partner login
          </p>
          <h1 className="mt-5 font-display text-5xl">Welcome back.</h1>
          <p className="mt-4 leading-7 text-paper/60">
            Sign in to manage your orders, menu and Marginly Agent.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <input
              name="email"
              required
              type="email"
              placeholder="you@restaurant.com"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-paper/40 focus:border-saffron"
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-paper/40 focus:border-saffron"
            />
            <button className="w-full rounded-full bg-forest px-5 py-4 font-bold text-white">
              Sign in <ArrowUpRight className="ml-2 inline h-4 w-4" />
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-[#b8d8bc]">{message}</p>}
          <p className="mt-7 text-xs text-paper/40">
            Demo mode · No credentials are transmitted or stored.
          </p>
        </section>
      </div>
    </main>
  );
}
