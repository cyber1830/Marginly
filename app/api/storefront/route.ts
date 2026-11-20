import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../lib/auth";
export async function GET() {
  return NextResponse.json({
    illustrative: true,
    status: "draft",
    restaurant: "Mission Kitchen",
    menuItems: 86,
    commission: 0,
  });
}
export async function POST(request: Request) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  return NextResponse.json({
    ok: true,
    status: "published",
    illustrative: true,
  });
}
