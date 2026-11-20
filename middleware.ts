import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const ownerPaths = [
    "/dashboard",
    "/menu",
    "/marketing",
    "/visuals",
    "/reports",
    "/settings",
    "/team",
  ];
  if (
    ownerPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !request.cookies.has("marginly_demo_session")
  )
    return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/menu/:path*",
    "/marketing/:path*",
    "/visuals/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/team/:path*",
  ],
};
