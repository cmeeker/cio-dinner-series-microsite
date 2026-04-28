import { NextRequest, NextResponse } from "next/server";

const USERNAME = "cio";
const PASSWORD = "dinner";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");
    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="CIO Dinner Series"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
