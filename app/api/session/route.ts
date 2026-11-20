import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.email)
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  const response = NextResponse.json({
    ok: true,
    demo: true,
    user: { email: body.email, role: "owner" },
  });
  response.cookies.set("marginly_demo_session", "demo", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
