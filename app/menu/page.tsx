"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type Item = { id: string; name: string; price: number; available: boolean };
export default function MenuPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setItems(data.items));
  }, []);
  async function save(item: Item) {
    const response = await fetch("/api/menu", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (response.ok)
      setNotice(`${item.name} saved · illustrative until POS sync connects`);
  }
  return (
    <main className="min-h-screen bg-[#f3eee7] px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="font-bold text-forest">
          ← Dashboard
        </Link>
        <p className="mt-16 text-xs font-bold uppercase tracking-[.18em] text-forest">
          Sync
        </p>
        <h1 className="mt-4 font-display text-6xl">Menu Studio.</h1>
        <p className="mt-4 text-ink/55">
          Review imported items, price and availability before publishing.
        </p>
        {notice && (
          <p className="mt-4 text-sm text-forest" role="status">
            {notice}
          </p>
        )}
        <section className="mt-10 overflow-hidden rounded-card border border-ink/10 bg-paper">
          {items.map((item) => (
            <div
              className="grid gap-4 border-b border-ink/10 p-6 last:border-0 md:grid-cols-[1fr_140px_130px_auto] md:items-center"
              key={item.id}
            >
              <div>
                <b>{item.name}</b>
                <p className="mt-1 text-xs text-ink/50">
                  Imported from connected menu · illustrative
                </p>
              </div>
              <label className="text-xs text-ink/50">
                Price
                <input
                  type="number"
                  step=".50"
                  value={item.price}
                  onChange={(e) =>
                    setItems((current) =>
                      current.map((row) =>
                        row.id === item.id
                          ? { ...row, price: Number(e.target.value) }
                          : row,
                      ),
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-white p-2 text-ink"
                />
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={(e) =>
                    setItems((current) =>
                      current.map((row) =>
                        row.id === item.id
                          ? { ...row, available: e.target.checked }
                          : row,
                      ),
                    )
                  }
                />{" "}
                Available
              </label>
              <button
                onClick={() => save(item)}
                className="rounded-full bg-forest px-4 py-2 text-xs font-bold text-white"
              >
                Save
              </button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
