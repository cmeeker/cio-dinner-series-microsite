import { NextRequest, NextResponse } from "next/server";

const MARKETO_FORM_ID    = process.env.NEXT_PUBLIC_MARKETO_FORM_ID;
const MARKETO_MUNCHKIN   = process.env.NEXT_PUBLIC_MARKETO_MUNCHKIN_ID || "741-DET-352";
const MARKETO_BASE_URL   = process.env.NEXT_PUBLIC_MARKETO_BASE_URL || `${MARKETO_MUNCHKIN}.mktoweb.com`;

/** Server-side Marketo form post as a belt-and-suspenders backup when the
 *  client-side Forms 2.0 SDK is unavailable (CSP, ad-blocker, server fallback). */
async function postToMarketo(fields: Record<string, string>): Promise<void> {
  if (!MARKETO_FORM_ID) return; // Marketo not configured — skip silently

  const params = new URLSearchParams({ ...fields, formid: MARKETO_FORM_ID, munchkinId: MARKETO_MUNCHKIN });
  const url = `https://${MARKETO_BASE_URL}/index.php/leadCapture/save2`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    console.error("[register] Marketo server-side post failed:", res.status, await res.text().catch(() => ""));
  }
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  const allowed = [
    "https://cio-dinner-series-microsite.vercel.app",
    "https://workato.com",
    "https://www.workato.com",
  ];
  if (process.env.NODE_ENV === "development") return true;
  const extra = process.env.ALLOWED_ORIGINS?.split(",").map((s) => s.trim()) ?? [];
  return [...allowed, ...extra].some((o) => origin.startsWith(o));
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, company, title, message, cityKey, eventMonth, eventDate } = body;

  if (!firstName?.trim() || !lastName?.trim() || !company?.trim() || !cityKey?.trim() || !eventMonth?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!email?.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const notesParts = [
    `CIO Dinner — ${cityKey}`,
    `Month: ${eventMonth}`,
    eventDate ? `Date: ${eventDate}` : null,
    message?.trim() || null,
  ].filter(Boolean);

  try {
    await postToMarketo({
      FirstName: firstName.trim(),
      LastName: lastName.trim(),
      Email: email.trim(),
      Company: company.trim(),
      ...(title?.trim() ? { Title: title.trim() } : {}),
      personNote: notesParts.join("\n"),
      ...(eventDate ? { CIO_Event_Date__c: eventDate } : {}),
    });
  } catch (err) {
    console.error("[register] Marketo post error:", err);
    // Non-fatal — still return success to the user
  }

  return NextResponse.json({ success: true });
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin ?? "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
