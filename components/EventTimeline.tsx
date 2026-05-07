import Link from "next/link";
import type { Event } from "@/data/events";
import { formatEventDateCompact } from "@/lib/event-utils";

interface EventTimelineProps {
  events: Event[];
  cityKey: string;
  activeEventId?: number;
}

export default function EventTimeline({
  events,
  cityKey,
  activeEventId,
}: EventTimelineProps) {
  return (
    <div className="space-y-3">
      {events.map((event, i) => {
        const isActive = event.id === activeEventId;
        const hasPage = !!event.date;
        const Wrapper = hasPage
          ? ({ children }: { children: React.ReactNode }) => (
              <Link
                href={`/${cityKey}/${event.date}`}
                className="flex-1 pb-4 block transition-colors duration-200 group/item"
                style={{
                  borderBottom:
                    i < events.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                {children}
              </Link>
            )
          : ({ children }: { children: React.ReactNode }) => (
              <div
                className="flex-1 pb-4"
                style={{
                  borderBottom:
                    i < events.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                {children}
              </div>
            );

        return (
          <div key={event.id} className="relative flex gap-5 items-start group">
            {i < events.length - 1 && (
              <div
                className="absolute left-[15px] top-8 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--teal-line-dark), transparent)",
                }}
              />
            )}

            {/* Dot */}
            <div
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
              style={{
                background: isActive
                  ? "var(--teal)"
                  : i === 0
                  ? "var(--teal-dim)"
                  : "var(--surface)",
                border: `1px solid ${
                  isActive
                    ? "var(--teal)"
                    : i === 0
                    ? "var(--teal-line)"
                    : "rgba(255,255,255,0.06)"
                }`,
              }}
            >
              <span
                className="text-[10px] font-medium"
                style={{
                  color: isActive
                    ? "#111010"
                    : i === 0
                    ? "var(--teal)"
                    : "var(--text-muted)",
                }}
              >
                {i + 1}
              </span>
            </div>

            {/* Content */}
            <Wrapper>
              <p
                className="text-[14px] font-medium mb-0.5"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "17px",
                  color: isActive
                    ? "var(--text)"
                    : i === 0
                    ? "var(--teal)"
                    : "var(--text-sec)",
                }}
              >
                {event.month}
                {event.date && (
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
              <div className="flex items-center gap-3 mt-2">
                {isActive && (
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    You are here
                  </span>
                )}
                {!isActive && i === 0 && !activeEventId && (
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase"
                    style={{ color: "var(--teal)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: "var(--teal)" }}
                    />
                    Next upcoming
                  </span>
                )}
                {hasPage && !isActive && (
                  <span
                    className="text-[10px] tracking-[0.08em] uppercase opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--teal)" }}
                  >
                    View dinner →
                  </span>
                )}
                {event.dateConfirmed && (
                  <span
                    className="text-[9px] tracking-[0.1em] uppercase"
                    style={{ color: "rgba(103,234,221,0.45)" }}
                  >
                    · confirmed
                  </span>
                )}
              </div>
            </Wrapper>
          </div>
        );
      })}
    </div>
  );
}
