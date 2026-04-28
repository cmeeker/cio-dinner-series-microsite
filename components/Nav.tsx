"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { CITIES } from "@/data/events";

const RegisterModal = dynamic(() => import("./RegisterModal"), { ssr: false });

function NavCTA() {
  const pathname = usePathname();
  const params = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  const slug = pathname.startsWith("/city/") ? pathname.replace("/city/", "") : null;
  const city = slug ? CITIES[slug] : null;
  if (!city) return null;

  const featured = city.events[0];

  const guestName    = params.get("guest_name") ?? params.get("gn") ?? undefined;
  const guestCompany = params.get("guest_company") ?? params.get("gc") ?? undefined;
  const isPersonalized = !!guestName;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={{ background: "var(--teal)", color: "#111010" }}
      >
        {isPersonalized ? "Accept invitation" : "Reserve your seat"}
        <span className="text-[13px]">→</span>
      </button>

      {showModal && (
        <RegisterModal
          cityKey={slug!}
          cityName={city.city}
          eventMonth={featured.month}
          prefill={{ name: guestName, company: guestCompany }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isHome = pathname === "/";
  const isCityPage = pathname.startsWith("/city/");

  if (pathname === "/login") return null;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
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
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(to right, var(--teal-mid), var(--teal))",
          opacity: scrollProgress > 1 ? 1 : 0,
        }}
      />

      <div className="h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/workato-logo.webp"
            alt="Workato"
            width={120}
            height={36}
            className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-80"
            priority
          />
        </Link>

        <div className="flex items-center gap-5">
          {!isHome && (
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
            >
              ← All Cities
            </Link>
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
