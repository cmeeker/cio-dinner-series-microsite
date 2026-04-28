import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITIES, CITY_COPY, DEFAULT_COPY, CITY_ORDER } from "@/data/events";
import EventTimeline from "@/components/EventTimeline";
import CityPageClient from "@/components/CityPageClient";
import InvitationBanner from "@/components/InvitationBanner";
import WelcomeModal from "@/components/WelcomeModal";
import Footer from "@/components/Footer";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return CITY_ORDER.map((key) => ({ slug: key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) return {};
  return {
    title: `${city.city} — Workato CIO Dinner Series`,
    description: CITY_COPY[slug] ?? DEFAULT_COPY,
  };
}

export default async function CityPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const city = CITIES[slug];
  if (!city) notFound();

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const guestName    = str(sp.guest_name ?? sp.gn);
  const guestCompany = str(sp.guest_company ?? sp.gc);
  const repName      = str(sp.rep_name ?? sp.rn);
  const repCompany   = str(sp.rep_company ?? sp.rc);
  const isPersonalized = !!(guestName || repName);

  const featured = city.events[0];
  const copy = CITY_COPY[slug] ?? DEFAULT_COPY;

  const otherCities = CITY_ORDER.filter((k) => k !== slug).map((k) => CITIES[k]);

  return (
    <>
      {isPersonalized && guestName && (
        <WelcomeModal
          guestName={guestName}
          guestCompany={guestCompany}
          repName={repName}
          cityName={city.city}
          eventMonth={featured.month}
        />
      )}
      <div className="pt-16 min-h-screen">
        {/* City hero */}
        <div
          className="relative px-6 lg:px-12 pt-16 pb-12 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(103,234,221,0.045) 0%, transparent 60%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none grid-bg"
            aria-hidden
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-8 text-[12px] tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
            >
              ← All cities
            </Link>
            <h1
              className="text-[clamp(40px,6vw,72px)] font-light leading-tight mb-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {isPersonalized && guestName ? (
                <>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.55em", display: "block", marginBottom: "6px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-geist-sans)" }}>
                    Your invitation — {city.city}
                  </span>
                  <em className="italic" style={{ color: "var(--teal-mid)" }}>
                    {guestName.split(" ")[0]},
                  </em>{" "}
                  you&apos;re invited.
                </>
              ) : (
                city.city
              )}
            </h1>
            <p
              className="text-[13px] tracking-[0.06em]"
              style={{ color: "var(--text-muted)" }}
            >
              {city.state}
              {city.country === "CA" ? " · Canada" : ""}
              &nbsp;·&nbsp;CIO Dinner Series&nbsp;·&nbsp;
              {city.events.length} dinner{city.events.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          {isPersonalized && (
            <InvitationBanner
              guestName={guestName}
              guestCompany={guestCompany}
              repName={repName}
              repCompany={repCompany}
              cityName={city.city}
              eventMonth={featured.month}
            />
          )}
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Main featured card */}
            <div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-5"
                style={{ color: "var(--text-muted)" }}
              >
                Next upcoming dinner
              </p>

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Top bar */}
                <div
                  className="h-[3px]"
                  style={{
                    background:
                      "linear-gradient(to right, var(--teal-deep), var(--teal), var(--teal-mid))",
                  }}
                />
                <div className="p-8">
                  {/* Month pill */}
                  <div
                    className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-[12px]"
                    style={{
                      background: "var(--teal-dim)",
                      border: "1px solid var(--teal-line-dark)",
                      color: "var(--teal)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: "var(--teal)" }}
                    />
                    {featured.month}
                  </div>

                  <h2
                    className="text-[clamp(22px,3vw,32px)] font-light leading-snug mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    The organizations pulling ahead
                    <br />
                    <em className="italic" style={{ color: "var(--teal-mid)" }}>
                      didn&apos;t get there by accident.
                    </em>
                  </h2>

                  <p
                    className="text-[14px] leading-relaxed mb-8"
                    style={{ color: "var(--text-ter)", maxWidth: "560px" }}
                  >
                    {copy}
                  </p>

                  {/* Event details */}
                  <div
                    className="rounded-xl p-5 mb-8 space-y-4"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {[
                      { label: "Date", value: featured.month },
                      { label: "Time", value: "Details to follow", muted: true },
                      { label: "Location", value: featured.venue },
                      { label: "Speaker", value: "Coming soon", muted: true },
                    ].map(({ label, value, muted }) => (
                      <div
                        key={label}
                        className="flex items-baseline justify-between gap-6"
                        style={{
                          paddingBottom: "12px",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span
                          className="text-[11px] tracking-[0.1em] uppercase shrink-0"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-[13px] text-right"
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

                  {/* CTA — client component for modal */}
                  <CityPageClient
                    cityKey={slug}
                    cityName={city.city}
                    eventMonth={featured.month}
                    prefill={{
                      name: guestName,
                      company: guestCompany,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar — timeline only */}
            <div>
              <div
                className="rounded-xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <EventTimeline events={city.events} cityName={city.city} />
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
          <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

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
              <Link
                href="/"
                className="shrink-0 inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase pb-1 transition-colors duration-200"
                style={{
                  color: "var(--text-muted)",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                View all cities →
              </Link>
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
