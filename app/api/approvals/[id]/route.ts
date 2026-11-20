import { NextResponse } from "next/server";
import { hasDemoSession } from "../../../../lib/auth";
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!hasDemoSession(request))
    return NextResponse.json(
      { error: "Owner session required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    id: params.id,
    decision: body.decision || "approved",
    illustrative: true,
  });
}
