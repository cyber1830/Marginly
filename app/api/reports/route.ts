import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    illustrative: true,
    period: "This month",
    metrics: {
      commissionSaved: 48120,
      directOrderMix: 61,
      repeatCustomerValue: 2.4,
    },
    series: [18, 24, 31, 29, 42, 55, 61],
  });
}
