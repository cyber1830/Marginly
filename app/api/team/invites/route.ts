import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasDemoSession } from "../../../../lib/auth";
export async function POST(request: Request) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  const body = await request.json();
  if (!body.email)
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  if (process.env.DATABASE_URL) {
    try {
      const invite = await prisma.teamInvite.create({
        data: {
          email: body.email,
          role:
            body.role === "manager"
              ? "manager"
              : body.role === "owner"
                ? "owner"
                : "staff",
        },
      });
      return NextResponse.json(
        { ok: true, invite, persisted: true },
        { status: 201 },
      );
    } catch {
      return NextResponse.json(
        { error: "Invite service temporarily unavailable" },
        { status: 503 },
      );
    }
  }
  return NextResponse.json(
    {
      ok: true,
      invite: {
        id: `invite_${Date.now()}`,
        email: body.email,
        role: body.role || "staff",
        status: "pending",
        illustrative: true,
      },
      persisted: false,
    },
    { status: 201 },
  );
}
