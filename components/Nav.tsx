"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { CITIES, EVENT_BY_DATE_KEY } from "@/data/events";
import { formatEventDateCompact } from "@/lib/event-utils";

/** Only return a compact date label when the event is confirmed, otherwise empty string */
function formatDateSlug(slug: string, confirmed?: boolean): string {
  return confirmed && slug.length > 7 ? formatEventDateCompact(slug) : "";
}

const RESERVED_SLUGS = new Set(["login", "api", "apple-icon.png", "icon.png", "favicon.ico"]);

/** Extract city slug and optional date from `/[slug]` or `/cio-dinner/[slug]/[date]` */
function useCityRoute() {
  const pathname = usePathname();
  let parts = pathname.split("/").filter(Boolean);
  // Strip the /cio-dinner/ prefix if present
  if (parts[0] === "cio-dinner") parts = parts.slice(1);
  const slug = parts[0];
  if (!slug || RESERVED_SLUGS.has(slug)) return { slug: null, date: null };
  if (!CITIES[slug]) return { slug: null, date: null };
  return { slug, date: parts[1] ?? null };
}

function NavCityMeta() {
  const { slug, date } = useCityRoute();
  const city = slug ? CITIES[slug] : null;
  if (!city) return null;

  const event = date
    ? EVENT_BY_DATE_KEY[`${slug}::${date}`]
    : city.events[0];
  if (!event) return null;

  return (
    <div
      className="hidden lg:flex items-center gap-3 pr-6 border-r"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <span
        className="text-[15px] font-light"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-sec)", lineHeight: 1 }}
      >
        {city.city}
      </span>
      <span
        className="text-[15px] font-light"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", lineHeight: 1 }}
      >
        CIO Dinner Series
      </span>
      <span style={{ color: "rgba(103,234,221,0.25)", lineHeight: 1 }}>·</span>
      <span
        className="text-[11px] tracking-[0.1em]"
        style={{ color: "var(--text-muted)", lineHeight: 1 }}
      >
        {date ? (formatDateSlug(date, event.dateConfirmed) || event.month) : event.month}
      </span>
      <span style={{ color: "rgba(103,234,221,0.25)", lineHeight: 1 }}>·</span>
      <span
        className="text-[11px] tracking-[0.06em]"
        style={{ color: "var(--text-muted)", lineHeight: 1 }}
      >
        {event.venue}
      </span>
    </div>
  );
}

function NavCTA() {
  const { slug, date } = useCityRoute();
  const params = useSearchParams();

  const city = slug ? CITIES[slug] : null;
  // CTA only shows on individual event pages (date present), not city overview
  if (!city || !date) return null;

  const guestName = params.get("guest_name") ?? params.get("gn") ?? undefined;
  const referredBy = params.get("referred_by") ?? params.get("rb") ?? undefined;
  const isPersonalized = !!(guestName || referredBy);

  return (
    <button
      onClick={() => document.getElementById("city-register-btn")?.click()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium tracking-wide transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_16px_rgba(103,234,221,0.2)] active:scale-[0.98] cursor-pointer"
      style={{ background: "var(--teal)", color: "#111010" }}
    >
      {isPersonalized ? "Accept invitation" : "Reserve your seat"}
      <span className="text-[13px]">→</span>
    </button>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  let parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "cio-dinner") parts = parts.slice(1);
  const isCityRoute = !!parts[0] && !RESERVED_SLUGS.has(parts[0]) && !!CITIES[parts[0]];
  const isEventPage = isCityRoute && parts.length >= 2;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden"
      style={{
        height: "64px",
        background: scrolled ? "rgba(17,16,16,0.96)" : "rgba(17,16,16,0.70)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${
          scrolled ? "rgba(103,234,221,0.12)" : "rgba(103,234,221,0.06)"
        }`,
      }}
    >
      <div className="h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/workato-logo.webp"
            alt="Workato"
            width={120}
            height={36}
            className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-80"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          {isCityRoute && (
            <div
              className="transition-all duration-500"
              style={{
                opacity: scrolled ? 1 : 0,
                pointerEvents: scrolled ? "auto" : "none",
              }}
            >
              <Suspense>
                <NavCityMeta />
              </Suspense>
            </div>
          )}

          {isEventPage ? (
            <Suspense>
              <NavCTA />
            </Suspense>
          ) : (
            <span
              className="hidden sm:block text-[11px] tracking-[0.12em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              By invitation only
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
