import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../lib/auth";
const replies: Record<string, string> = {
  price:
    "In PIN 400001, similar biryani dishes sit around ₹329–₹379. A ₹349 price keeps Marginly Kitchens in the market range.",
  family:
    "A family combo is a strong gap: 4 nearby menus offer one. Suggested test: 2 mains + 2 sides at ₹899.",
  default:
    "I found 4 illustrative opportunities: raise biryani by ₹30, add a family combo, highlight paneer tikka, and refresh your direct-order offer.",
};
export async function POST(request: Request) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => ({}));
  const text = String(body.message || "").toLowerCase();
  const zipcode = String(body.zipcode || "400001");
  const reply =
    text.includes("price") || text.includes("biryani")
      ? replies.price
      : text.includes("family") || text.includes("combo")
        ? replies.family
        : replies.default;
  return NextResponse.json({
    ok: true,
    illustrative: true,
    reply: reply.replace("400001", zipcode),
    requiresApproval: true,
  });
}
