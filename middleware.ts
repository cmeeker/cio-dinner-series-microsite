import { NextRequest, NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

/**
 * Must be static strings (Next.js parses `matcher` at compile time).
 * Default app mount is `/cio-dinner` — keep in sync with `lib/base-path.ts`.
 * Root-mounted builds (`NEXT_PUBLIC_BASE_PATH=""`) use the first patterns.
 */
export const config = {
  matcher: [
    "/((?!cio-dinner|_next/static|_next/image|favicon.ico).*)",
    "/cio-dinner/((?!_next/static|_next/image|favicon.ico).*)",
    "/cio-dinner",
    "/cio-dinner/",
  ],
};
