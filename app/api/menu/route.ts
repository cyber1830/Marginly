import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../lib/auth";
const items = [
  { id: "item_1", name: "Spicy rigatoni", price: 19.5, available: true },
  { id: "item_2", name: "Chicken sandwich", price: 17, available: true },
  { id: "item_3", name: "Caesar salad", price: 12, available: false },
];
export async function GET() {
  return NextResponse.json({ illustrative: true, syncedAt: "today", items });
}
export async function PATCH(request: Request) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    illustrative: true,
    item: {
      id: body.id,
      name: body.name,
      price: body.price,
      available: body.available,
    },
  });
}
