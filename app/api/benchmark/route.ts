import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const zipcode = new URL(request.url).searchParams.get("zipcode") || "400001";
  const city = zipcode.startsWith("56")
    ? "Koramangala, Bengaluru"
    : zipcode.startsWith("11")
      ? "Central Delhi"
      : zipcode.startsWith("40")
        ? "Fort, Mumbai"
        : "India market sample";
  return NextResponse.json({
    zipcode,
    city,
    comparableMenus: 18,
    refreshed: "today",
    illustrative: true,
    items: [
      {
        name: "Lucknowi chicken biryani",
        yourPrice: 319,
        median: 349,
        opportunity: 30,
      },
      {
        name: "Tandoori paneer tikka",
        yourPrice: 219,
        median: 249,
        opportunity: 30,
      },
      { name: "Masala chai", yourPrice: 80, median: 99, opportunity: 19 },
    ],
    gaps: ["Family combo", "Thali", "Biryani add-on", "Value meal"],
  });
}
