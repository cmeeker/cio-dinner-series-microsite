import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublicAppUrl } from "@/lib/site-origin";
import { formatEventDate, formatEventDateCompact, getEventUrlSlug, isEventPast } from "@/lib/event-utils";
import { CITIES, CITY_COPY, DEFAULT_COPY, CITY_ORDER, EVENTS } from "@/data/events";
import CityLandmark from "@/components/CityLandmark";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return CITY_ORDER.map((key) => ({ slug: key }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) return {};

  const base = getPublicAppUrl();
  const ogImage = `${base}/api/og?city=${encodeURIComponent(city.city)}`;
  const title = `${city.city} — Workato CIO Dinner Series`;
  const description = CITY_COPY[slug] ?? DEFAULT_COPY;

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

export default async function CityOverviewPage({ params }: PageProps) {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) notFound();

  const copy = CITY_COPY[slug] ?? DEFAULT_COPY;
  const datedEvents = city.events.filter((e) => e.date);
  const undatedEvents = city.events.filter((e) => !e.date);

  const otherCities = CITY_ORDER.filter((k) => k !== slug).map((k) => CITIES[k]);

  return (
    <>
      <div className="pt-16 min-h-screen">
        {/* Hero */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(103,234,221,0.045) 0%, transparent 60%)",
          }}
        >
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
                    {city.state}
                    {city.country === "CA" ? " · Canada" : ""}
                  </span>
                  <span style={{ color: "rgba(103,234,221,0.25)" }}>·</span>
                  <span style={{ color: "var(--text-muted)" }}>
                    CIO Dinner Series
                  </span>
                  <span style={{ color: "rgba(103,234,221,0.25)" }}>·</span>
                  <span style={{ color: "rgba(103,234,221,0.55)" }}>
                    {city.events.length} dinner
                    {city.events.length > 1 ? "s" : ""}
                  </span>
                </p>
              </div>
              <div
                className="shrink-0 pointer-events-none select-none"
                style={{ color: "var(--teal)", opacity: 0.22, width: "160px" }}
                aria-hidden
              >
                <CityLandmark cityKey={slug} className="w-full h-auto" />
              </div>
            </div>

            <p
              className="mt-6 max-w-2xl text-[14px] leading-relaxed"
              style={{ color: "var(--text-ter)" }}
            >
              {copy}
            </p>
          </div>
        </div>

        {/* Event list */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <p
            className="text-[10px] tracking-[0.22em] uppercase mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            All evenings in {city.city}
          </p>

          <div className="space-y-3">
            {city.events.map((event, i) => {
              const isPast = isEventPast(event);
              const isFirst = i === 0 && !isPast;

              const cardContent = (
                <div
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    background: "var(--card)",
                    border: `1px solid ${
                      isPast
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(103,234,221,0.10)"
                    }`,
                    opacity: isPast ? 0.4 : 1,
                  }}
                >
                  {/* Top accent on hover (only for non-past events) */}
                  {!isPast && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, var(--teal), transparent)",
                      }}
                    />
                  )}

                  {/* Left — date + venue */}
                  <div className="flex items-start gap-5">
                    {/* Index badge */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: isFirst ? "var(--teal-dim)" : "var(--surface)",
                        border: `1px solid ${
                          isFirst ? "var(--teal-line)" : "rgba(255,255,255,0.06)"
                        }`,
                      }}
                    >
                      <span
                        className="text-[10px] font-medium"
                        style={{
                          color: isFirst ? "var(--teal)" : "var(--text-muted)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    <div>
                      <p
                        className="text-[17px] font-light mb-0.5"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          color: "var(--text-sec)",
                        }}
                      >
                        {event.month}
                        {event.dateConfirmed && event.date && (
                          <span
                            className="ml-2 text-[13px]"
                            style={{ color: isPast ? "var(--text-muted)" : "var(--teal-mid)" }}
                          >
                            · {formatEventDate(event.date, { weekday: true, year: false })}
                          </span>
                        )}
                      </p>
                      <p
                        className="text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  {/* Right — CTA (hidden for past events) */}
                  <div className="flex items-center gap-3 sm:shrink-0 pl-13 sm:pl-0">
                    {!isPast && (
                      <span
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-wide font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: "var(--teal)" }}
                      >
                        View dinner →
                      </span>
                    )}
                  </div>
                </div>
              );

              if (isPast) {
                return (
                  <div key={event.id} className="block cursor-default">
                    {cardContent}
                  </div>
                );
              }

              return (
                <Link
                  key={event.id}
                  href={`/${slug}/${getEventUrlSlug(event)}`}
                  className="block group"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>

        </div>

        {/* Other cities */}
        <div
          className="relative overflow-hidden mt-10"
          style={{
            background: "var(--bg2)",
            borderTop: "1px solid var(--teal-line-dark)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(103,234,221,0.04) 0%, transparent 65%)",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
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
                href="/#markets"
                className="shrink-0 inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase pb-1"
                style={{
                  color: "var(--text-muted)",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                View all cities →
              </Link>
            </div>
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >
              {otherCities.map((c) => {
                if (!c) return null;
                const first = c.events[0];
                const last = c.events[c.events.length - 1];
                return (
                  <Link
                    key={c.key}
                    href={`/${c.key}`}
                    className="group relative flex flex-col justify-between p-5 rounded-xl overflow-hidden transition-all duration-250"
                    style={{
                      background: "var(--card)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      minHeight: "120px",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, var(--teal), transparent)",
                      }}
                    />
                    <div className="relative z-10">
                      <p
                        className="text-[15px] font-medium mb-0.5 transition-colors duration-200 group-hover:text-[var(--teal)]"
                        style={{ color: "var(--text)" }}
                      >
                        {c.city}
                      </p>
                      <p
                        className="text-[11px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {c.state}
                        {c.country === "CA" ? " · Canada" : ""}
                      </p>
                    </div>
                    <div className="relative z-10 flex items-end justify-between mt-4">
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {first.month.split(" ")[0]}
                        {first.month !== last.month
                          ? ` – ${last.month.split(" ")[0]} ${last.month.split(" ")[1]}`
                          : ` ${first.month.split(" ")[1]}`}
                      </p>
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
