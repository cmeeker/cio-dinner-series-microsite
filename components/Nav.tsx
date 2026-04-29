"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { CITIES } from "@/data/events";

function NavCityMeta() {
  const pathname = usePathname();
  const slug = pathname.startsWith("/city/") ? pathname.replace("/city/", "") : null;
  const city = slug ? CITIES[slug] : null;
  if (!city) return null;

  const featured = city.events[0];

  return (
    <div className="hidden lg:flex items-center gap-3 pr-6 border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <span
        className="text-[15px] font-light"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-sec)" }}
      >
        {city.city}
      </span>
      <span
        className="text-[15px] font-light"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}
      >
        CIO Dinner Series
      </span>
      <span style={{ color: "rgba(103,234,221,0.25)" }}>·</span>
      <span
        className="text-[11px] tracking-[0.1em]"
        style={{ color: "var(--text-muted)" }}
      >
        {featured.month}
      </span>
      <span style={{ color: "rgba(103,234,221,0.25)" }}>·</span>
      <span
        className="text-[11px] tracking-[0.06em]"
        style={{ color: "var(--text-muted)" }}
      >
        {featured.venue}
      </span>
    </div>
  );
}

function NavCTA() {
  const pathname = usePathname();
  const params = useSearchParams();

  const slug = pathname.startsWith("/city/") ? pathname.replace("/city/", "") : null;
  const city = slug ? CITIES[slug] : null;
  if (!city) return null;

  const guestName = params.get("guest_name") ?? params.get("gn") ?? undefined;
  const isPersonalized = !!guestName;

  return (
    <button
      onClick={() => document.getElementById("city-register-btn")?.click()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
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
  const isCityPage = pathname.startsWith("/city/");

  if (pathname === "/login") return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: "64px",
        background: scrolled ? "rgba(17,16,16,0.96)" : "rgba(17,16,16,0.70)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(103,234,221,0.12)" : "rgba(103,234,221,0.06)"}`,
      }}
    >
      <div className="h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left — logo */}
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

        {/* Right — city meta + CTA */}
        <div className="flex items-center gap-6">
          {isCityPage && (
            <div
              className="transition-all duration-500"
              style={{ opacity: scrolled ? 1 : 0, transform: `translateY(${scrolled ? 0 : 5}px)`, pointerEvents: scrolled ? "auto" : "none" }}
            >
              <Suspense>
                <NavCityMeta />
              </Suspense>
            </div>
          )}

          {isCityPage ? (
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
