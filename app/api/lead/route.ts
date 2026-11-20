import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type LeadInput = {
  name?: string;
  restaurant?: string;
  email?: string;
  zipcode?: string;
};

export async function POST(request: Request) {
  const input = (await request.json()) as LeadInput;
  if (!input.name || !input.restaurant || !input.email)
    return NextResponse.json(
      { error: "Name, restaurant and email are required" },
      { status: 400 },
    );
  if (process.env.DATABASE_URL) {
    try {
      const lead = await prisma.lead.create({
        data: {
          name: input.name,
          restaurant: input.restaurant,
          email: input.email,
          zipcode: input.zipcode,
        },
      });
      return NextResponse.json(
        { ok: true, lead, persisted: true },
        { status: 201 },
      );
    } catch {
      return NextResponse.json(
        { error: "Lead service temporarily unavailable" },
        { status: 503 },
      );
    }
  }
  return NextResponse.json(
    {
      ok: true,
      lead: { ...input, id: `lead_${Date.now()}` },
      persisted: false,
      illustrative: true,
    },
    { status: 201 },
  );
}
