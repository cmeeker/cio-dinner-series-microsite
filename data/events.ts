export interface Event {
  id: number;
  cityKey: string;
  city: string;
  state: string;
  country: string;
  month: string;
  sortKey: number;
  venue: string;
}

export interface City {
  key: string;
  city: string;
  state: string;
  country: string;
  events: Event[];
}

export const EVENTS: Event[] = [
  // May 2026 — all 10 cities
  { id: 1,  cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining room, SoMa — San Francisco" },
  { id: 2,  cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining, Flatiron / SoHo" },
  { id: 3,  cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining room, West Loop" },
  { id: 4,  cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Back Bay" },
  { id: 5,  cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, South Congress" },
  { id: 6,  cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Capitol Hill" },
  { id: 7,  cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Midtown Atlanta" },
  { id: 8,  cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Reston Town Center" },
  { id: 9,  cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining room, Grapevine" },
  { id: 10, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "May 2026",       sortKey: 202605, venue: "Private venue, King West" },

  // June 2026 — all 10 cities
  { id: 11, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private venue, Downtown San Jose — Silicon Valley" },
  { id: 12, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Midtown" },
  { id: 13, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private venue, Fulton Market" },
  { id: 14, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Kendall Square" },
  { id: 15, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, East Austin" },
  { id: 16, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, South Lake Union" },
  { id: 17, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Buckhead" },
  { id: 18, cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Georgetown" },
  { id: 19, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private venue, Plano" },
  { id: 20, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Yorkville" },

  // July 2026 — all 10 cities
  { id: 21, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private dining room, Oakland — East Bay" },
  { id: 22, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, Tribeca" },
  { id: 23, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private dining room, The Loop" },
  { id: 24, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, South End" },
  { id: 25, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, The Domain" },
  { id: 26, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, Eastside / Bellevue" },
  { id: 27, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, West Midtown" },
  { id: 28, cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, Tysons Corner" },
  { id: 29, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private dining room, Uptown Dallas" },
  { id: 30, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "July 2026",      sortKey: 202607, venue: "Private venue, Financial District" },

  // August 2026 — 5 cities
  { id: 31, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private venue, Mission Bay — San Francisco" },
  { id: 32, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private dining room, Park Avenue" },
  { id: 33, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private venue, South Congress" },
  { id: 34, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private venue, Grapevine or Uptown Dallas" },
  { id: 35, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private dining room, Midtown Atlanta" },

  // September 2026 — 5 cities
  { id: 36, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Gold Coast" },
  { id: 37, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Seaport District" },
  { id: 38, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, South Lake Union" },
  { id: 39, cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Arlington or Reston" },
  { id: 40, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "September 2026", sortKey: 202609, venue: "Private dining room, Financial District or King West" },

  // October 2026 — all 10 cities
  { id: 41, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Palo Alto — Peninsula" },
  { id: 42, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining, SoHo or Tribeca" },
  { id: 43, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining, West Loop" },
  { id: 44, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Back Bay / Kendall Square" },
  { id: 45, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Downtown Austin" },
  { id: 46, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Capitol Hill" },
  { id: 47, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Buckhead" },
  { id: 48, cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Downtown DC" },
  { id: 49, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Legacy West" },
  { id: 50, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "October 2026",   sortKey: 202610, venue: "Private venue, Yorkville" },

  // November 2026 — all 10 cities
  { id: 51, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Premier private dining room, Pacific Heights — San Francisco" },
  { id: 52, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "November 2026",  sortKey: 202611, venue: "Premier private dining room, Midtown" },
  { id: 53, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private venue, Streeterville" },
  { id: 54, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Seaport District" },
  { id: 55, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private venue, South Congress" },
  { id: 56, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Eastside / Bellevue" },
  { id: 57, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Inman Park" },
  { id: 58, cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Capitol Hill area" },
  { id: 59, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private venue, Knox-Henderson" },
  { id: 60, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Yorkville" },

  // December 2026 — 5 cities
  { id: 61, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "December 2026",  sortKey: 202612, venue: "Premier restaurant, Financial District — San Francisco" },
  { id: 62, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "December 2026",  sortKey: 202612, venue: "Premier restaurant, Midtown" },
  { id: 63, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "December 2026",  sortKey: 202612, venue: "Private dining room, Gold Coast" },
  { id: 64, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "December 2026",  sortKey: 202612, venue: "Premier restaurant, Boston" },
  { id: 65, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "December 2026",  sortKey: 202612, venue: "Private venue, The Domain" },

  // January 2027 — 5 cities
  { id: 66, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, South Lake Union" },
  { id: 67, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, Midtown Atlanta" },
  { id: 68, cityKey: "washington-dc",   city: "Washington, DC / NoVA", state: "DC", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, Reston Town Center" },
  { id: 69, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private dining room, Uptown Dallas" },
  { id: 70, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "January 2027",   sortKey: 202701, venue: "Private venue, King West" },
];

export const CITY_COPY: Record<string, string> = {
  "bay-area":
    "The Bay Area built the tools now running through every enterprise on the planet. The organizations winning here didn't just deploy AI first — they figured out how to own it across teams, vendors, and workflows. Join Workato leadership for an off-the-record dinner on what deliberate AI governance looks like in practice, and how the leaders pulling ahead got there.",
  "new-york":
    "Financial services moved faster than any sector when AI promised an edge. The firms that are ahead now aren't just the ones that moved first — they're the ones that built the governance layer to match the pace. Join Workato leadership for an off-the-record dinner on how enterprise leaders are making deliberate decisions about how AI moves through their organizations.",
  "chicago":
    "Across financial services, professional services, and manufacturing, the enterprises pulling ahead aren't just deploying more AI — they're the ones who decided early how to govern it across systems, teams, and vendors. Join Workato leadership for an off-the-record dinner on what those decisions look like, and how to get ahead of the question before it gets ahead of you.",
  "boston":
    "Life sciences and enterprise tech share a common reality: the margin for error is low, and the pace of AI adoption isn't slowing down. The organizations pulling ahead built their governance posture deliberately, not reactively. Join Workato leadership for an off-the-record dinner on how enterprise leaders are making those decisions now.",
  "austin":
    "Austin's enterprise scene is one of the fastest-moving in the country. The companies that will define the next few years aren't just the ones deploying AI most aggressively — they're the ones who paired that speed with a clear answer to who owns it. Join Workato leadership for an off-the-record dinner on how the leaders pulling ahead got there.",
  "seattle-bellevue":
    "Cloud-native organizations understand better than most that the right infrastructure decision, made early, compounds over years. How you govern AI across your organization is that kind of decision. Join Workato leadership for an off-the-record dinner on what the enterprises pulling ahead chose, and how they made it work.",
  "atlanta":
    "The Southeast is moving fast, and the gap between enterprises that have a deliberate AI posture and those still figuring it out is starting to show. Join Workato leadership for an off-the-record dinner on how enterprise leaders across the region are making proactive decisions about how AI moves through their organizations — and what separates the ones pulling ahead.",
  "washington-dc":
    "In the DC corridor, the enterprises pulling ahead aren't just deploying AI — they built the governance, auditability, and accountability layer to go with it. That's not a coincidence. Join Workato leadership for an off-the-record dinner on the deliberate decisions enterprise leaders in regulated and government-adjacent markets are making about how their organizations use AI.",
  "dallas":
    "DFW's enterprise market spans some of the most operationally complex organizations anywhere. The ones pulling ahead share something in common: they made intentional decisions about how AI moves through the enterprise, before the complexity made it harder. Join Workato leadership for an off-the-record dinner on what those decisions look like.",
  "toronto":
    "Canadian enterprises are navigating AI adoption under a shifting regulatory environment — and the organizations pulling ahead aren't waiting for the rules to finalize. They're building governance posture now. Join Workato leadership for an off-the-record dinner on the deliberate decisions enterprise leaders are making about how their companies use AI.",
};

export const DEFAULT_COPY =
  "They made deliberate decisions about how AI moves through their organization — who owns it, how it's governed, where it's trusted. Most enterprises are still catching up. Join Workato leadership for an off-the-record dinner on what those decisions look like in practice, and how enterprise leaders are getting ahead of the governance question before it gets ahead of them.";

export const REGIONS: Record<string, string[]> = {
  "West Coast & Pacific Northwest": ["bay-area", "seattle-bellevue"],
  "Northeast": ["new-york", "boston", "washington-dc"],
  "Midwest": ["chicago"],
  "South & Texas": ["austin", "dallas", "atlanta"],
  "Canada": ["toronto"],
};

export function buildCityMap(): Record<string, City> {
  const map: Record<string, City> = {};
  for (const event of EVENTS) {
    if (!map[event.cityKey]) {
      map[event.cityKey] = {
        key: event.cityKey,
        city: event.city,
        state: event.state,
        country: event.country,
        events: [],
      };
    }
    map[event.cityKey].events.push(event);
  }
  for (const city of Object.values(map)) {
    city.events.sort((a, b) => a.sortKey - b.sortKey);
  }
  return map;
}

export const CITIES = buildCityMap();

export const CITY_ORDER = (() => {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const e of EVENTS) {
    if (!seen.has(e.cityKey)) {
      seen.add(e.cityKey);
      order.push(e.cityKey);
    }
  }
  return order;
})();
