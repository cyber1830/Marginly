"use client";
import Link from "next/link";
import { useState } from "react";
const items = [
  {
    id: "thali",
    name: "Marginly Special Thali",
    description: "Dal makhani, seasonal sabzi, roti and rice",
    price: 299,
  },
  {
    id: "tikka",
    name: "Tandoori Paneer Tikka",
    description: "Smoked paneer, mint chutney and pickled onions",
    price: 249,
  },
  {
    id: "biryani",
    name: "Lucknowi Chicken Biryani",
    description: "Long-grain rice, saffron and raita",
    price: 349,
  },
];
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
export default function StorefrontPage() {
  const [cart, setCart] = useState<string[]>([]);
  const [ordered, setOrdered] = useState(false);
  const total = items
    .filter((item) => cart.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  async function placeOrder() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, total, payment: "UPI" }),
    });
    if (response.ok) setOrdered(true);
  }
  return (
    <main className="min-h-screen bg-[#f3eee7] text-ink">
      <header className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <span className="font-bold text-forest">Marginly Kitchens</span>
          <Link href="/dashboard" className="text-xs font-bold text-ink/55">
            Restaurant dashboard ↗
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-forest">
          Direct ordering · UPI enabled
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-6xl leading-none">
          Ghar jaisa khana, seedha kitchen se.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/60">
          Order directly from your favourite local kitchen. No marketplace
          markup. This is an India-first illustrative checkout preview.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article
              className="rounded-card border border-ink/10 bg-paper p-6"
              key={item.id}
            >
              <div className="grid h-40 place-items-center rounded-xl bg-[radial-gradient(circle_at_45%_45%,#f5ddad,transparent_32%),linear-gradient(135deg,#9a6035,#e8c990)]">
                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold">
                  {item.name}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl">{item.name}</h2>
              <p className="mt-2 text-sm text-ink/55">{item.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <b>{money(item.price)}</b>
                <button
                  onClick={() =>
                    setCart((current) =>
                      current.includes(item.id)
                        ? current.filter((id) => id !== item.id)
                        : [...current, item.id],
                    )
                  }
                  className="rounded-full bg-forest px-4 py-2 text-xs font-bold text-white"
                >
                  {cart.includes(item.id) ? "Added ✓" : "Add"}
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="mt-8 rounded-card border border-forest/20 bg-[#e6f0e8] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <b>
                {cart.length
                  ? `${cart.length} item${cart.length > 1 ? "s" : ""} in cart`
                  : "Your cart is empty"}
              </b>
              {cart.length > 0 && (
                <p className="mt-1 text-sm text-forest">
                  Total: {money(total)} · UPI / card checkout
                </p>
              )}
            </div>
            <button
              disabled={!cart.length || ordered}
              onClick={placeOrder}
              className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {ordered ? "Order placed ✓" : "Place order"}
            </button>
          </div>
          {ordered && (
            <p className="mt-4 text-sm text-forest" role="status">
              Order received. Payment and kitchen routing are illustrative until
              providers connect.
            </p>
          )}
        </aside>
        <p className="mt-8 text-xs text-ink/45">
          Illustrative India storefront · GST, payment gateway and POS
          fulfilment connect before launch.
        </p>
      </div>
    </main>
  );
}
