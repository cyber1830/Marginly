import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "marginly",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
