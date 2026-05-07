export interface Event {
  id: number;
  cityKey: string;
  city: string;
  state: string;
  country: string;
  month: string;
  sortKey: number;
  venue: string;
  /** ISO date from spreadsheet (confirmed if available, else suggested). Used as URL slug. */
  date?: string;
  dateConfirmed?: boolean;
}

export interface City {
  key: string;
  city: string;
  state: string;
  country: string;
  events: Event[];
}

export const EVENTS: Event[] = [
  // April 2026
  { id: 71, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "April 2026",     sortKey: 202604, venue: "Private dining room, Lake Forest",                           date: "2026-04-30", dateConfirmed: true  },

  // May 2026
  { id: 1,  cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "May 2026",       sortKey: 202605, venue: "San Francisco Giants Suite",                                 date: "2026-05-04", dateConfirmed: true  },
  { id: 2,  cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining, Flatiron / SoHo" },
  { id: 3,  cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining room, West Loop" },
  { id: 4,  cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Back Bay",                                    date: "2026-05-26", dateConfirmed: false },
  { id: 5,  cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, South Congress",                              date: "2026-05-27", dateConfirmed: false },
  { id: 6,  cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Capitol Hill" },
  { id: 7,  cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Midtown Atlanta" },
  { id: 8,  cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private venue, Reston Town Center" },
  { id: 9,  cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "May 2026",       sortKey: 202605, venue: "Private dining room, Grapevine" },
  { id: 10, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "May 2026",       sortKey: 202605, venue: "Private venue, King West" },

  // June 2026
  { id: 11, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "June 2026",      sortKey: 202606, venue: "San Francisco - Partner",                                    date: "2026-06-02", dateConfirmed: true  },
  { id: 12, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Midtown",                               date: "2026-06-10", dateConfirmed: false },
  { id: 13, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private venue, Fulton Market",                               date: "2026-06-09", dateConfirmed: false },
  { id: 14, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Red Sox Suite",                                              date: "2026-06-29", dateConfirmed: true  },
  { id: 15, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, East Austin",                           date: "2026-06-17", dateConfirmed: false },
  { id: 16, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, South Lake Union",                      date: "2026-06-16", dateConfirmed: false },
  { id: 17, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Buckhead" },
  { id: 18, cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Georgetown" },
  { id: 19, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Uptown Dallas",                         date: "2026-06-23", dateConfirmed: false },
  { id: 20, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "June 2026",      sortKey: 202606, venue: "Private dining room, Yorkville",                             date: "2026-06-24", dateConfirmed: false },
  { id: 72, cityKey: "los-angeles",     city: "Los Angeles",           state: "CA", country: "US", month: "June 2026",      sortKey: 202606, venue: "Private dining room, West Hollywood",                        date: "2026-06-11", dateConfirmed: false },

  // July 2026
  { id: 21, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private dining room, Oakland — East Bay",                    date: "2026-07-15", dateConfirmed: false },
  { id: 22, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, Tribeca",                                     date: "2026-07-16", dateConfirmed: false },
  { id: 23, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private dining room, The Loop",                              date: "2026-07-14", dateConfirmed: false },
  { id: 24, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, South End",                                   date: "2026-07-22", dateConfirmed: false },
  { id: 25, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, The Domain",                                  date: "2026-07-14", dateConfirmed: false },
  { id: 26, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, Eastside / Bellevue" },
  { id: 27, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, West Midtown",                                date: "2026-07-22", dateConfirmed: false },
  { id: 28, cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, Tysons Corner",                               date: "2026-07-23", dateConfirmed: false },
  { id: 29, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private dining room, Uptown Dallas" },
  { id: 30, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "July 2026",      sortKey: 202607, venue: "Private venue, Financial District" },
  { id: 73, cityKey: "denver",          city: "Denver",                state: "CO", country: "US", month: "July 2026",      sortKey: 202607, venue: "Private venue, RiNo / LoDo",                                 date: "2026-07-07", dateConfirmed: false },

  // August 2026
  { id: 31, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private venue, Mission Bay — San Francisco",                 date: "2026-08-12", dateConfirmed: false },
  { id: 32, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private dining room, Park Avenue",                           date: "2026-08-13", dateConfirmed: false },
  { id: 33, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private venue, South Congress",                              date: "2026-08-18", dateConfirmed: false },
  { id: 34, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private dining room, Legacy West / Plano",                   date: "2026-08-26", dateConfirmed: false },
  { id: 35, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private dining room, Midtown Atlanta" },
  { id: 74, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "August 2026",    sortKey: 202608, venue: "Private venue, Eastside / Kirkland",                         date: "2026-08-04", dateConfirmed: false },

  // September 2026
  { id: 36, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Gold Coast",                           date: "2026-09-15", dateConfirmed: false },
  { id: 37, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Seaport District",                     date: "2026-09-16", dateConfirmed: false },
  { id: 38, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, South Lake Union" },
  { id: 39, cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Arlington or Reston",                  date: "2026-09-22", dateConfirmed: false },
  { id: 40, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "September 2026", sortKey: 202609, venue: "Private dining room, Financial District or King West",      date: "2026-09-23", dateConfirmed: false },
  { id: 75, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Buckhead",                             date: "2026-09-10", dateConfirmed: false },
  { id: 76, cityKey: "los-angeles",     city: "Los Angeles",           state: "CA", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Santa Monica",                         date: "2026-09-29", dateConfirmed: false },
  { id: 77, cityKey: "raleigh-rtp",     city: "Raleigh / RTP",         state: "NC", country: "US", month: "September 2026", sortKey: 202609, venue: "Private dining room, Research Triangle Park",               date: "2026-09-08", dateConfirmed: false },

  // October 2026
  { id: 41, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Palo Alto — Peninsula",                date: "2026-10-14", dateConfirmed: false },
  { id: 42, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining, SoHo or Tribeca",                           date: "2026-10-15", dateConfirmed: false },
  { id: 43, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining, West Loop",                                  date: "2026-10-13", dateConfirmed: false },
  { id: 44, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Back Bay / Kendall Square",                   date: "2026-10-08", dateConfirmed: false },
  { id: 45, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Downtown Austin",                       date: "2026-10-07", dateConfirmed: false },
  { id: 46, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Capitol Hill",                                date: "2026-10-20", dateConfirmed: false },
  { id: 47, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Buckhead" },
  { id: 48, cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private venue, Downtown DC" },
  { id: 49, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Southlake Town Square",                 date: "2026-10-22", dateConfirmed: false },
  { id: 50, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "October 2026",   sortKey: 202610, venue: "Private venue, Yorkville" },
  { id: 78, cityKey: "denver",          city: "Denver",                state: "CO", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, LoDo / RiNo",                           date: "2026-10-28", dateConfirmed: false },
  { id: 79, cityKey: "houston",         city: "Houston",               state: "TX", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Uptown Houston",                        date: "2026-10-06", dateConfirmed: false },
  { id: 80, cityKey: "minneapolis",     city: "Minneapolis",           state: "MN", country: "US", month: "October 2026",   sortKey: 202610, venue: "Private dining room, Downtown Minneapolis",                  date: "2026-10-27", dateConfirmed: false },

  // November 2026
  { id: 51, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Premier private dining room, Pacific Heights — SF",          date: "2026-11-18", dateConfirmed: false },
  { id: 52, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "November 2026",  sortKey: 202611, venue: "Premier private dining room, Midtown",                       date: "2026-11-19", dateConfirmed: false },
  { id: 53, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private venue, Streeterville",                               date: "2026-11-17", dateConfirmed: false },
  { id: 54, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Seaport District",                      date: "2026-11-05", dateConfirmed: false },
  { id: 55, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private venue, South Congress",                              date: "2026-11-04", dateConfirmed: false },
  { id: 56, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Eastside / Bellevue" },
  { id: 57, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Inman Park",                            date: "2026-11-10", dateConfirmed: false },
  { id: 58, cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Capitol Hill area",                     date: "2026-11-12", dateConfirmed: false },
  { id: 59, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private venue, Knox-Henderson" },
  { id: 60, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Yorkville",                             date: "2026-11-12", dateConfirmed: false },
  { id: 81, cityKey: "los-angeles",     city: "Los Angeles",           state: "CA", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, El Segundo / Manhattan Beach",          date: "2026-11-06", dateConfirmed: false },
  { id: 82, cityKey: "phoenix",         city: "Phoenix",               state: "AZ", country: "US", month: "November 2026",  sortKey: 202611, venue: "Private dining room, Old Town Scottsdale",                   date: "2026-11-03", dateConfirmed: false },

  // December 2026
  { id: 61, cityKey: "bay-area",        city: "Bay Area",              state: "CA", country: "US", month: "December 2026",  sortKey: 202612, venue: "Premier restaurant, Financial District — SF",                date: "2026-12-10", dateConfirmed: false },
  { id: 62, cityKey: "new-york",        city: "New York",              state: "NY", country: "US", month: "December 2026",  sortKey: 202612, venue: "Premier restaurant, Midtown",                                date: "2026-12-09", dateConfirmed: false },
  { id: 63, cityKey: "chicago",         city: "Chicago",               state: "IL", country: "US", month: "December 2026",  sortKey: 202612, venue: "Private dining room, Gold Coast",                           date: "2026-12-08", dateConfirmed: false },
  { id: 64, cityKey: "boston",          city: "Boston",                state: "MA", country: "US", month: "December 2026",  sortKey: 202612, venue: "Premier restaurant, Boston",                                 date: "2026-12-03", dateConfirmed: false },
  { id: 65, cityKey: "austin",          city: "Austin",                state: "TX", country: "US", month: "December 2026",  sortKey: 202612, venue: "Private venue, The Domain",                                  date: "2026-12-01", dateConfirmed: false },

  // January 2027
  { id: 66, cityKey: "seattle-bellevue",city: "Seattle / Bellevue",    state: "WA", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, South Lake Union",                            date: "2027-01-13", dateConfirmed: false },
  { id: 67, cityKey: "atlanta",         city: "Atlanta",               state: "GA", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, Midtown Atlanta" },
  { id: 68, cityKey: "washington-dc",   city: "DC / NoVA",             state: "DC", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, Reston Town Center" },
  { id: 69, cityKey: "dallas",          city: "Dallas / Fort Worth",   state: "TX", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private dining room, Uptown Dallas",                         date: "2027-01-20", dateConfirmed: false },
  { id: 70, cityKey: "toronto",         city: "Toronto",               state: "ON", country: "CA", month: "January 2027",   sortKey: 202701, venue: "Private venue, King West",                                   date: "2027-01-21", dateConfirmed: false },
  { id: 83, cityKey: "denver",          city: "Denver",                state: "CO", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private venue, Cherry Creek",                                date: "2027-01-28", dateConfirmed: false },
  { id: 84, cityKey: "los-angeles",     city: "Los Angeles",           state: "CA", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private dining room, Downtown LA",                           date: "2027-01-27", dateConfirmed: false },
  { id: 85, cityKey: "miami",           city: "Miami",                 state: "FL", country: "US", month: "January 2027",   sortKey: 202701, venue: "Private dining room, Brickell",                              date: "2027-01-26", dateConfirmed: false },
];

export const CITY_COPY: Record<string, string> = {
  "bay-area":
    "The Bay Area built the infrastructure running through every enterprise on the planet. The organizations winning here didn't just move fast on AI — they built the governance layer to own it. Join Workato leadership for an off-the-record dinner on what deliberate AI governance looks like in practice.",
  "new-york":
    "The firms pulling ahead in financial services aren't just the ones that moved first on AI — they're the ones that built the accountability layer to match. Join Workato leadership for an off-the-record dinner on how enterprise leaders are governing AI before the complexity demands it.",
  "chicago":
    "Across financial services, professional services, and manufacturing, the enterprises ahead aren't deploying more AI — they decided early how to govern it. Join Workato leadership for an off-the-record dinner on what that looks like in practice.",
  "boston":
    "In life sciences and enterprise tech, the margin for error is low and AI adoption isn't slowing. The organizations ahead built their governance posture deliberately. Join Workato leadership for an off-the-record dinner on how enterprise leaders are making those decisions now.",
  "austin":
    "The companies defining Austin's next chapter aren't just the fastest to deploy AI — they paired that speed with a clear answer to who owns it. Join Workato leadership for an off-the-record dinner on how the leaders pulling ahead got there.",
  "seattle-bellevue":
    "Cloud-native organizations understand that the right infrastructure decision, made early, compounds over years. AI governance is that kind of decision. Join Workato leadership for an off-the-record dinner on what the enterprises pulling ahead chose.",
  "atlanta":
    "The gap between enterprises with a deliberate AI posture and those still figuring it out is starting to show across the Southeast. Join Workato leadership for an off-the-record dinner on the decisions that separate them.",
  "washington-dc":
    "In the DC corridor, the enterprises ahead didn't just deploy AI — they built the governance, auditability, and accountability layer alongside it. Join Workato leadership for an off-the-record dinner on how leaders in regulated markets are making those decisions.",
  "dallas":
    "The organizations pulling ahead in DFW made intentional decisions about how AI moves through the enterprise — before the operational complexity made it harder. Join Workato leadership for an off-the-record dinner on what that looks like.",
  "toronto":
    "Canadian enterprises aren't waiting for the regulatory environment to finalize before building their AI governance posture. Join Workato leadership for an off-the-record dinner on the deliberate decisions enterprise leaders are making now.",
  "los-angeles":
    "LA's enterprise leaders are navigating AI adoption across media, entertainment, tech, and healthcare — industries where the stakes for getting governance wrong are high. Join Workato leadership for an off-the-record dinner on the decisions that matter most right now.",
  "denver":
    "Denver's tech and energy sectors are moving fast on AI, and the enterprises ahead are the ones that paired that speed with a clear governance framework. Join Workato leadership for an off-the-record dinner on how leaders in the Mountain West are making those decisions.",
  "houston":
    "Energy, healthcare, and industrials — the enterprises shaping Houston's economy made deliberate decisions about AI governance before the complexity demanded it. Join Workato leadership for an off-the-record dinner on what that looks like in practice.",
  "minneapolis":
    "Across healthcare systems, financial services, and retail, Minneapolis enterprises are making the governance decisions now that will separate leaders from laggards. Join Workato leadership for an off-the-record dinner on what those decisions look like.",
  "raleigh-rtp":
    "The Research Triangle's life sciences and enterprise tech ecosystem moves fast — and the organizations ahead built their AI governance posture before the regulatory environment demanded it. Join Workato leadership for an off-the-record dinner on how leaders are making those calls.",
  "phoenix":
    "Arizona's fastest-growing enterprises didn't just adopt AI early — they built the accountability layer to match. Join Workato leadership for an off-the-record dinner on how enterprise leaders in the Southwest are governing AI before the complexity outpaces them.",
  "miami":
    "Miami's rise as a tech and financial hub means enterprise leaders are navigating AI adoption at speed. The organizations ahead built their governance posture deliberately. Join Workato leadership for an off-the-record dinner on what that looks like in practice.",
};

export const DEFAULT_COPY =
  "The enterprises pulling ahead made deliberate decisions about how AI moves through their organization — who owns it, how it's governed, where it's trusted. Join Workato leadership for an off-the-record dinner on what those decisions look like in practice.";

export const REGIONS: Record<string, string[]> = {
  "West Coast": ["bay-area", "los-angeles", "seattle-bellevue"],
  "Northeast": ["new-york", "boston"],
  "Mid-Atlantic": ["washington-dc", "raleigh-rtp"],
  "Midwest": ["chicago", "minneapolis"],
  "South & Texas": ["austin", "dallas", "houston", "atlanta"],
  "Mountain West": ["denver", "phoenix"],
  "Canada": ["toronto"],
  "Southeast": ["miami"],
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

/** Build a lookup: `"chicago::2026-06-09"` → Event */
export const EVENT_BY_DATE_KEY: Record<string, Event> = Object.fromEntries(
  EVENTS.filter((e) => e.date).map((e) => [`${e.cityKey}::${e.date}`, e])
);
