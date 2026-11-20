import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../lib/auth";
export async function GET() {
  return NextResponse.json({
    illustrative: true,
    source: "demo",
    orders: [
      {
        id: "ML-1048",
        items: "Chicken biryani ×2",
        total: 698,
        status: "Preparing",
      },
      {
        id: "ML-1047",
        items: "Paneer tikka, chai",
        total: 329,
        status: "Ready",
      },
      {
        id: "ML-1046",
        items: "Family thali combo",
        total: 899,
        status: "Delivered",
      },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  return NextResponse.json(
    {
      ok: true,
      illustrative: true,
      order: {
        id: `ML-${Date.now()}`,
        status: "Received",
        total: body.total,
        payment: body.payment || "UPI",
        posSync: hasDemoSession(request)
          ? "Awaiting POS connection"
          : "Awaiting kitchen connection",
      },
    },
    { status: 201 },
  );
}
