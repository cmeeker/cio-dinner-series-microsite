import type { Event } from "@/data/events";

interface EventTimelineProps {
  events: Event[];
  cityName: string;
}

export default function EventTimeline({ events, cityName }: EventTimelineProps) {
  return (
    <div className="space-y-3">
      <p
        className="text-[10px] tracking-[0.22em] uppercase mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        All evenings in {cityName}
      </p>
      {events.map((event, i) => (
        <div
          key={event.id}
          className="relative flex gap-5 items-start group"
        >
          {/* Timeline line */}
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
              background: i === 0 ? "var(--teal-dim)" : "var(--surface)",
              border: `1px solid ${i === 0 ? "var(--teal-line)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <span
              className="text-[10px] font-medium"
              style={{ color: i === 0 ? "var(--teal)" : "var(--text-muted)" }}
            >
              {i + 1}
            </span>
          </div>

          {/* Content */}
          <div
            className="flex-1 pb-4 transition-colors duration-200"
            style={{
              borderBottom:
                i < events.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
          >
            <p
              className="text-[14px] font-medium mb-1"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "17px",
                color: i === 0 ? "var(--teal)" : "var(--text-sec)",
              }}
            >
              {event.month}
            </p>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {event.venue}
            </p>
            {i === 0 && (
              <span
                className="inline-flex items-center gap-1.5 mt-2 text-[10px] tracking-[0.1em] uppercase"
                style={{ color: "var(--teal)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--teal)" }}
                />
                Next upcoming
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
