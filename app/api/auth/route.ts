import { NextRequest, NextResponse } from "next/server";
import { getBasePath } from "@/lib/base-path";

const USERNAME = process.env.AUTH_USERNAME;
const PASSWORD = process.env.AUTH_PASSWORD;

export async function POST(req: NextRequest) {
  if (!USERNAME || !PASSWORD) {
    console.error("AUTH_USERNAME / AUTH_PASSWORD env vars are not set.");
    return NextResponse.json({ error: "Auth not configured." }, { status: 503 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials." }, { status: 400 });
  }

  if (username === USERNAME && password === PASSWORD) {
    const res = NextResponse.json({ ok: true });
    const basePath = getBasePath();
    res.cookies.set("cio-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: basePath || "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
}
