/**
 * Date helpers for event pages.
 * Uses local-date construction (year, month-1, day) to avoid UTC offset issues
 * since all dates are stored as calendar dates (YYYY-MM-DD), not instants.
 */

export function formatEventDate(
  isoDate: string,
  opts: { weekday?: boolean; year?: boolean } = { weekday: true, year: true }
): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    ...(opts.weekday ? { weekday: "long" } : {}),
    month: "long",
    day: "numeric",
    ...(opts.year !== false ? { year: "numeric" } : {}),
  });
}

/** "2026-06-09" → "June 9, 2026" */
export function formatEventDateShort(isoDate: string): string {
  return formatEventDate(isoDate, { weekday: false, year: true });
}

/** "2026-06-09" → "Jun 9" */
export function formatEventDateCompact(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** "2026-06-09" → "Tuesday" */
export function formatEventWeekday(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

/**
 * Returns true when an event's date has passed.
 * "Passed" = the event date is before today local time.
 * Events on today's date are still considered upcoming.
 * Events with no confirmed date (TBD) are never marked past.
 */
export function isEventPast(event: { date?: string }): boolean {
  if (!event.date) return false;
  const [y, m, d] = event.date.split("-").map(Number);
  const eventDate = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

/**
 * Returns the URL date segment for an event:
 * - Full ISO date "2026-06-09" when the event has a known date
 * - Year-month "2026-06" (from sortKey) when the date is TBD
 *
 * This keeps URLs stable even before dates are confirmed, and avoids
 * collisions since each city has at most one event per calendar month.
 */
export function getEventUrlSlug(event: {
  date?: string;
  sortKey: number;
}): string {
  if (event.date) return event.date;
  const s = event.sortKey.toString(); // e.g. "202608"
  return `${s.slice(0, 4)}-${s.slice(4, 6)}`; // "2026-08"
}
