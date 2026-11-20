import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../lib/auth";
export async function GET() {
  return NextResponse.json({
    illustrative: true,
    campaigns: [
      {
        id: "campaign_1",
        title: "Friday family meal post",
        status: "pending",
        copy: "Feed the whole table without the Friday scramble.",
      },
      {
        id: "campaign_2",
        title: "Rigatoni launch story",
        status: "pending",
        copy: "Your next comfort order starts here.",
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
    id: body.id || `campaign_${Date.now()}`,
    status: "approved",
    illustrative: true,
  });
}
