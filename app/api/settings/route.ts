import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../lib/auth";

export async function GET() {
  return NextResponse.json({
    illustrative: true,
    location: {
      name: "Marginly Kitchens",
      zipcode: "400001",
      country: "India",
      currency: "INR",
    },
    integrations: [
      { name: "POS", status: "Needs connection" },
      { name: "Delivery platforms", status: "Menu import ready" },
      { name: "Payments", status: "Needs connection" },
      {
        name: "Analytics",
        status: process.env.ANALYTICS_WRITE_KEY ? "Connected" : "Illustrative",
      },
    ],
  });
}

export async function POST(request: Request) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    saved: Object.keys(body),
    illustrative: true,
  });
}
