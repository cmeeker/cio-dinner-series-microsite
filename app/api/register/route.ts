import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, title, message, cityKey, eventMonth } =
      body as Record<string, string>;

    if (!firstName || !lastName || !email || !company || !title || !cityKey || !eventMonth) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Write to Supabase if configured
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          company,
          title,
          message: message ?? null,
          city_key: cityKey,
          event_month: eventMonth,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Supabase insert failed:", text);
        return NextResponse.json(
          { error: "Failed to save registration." },
          { status: 500 }
        );
      }
    } else {
      // Dev mode — log to console
      console.log("[Registration]", {
        firstName,
        lastName,
        email,
        company,
        title,
        message,
        cityKey,
        eventMonth,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
