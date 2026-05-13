import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicAppUrl } from "@/lib/site-origin";
import { formatEventDate, getEventUrlSlug } from "@/lib/event-utils";
import {
  CITIES,
  EVENTS,
  CITY_COPY,
  DEFAULT_COPY,
  EVENT_BY_DATE_KEY,
} from "@/data/events";
import CityPageClient from "@/components/CityPageClient";
import WelcomeModal from "@/components/WelcomeModal";
import CityLandmark from "@/components/CityLandmark";
import EventTimeline from "@/components/EventTimeline";
import RegionAccordion from "@/components/RegionAccordion";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string; date: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return EVENTS.map((e) => ({
    slug: e.cityKey,
    date: getEventUrlSlug(e),
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug, date } = await params;
  const sp = await searchParams;

  const event = EVENT_BY_DATE_KEY[`${slug}::${date}`];
  const city = CITIES[slug];
  if (!event || !city) return {};

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const guestName = str(sp.guest_name ?? sp.gn);
  const repName = str(sp.rep_name ?? sp.rn);
  const referredBy = str(sp.referred_by ?? sp.rb);

  const base = getPublicAppUrl();
  const dateLabel = event.dateConfirmed && event.date ? formatEventDate(event.date) : event.month;

  const ogParams = new URLSearchParams({ city: city.city, month: event.month });
  if (guestName) ogParams.set("guest_name", guestName);
  if (repName) ogParams.set("rep_name", repName);
  if (referredBy) ogParams.set("referred_by", referredBy);
  const ogImage = `${base}/api/og?${ogParams.toString()}`;

  const firstName = guestName?.split(" ")[0];
  const title = firstName
    ? `${firstName}, you're invited — ${city.city}, ${event.month} | Workato CIO Dinner Series`
    : referredBy
    ? `You're invited to the ${city.city} dinner | Workato CIO Dinner Series`
    : `${city.city} · ${dateLabel} | Workato CIO Dinner Series`;

  const description = guestName
    ? `${guestName}, you've been personally invited to an intimate dinner with enterprise leaders in ${city.city} on ${dateLabel}.`
    : referredBy
    ? `${referredBy} thought you'd belong at this dinner. Join enterprise leaders in ${city.city} on ${dateLabel}.`
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

export default async function EventPage({ params, searchParams }: PageProps) {
  const { slug, date } = await params;
  const sp = await searchParams;

  const event = EVENT_BY_DATE_KEY[`${slug}::${date}`];
  const city = CITIES[slug];
  if (!event || !city) notFound();

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const guestName = str(sp.guest_name ?? sp.gn);
  const guestEmail = str(sp.guest_email ?? sp.ge);
  const guestCompany = str(sp.guest_company ?? sp.gc);
  const repName = str(sp.rep_name ?? sp.rn);
  const referredBy = str(sp.referred_by ?? sp.rb);
  const referredByCompany = str(sp.referred_by_company ?? sp.rbc);
  const isPersonalized = !!(guestName || repName || referredBy);

  const copy = CITY_COPY[slug] ?? DEFAULT_COPY;
  const hasConfirmedDate = !!event.dateConfirmed;
  const dateLabel = hasConfirmedDate ? formatEventDate(event.date!) : event.month;

  const otherCityEvents = city.events.filter((e) => e.id !== event.id);

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
          eventMonth={event.month}
        />
      )}

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
                <p
                  className="text-[10px] tracking-[0.22em] uppercase mb-3"
                  style={{ color: "var(--teal)" }}
                >
                  {event.month}
                </p>
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
                </p>
                {guestName && (
                  <p
                    className="mt-2 text-[11px] tracking-[0.08em]"
                    style={{ color: "rgba(103,234,221,0.45)" }}
                  >
                    Personal invitation for {guestName}
                    {guestCompany ? ` · ${guestCompany}` : ""}
                    {repName && (
                      <span
                        style={{
                          color: "rgba(255,255,255,0.28)",
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "13px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        , prepared by {repName}
                      </span>
                    )}
                  </p>
                )}
                {!guestName && referredBy && (
                  <p
                    className="mt-2 text-[11px] tracking-[0.08em]"
                    style={{ color: "rgba(103,234,221,0.45)" }}
                  >
                    Referred by {referredBy}
                    {referredByCompany ? ` · ${referredByCompany}` : ""}
                  </p>
                )}
              </div>
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
            {/* Left — event card */}
            <div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {isPersonalized ? "Your invitation" : "Dinner details"}
              </p>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(103,234,221,0.14)",
                }}
              >
                <div
                  className="h-[2px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--teal), transparent)",
                  }}
                />
                <div className="flex flex-col lg:flex-row">
                  {/* Editorial */}
                  <div className="p-8 flex-1">
                    <h2
                      className="text-[clamp(20px,2.4vw,33px)] font-light leading-snug mb-5"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      The organizations pulling ahead
                      <br />
                      <em
                        className="italic"
                        style={{ color: "var(--teal-mid)" }}
                      >
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

                  <div
                    className="hidden lg:block self-stretch w-px shrink-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.07) 18%, rgba(255,255,255,0.07) 82%, transparent 100%)",
                    }}
                  />

                  {/* Details + CTA */}
                  <div className="p-8 flex flex-col justify-between gap-8 lg:w-72 shrink-0">
                    <div className="space-y-4">
                        {[
                        {
                          label: "Date",
                          value: dateLabel,
                          muted: !hasConfirmedDate,
                        },
                        { label: "Time", value: "Details to follow", muted: true },
                        { label: "Location", value: event.venue },
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
                              color: muted
                                ? "var(--text-muted)"
                                : "var(--text-sec)",
                              fontStyle: muted ? "italic" : "normal",
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <CityPageClient
                      cityKey={slug}
                      cityName={city.city}
                      eventMonth={event.month}
                      eventDate={event.date}
                      eventId={event.id}
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

            {/* Right — other events in this city */}
            {otherCityEvents.length > 0 && (
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
                  <EventTimeline
                    events={city.events}
                    cityKey={slug}
                    activeEventId={event.id}
                    referralParams={isPersonalized ? {
                      guest_name: guestName,
                      rep_name: repName,
                      referred_by: referredBy,
                      referred_by_company: referredByCompany,
                    } : undefined}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, var(--card))",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Browse all markets */}
        <section
          className="mt-16"
          style={{ borderTop: "1px solid var(--teal-line-dark)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 mb-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p
                  className="text-[11px] tracking-[0.22em] uppercase mb-1.5"
                  style={{ color: "var(--teal)" }}
                >
                  Browse by city
                </p>
                <h2
                  className="font-semibold leading-tight"
                  style={{ color: "var(--text)", fontSize: "24px" }}
                >
                  Select a market
                </h2>
              </div>
              <div
                className="flex-1 h-px mb-1.5"
                style={{ background: "var(--teal-line-dark)" }}
              />
            </div>
          </div>
          <RegionAccordion activeCityKey={slug} />
        </section>
      </div>
      <Footer />
    </>
  );
}

