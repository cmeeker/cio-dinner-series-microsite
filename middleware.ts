import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "cio-auth";
const AUTH_VALUE = "authenticated";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow login page and API auth route
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(AUTH_COOKIE);
  if (cookie?.value === AUTH_VALUE) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
