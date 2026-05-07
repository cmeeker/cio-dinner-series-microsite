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
