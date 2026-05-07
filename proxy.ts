import { NextRequest, NextResponse } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options":    "nosniff",
  "X-Frame-Options":           "SAMEORIGIN",
  "X-XSS-Protection":          "1; mode=block",
  "Referrer-Policy":           "strict-origin-when-cross-origin",
  "Permissions-Policy":        "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(k, v);
  }
  return res;
}

/**
 * Must be static strings (Next.js parses `matcher` at compile time).
 * Keep the first pattern as the root-mounted catch-all.
 * Second pattern handles the /cio-dinner subdirectory deployment.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/cio-dinner/((?!_next/static|_next/image|favicon.ico).*)",
    "/cio-dinner",
    "/cio-dinner/",
  ],
};
