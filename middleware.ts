import { NextRequest, NextResponse } from "next/server";
import { getBasePath } from "@/lib/base-path";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

const bp = getBasePath();

export const config = {
  matcher: bp
    ? [
        `${bp}/((?!_next/static|_next/image|favicon.ico).*)`,
        `${bp}`,
        `${bp}/`,
      ]
    : ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
