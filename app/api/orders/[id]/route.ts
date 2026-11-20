import { NextResponse } from "next/server";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({
    illustrative: true,
    order: {
      id: params.id,
      status: "Preparing",
      items: ["Chicken sandwich ×2"],
      total: 34,
      posSync: "Awaiting connection",
    },
  });
}
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    illustrative: true,
    order: {
      id: params.id,
      status: body.status || "Preparing",
      posSync: "Awaiting connection",
    },
  });
}
