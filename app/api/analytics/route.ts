import { NextResponse } from "next/server";

const allowedEvents = new Set([
  "hero_cta_click",
  "benchmark_used",
  "slider_interacted",
  "lead_form_started",
  "lead_form_submitted",
  "demo_booked",
]);

export async function POST(request: Request) {
  const event = await request.json().catch(() => ({}));
  if (!allowedEvents.has(event.name))
    return NextResponse.json({ error: "Unsupported event" }, { status: 400 });
  return NextResponse.json({
    ok: true,
    accepted: true,
    illustrative: !process.env.ANALYTICS_WRITE_KEY,
  });
}
