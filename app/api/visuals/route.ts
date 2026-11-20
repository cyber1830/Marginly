import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    illustrative: true,
    assets: [
      {
        id: "visual_1",
        dish: "Rigatoni",
        status: "pending",
        authenticity: "Original food preserved",
      },
      {
        id: "visual_2",
        dish: "Chicken sandwich",
        status: "approved",
        authenticity: "Original food preserved",
      },
    ],
  });
}
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    ok: true,
    id: body.id,
    status: "approved",
    illustrative: true,
  });
}
