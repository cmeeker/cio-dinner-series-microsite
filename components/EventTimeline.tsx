import Link from "next/link";
import type { Event } from "@/data/events";
import { formatEventDateCompact, getEventUrlSlug, isEventPast } from "@/lib/event-utils";

interface EventTimelineProps {
  events: Event[];
  cityKey: string;
  activeEventId?: number;
  /** Referral/personalization params to forward when navigating between events */
  referralParams?: Record<string, string | undefined>;
}

export default function EventTimeline({
  events,
  cityKey,
  activeEventId,
  referralParams,
}: EventTimelineProps) {
  const qs = referralParams
    ? (() => {
        const p = new URLSearchParams();
        for (const [k, v] of Object.entries(referralParams)) {
          if (v) p.set(k, v);
        }
        const s = p.toString();
        return s ? `?${s}` : "";
      })()
    : "";
  return (
    <div className="space-y-3">
      {events.map((event, i) => {
        const isActive = event.id === activeEventId;
        const isPast = isEventPast(event);
        const isUpcoming = !activeEventId && i === 0 && !isPast;
        const eventUrlSlug = getEventUrlSlug(event);

        const rowContent = (
          <>
            {i < events.length - 1 && (
              <div
                className="absolute left-[15px] top-8 bottom-0 w-px"
                style={{
                  background: isPast
                    ? "rgba(255,255,255,0.04)"
                    : "linear-gradient(to bottom, var(--teal-line-dark), transparent)",
                }}
              />
            )}

            {/* Dot */}
            <div
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
              style={{
                background: isPast
                  ? "transparent"
                  : isActive
                  ? "var(--teal)"
                  : isUpcoming
                  ? "var(--teal-dim)"
                  : "var(--surface)",
                border: `1px solid ${
                  isPast
                    ? "rgba(255,255,255,0.06)"
                    : isActive
                    ? "var(--teal)"
                    : isUpcoming
                    ? "var(--teal-line)"
                    : "rgba(255,255,255,0.06)"
                }`,
                opacity: isPast ? 0.4 : 1,
              }}
            >
              <span
                className="text-[10px] font-medium"
                style={{
                  color: isPast
                    ? "var(--text-muted)"
                    : isActive
                    ? "#111010"
                    : isUpcoming
                    ? "var(--teal)"
                    : "var(--text-muted)",
                }}
              >
                {i + 1}
              </span>
            </div>

            {/* Content */}
            <div
              className="flex-1 pb-4"
              style={{
                borderBottom:
                  i < events.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                opacity: isPast ? 0.38 : 1,
              }}
            >
              <p
                className="mb-0.5 font-medium"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "17px",
                  color: isPast
                    ? "var(--text-muted)"
                    : isActive || isUpcoming
                    ? "var(--teal)"
                    : "var(--text-sec)",
                }}
              >
                {event.month}
                {event.dateConfirmed && event.date && (
                  <span
                    className="ml-2 text-[12px] font-normal"
                    style={{ color: "var(--text-muted)", fontFamily: "inherit" }}
                  >
                    · {formatEventDateCompact(event.date)}
                  </span>
                )}
              </p>
              <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                {event.venue}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                {!isActive && !isPast && (
                  <span
                    className="text-[10px] tracking-[0.06em] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--teal)" }}
                  >
                    View this evening →
                  </span>
                )}
              </div>
            </div>
          </>
        );

        if (isPast) {
          return (
            <div
              key={event.id}
              className="relative flex gap-5 items-start cursor-default"
            >
              {rowContent}
            </div>
          );
        }

        return !isActive ? (
          <Link
            key={event.id}
            href={`/${cityKey}/${eventUrlSlug}${qs}`}
            className="relative flex gap-5 items-start group cursor-pointer"
          >
            {rowContent}
          </Link>
        ) : (
          <div
            key={event.id}
            className="relative flex gap-5 items-start group"
          >
            {rowContent}
          </div>
        );
      })}
    </div>
  );
}
