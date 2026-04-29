import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITIES, CITY_COPY, DEFAULT_COPY, CITY_ORDER } from "@/data/events";
import EventTimeline from "@/components/EventTimeline";
import CityPageClient from "@/components/CityPageClient";
import WelcomeModal from "@/components/WelcomeModal";
import CityLandmark from "@/components/CityLandmark";
import Footer from "@/components/Footer";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return CITY_ORDER.map((key) => ({ slug: key }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const city = CITIES[slug];
  if (!city) return {};

  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const guestName  = str(sp.guest_name ?? sp.gn);
  const repName    = str(sp.rep_name ?? sp.rn);
  const referredBy = str(sp.referred_by ?? sp.rb);
  const featured   = city.events[0];

  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://cio-dinner-series-microsite.vercel.app";

  // Build OG image URL
  const ogParams = new URLSearchParams({ city: city.city, month: featured.month });
  if (guestName)  ogParams.set("guest_name", guestName);
  if (repName)    ogParams.set("rep_name", repName);
  if (referredBy) ogParams.set("referred_by", referredBy);
  const ogImage = `${base}/api/og?${ogParams.toString()}`;

  // Personalised title
  const firstName = guestName?.split(" ")[0];
  const title = firstName
    ? `${firstName}, you're invited — ${city.city} | Workato CIO Dinner Series`
    : referredBy
    ? `You're invited to the ${city.city} dinner | Workato CIO Dinner Series`
    : `${city.city} — Workato CIO Dinner Series`;

  const description = guestName
    ? `${guestName}, you've been personally invited to an intimate dinner with enterprise leaders in ${city.city} this ${featured.month}.`
    : referredBy
    ? `${referredBy} thought you'd belong at this dinner. Join enterprise leaders in ${city.city} this ${featured.month}.`
    : CITY_COPY[slug] ?? DEFAULT_COPY;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CityPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const city = CITIES[slug];
  if (!city) notFound();

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const guestName          = str(sp.guest_name ?? sp.gn);
  const guestEmail         = str(sp.guest_email ?? sp.ge);
  const guestCompany       = str(sp.guest_company ?? sp.gc);
  const repName            = str(sp.rep_name ?? sp.rn);
  const repCompany         = str(sp.rep_company ?? sp.rc);
  const referredBy         = str(sp.referred_by ?? sp.rb);
  const referredByCompany  = str(sp.referred_by_company ?? sp.rbc);
  const isPersonalized = !!(guestName || repName || referredBy);

  const featured = city.events[0];
  const copy = CITY_COPY[slug] ?? DEFAULT_COPY;

  const otherCities = CITY_ORDER.filter((k) => k !== slug).map((k) => CITIES[k]);

  return (
    <>
      {isPersonalized && (
        <WelcomeModal
          guestName={guestName}
          guestCompany={guestCompany}
          repName={repName}
          referredBy={referredBy}
          referredByCompany={referredByCompany}
          cityName={city.city}
          eventMonth={featured.month}
        />
      )}
      <div className="pt-16 min-h-screen">
        {/* City hero */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(103,234,221,0.045) 0%, transparent 60%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h1
                  className="text-[clamp(40px,6vw,72px)] font-light leading-tight mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {city.city}
                </h1>
                <p className="flex items-center flex-wrap gap-x-2 mt-1 text-[11px] tracking-[0.18em] uppercase">
                  <span style={{ color: "var(--text-muted)" }}>
                    {city.state}{city.country === "CA" ? " · Canada" : ""}
                  </span>
                  <span style={{ color: "rgba(103,234,221,0.25)" }}>·</span>
                  <span style={{ color: "var(--text-muted)" }}>CIO Dinner Series</span>
                  <span style={{ color: "rgba(103,234,221,0.25)" }}>·</span>
                  <span style={{ color: "rgba(103,234,221,0.55)" }}>
                    {city.events.length} dinner{city.events.length > 1 ? "s" : ""}
                  </span>
                </p>
                {/* Subtle personalization note */}
                {guestName && (
                  <p className="mt-2 text-[11px] tracking-[0.08em]" style={{ color: "rgba(103,234,221,0.45)" }}>
                    Personal invitation for {guestName}{guestCompany ? ` · ${guestCompany}` : ""}
                    {repName && (
                      <span style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-cormorant)", fontStyle: "normal" }}>
                        {" "}— prepared by {repName}
                      </span>
                    )}
                  </p>
                )}
                {!guestName && referredBy && (
                  <p className="mt-2 text-[11px] tracking-[0.08em]" style={{ color: "rgba(103,234,221,0.45)" }}>
                    Referred by {referredBy}{referredByCompany ? ` · ${referredByCompany}` : ""}
                  </p>
                )}
              </div>

              {/* Landmark — aligned right, bottom-anchored to city subtitle */}
              <div
                className="shrink-0 pointer-events-none select-none"
                style={{ color: "var(--teal)", opacity: 0.22, width: "160px" }}
                aria-hidden
              >
                <CityLandmark cityKey={slug} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:items-start">
            {/* Left — featured card */}
            <div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Next upcoming dinner
              </p>

            {/* Featured card */}
            <div
              className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(103,234,221,0.14)",
                }}
              >
                {/* Top bar */}
                <div
                  className="h-[2px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--teal), transparent)",
                  }}
                />
                {/* Desktop: 2-col split. Mobile: stacked */}
                <div className="flex flex-col lg:flex-row">

                  {/* Left — editorial */}
                  <div className="p-8 flex-1">
                    <h2
                      className="text-[clamp(20px,2.4vw,33px)] font-light leading-snug mb-5"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      The organizations pulling ahead
                      <br />
                      <em className="italic" style={{ color: "var(--teal-mid)" }}>
                        didn&apos;t get there by accident.
                      </em>
                    </h2>

                    <p
                      className="text-[14px] leading-relaxed"
                      style={{ color: "var(--text-ter)" }}
                    >
                      {copy}
                    </p>
                  </div>

                  {/* Fading vertical divider — desktop only */}
                  <div
                    className="hidden lg:block self-stretch w-px shrink-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.07) 18%, rgba(255,255,255,0.07) 82%, transparent 100%)",
                    }}
                  />

                  {/* Right — details + CTA */}
                  <div className="p-8 flex flex-col justify-between gap-8 lg:w-72 shrink-0">
                    {/* Event details */}
                    <div className="space-y-4">
                      {[
                        { label: "Date", value: featured.month },
                        { label: "Time", value: "Details to follow", muted: true },
                        { label: "Location", value: featured.venue },
                        { label: "Speaker", value: "Coming soon", muted: true },
                      ].map(({ label, value, muted }) => (
                        <div
                          key={label}
                          className="flex flex-col gap-1"
                          style={{
                            paddingBottom: "14px",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <span
                            className="text-[10px] tracking-[0.14em] uppercase"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {label}
                          </span>
                          <span
                            className="text-[13px]"
                            style={{
                              color: muted ? "var(--text-muted)" : "var(--text-sec)",
                              fontStyle: muted ? "italic" : "normal",
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <CityPageClient
                      cityKey={slug}
                      cityName={city.city}
                      eventMonth={featured.month}
                      isPersonalized={isPersonalized}
                      prefill={{
                        name: guestName,
                        email: guestEmail,
                        company: guestCompany,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right — timeline */}
            <div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                All evenings in {city.city}
              </p>
              <div
                className="relative rounded-xl p-6 overflow-hidden"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <EventTimeline events={city.events} cityName={city.city} />
                {/* Fade-out gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent, var(--card))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Full-width Other Cities band ── */}
        <div
          className="relative overflow-hidden mt-10"
          style={{ background: "var(--bg2)", borderTop: "1px solid var(--teal-line-dark)" }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(103,234,221,0.04) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-50" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p
                  className="text-[10px] tracking-[0.28em] uppercase mb-3"
                  style={{ color: "var(--teal)" }}
                >
                  Also running across North America
                </p>
                <h2
                  className="text-[clamp(28px,4vw,44px)] font-light leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {otherCities.length} more{" "}
                  <em className="italic" style={{ color: "var(--teal-mid)" }}>
                    markets
                  </em>{" "}
                  this season.
                </h2>
              </div>
              <a
                href="/#markets"
                className="shrink-0 inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase pb-1 transition-colors duration-200"
                style={{
                  color: "var(--text-muted)",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                View all cities →
              </a>
            </div>

            {/* City grid */}
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >
              {otherCities.map((c) => {
                const first = c.events[0];
                const last  = c.events[c.events.length - 1];
                return (
                  <Link
                    key={c.key}
                    href={`/city/${c.key}`}
                    className="group relative flex flex-col justify-between p-5 rounded-xl overflow-hidden transition-all duration-250"
                    style={{
                      background: "var(--card)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      minHeight: "120px",
                    }}
                  >
                    {/* Hover top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, var(--teal), transparent)",
                      }}
                    />
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-xl"
                      style={{
                        background:
                          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(103,234,221,0.06) 0%, transparent 70%)",
                      }}
                    />

                    <div className="relative z-10">
                      <p
                        className="text-[15px] font-medium mb-0.5 transition-colors duration-200 group-hover:text-[var(--teal)]"
                        style={{ color: "var(--text)" }}
                      >
                        {c.city}
                      </p>
                      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                        {c.state}{c.country === "CA" ? " · Canada" : ""}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-end justify-between mt-4">
                      <div>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {first.month.split(" ")[0]}
                          {first.month !== last.month ? ` – ${last.month.split(" ")[0]} ${last.month.split(" ")[1]}` : ` ${first.month.split(" ")[1]}`}
                        </p>
                      </div>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--teal-dim)",
                          color: "var(--teal)",
                          border: "1px solid var(--teal-line-dark)",
                        }}
                      >
                        {c.events.length}×
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
