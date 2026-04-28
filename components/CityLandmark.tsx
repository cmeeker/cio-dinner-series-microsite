interface LandmarkProps {
  className?: string;
}

const sharedProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: "1.5",
};

// Bay Area — Golden Gate Bridge
export function BayAreaLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 140 80" className={className} {...sharedProps}>
      {/* Left tower */}
      <line x1="28" y1="68" x2="28" y2="14" />
      <line x1="36" y1="68" x2="36" y2="14" />
      <line x1="26" y1="28" x2="38" y2="28" />
      <line x1="26" y1="40" x2="38" y2="40" />
      <line x1="26" y1="16" x2="38" y2="16" />
      {/* Right tower */}
      <line x1="104" y1="68" x2="104" y2="14" />
      <line x1="112" y1="68" x2="112" y2="14" />
      <line x1="102" y1="28" x2="114" y2="28" />
      <line x1="102" y1="40" x2="114" y2="40" />
      <line x1="102" y1="16" x2="114" y2="16" />
      {/* Main cables */}
      <path d="M28,16 Q70,44 112,16" />
      <path d="M28,16 Q70,52 112,16" strokeOpacity="0.4" />
      {/* Hangers */}
      <line x1="52" y1="62" x2="51" y2="36" strokeOpacity="0.5" />
      <line x1="64" y1="62" x2="64" y2="44" strokeOpacity="0.5" />
      <line x1="76" y1="62" x2="76" y2="48" strokeOpacity="0.5" />
      <line x1="88" y1="62" x2="88" y2="44" strokeOpacity="0.5" />
      {/* Road deck */}
      <line x1="12" y1="62" x2="128" y2="62" />
      {/* Water */}
      <path d="M8,72 Q25,68 42,72 Q59,76 76,72 Q93,68 110,72 Q127,76 136,72" strokeOpacity="0.35" />
    </svg>
  );
}

// New York — Empire State Building
export function NewYorkLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 110" className={className} {...sharedProps}>
      {/* Base */}
      <rect x="10" y="80" width="60" height="18" rx="1" />
      {/* Step 1 */}
      <rect x="18" y="62" width="44" height="20" />
      {/* Step 2 */}
      <rect x="24" y="48" width="32" height="16" />
      {/* Step 3 */}
      <rect x="28" y="36" width="24" height="14" />
      {/* Step 4 */}
      <rect x="32" y="26" width="16" height="12" />
      {/* Spire base */}
      <rect x="36" y="18" width="8" height="10" />
      {/* Antenna */}
      <line x1="40" y1="18" x2="40" y2="4" />
      {/* Windows hint */}
      <line x1="36" y1="70" x2="36" y2="82" strokeOpacity="0.4" />
      <line x1="44" y1="70" x2="44" y2="82" strokeOpacity="0.4" />
    </svg>
  );
}

// Chicago — Willis Tower
export function ChicagoLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 110" className={className} {...sharedProps}>
      {/* Main tower body */}
      <rect x="16" y="20" width="48" height="82" />
      {/* Left setback (steps down at ~60%) */}
      <rect x="16" y="38" width="20" height="64" />
      {/* Right setback */}
      <rect x="44" y="38" width="20" height="64" />
      {/* Mid setbacks */}
      <line x1="36" y1="38" x2="36" y2="102" strokeOpacity="0.4" />
      <line x1="44" y1="38" x2="44" y2="102" strokeOpacity="0.4" />
      {/* Twin antennas */}
      <line x1="28" y1="20" x2="28" y2="6" />
      <line x1="52" y1="20" x2="52" y2="6" />
      {/* Window grid hint */}
      <line x1="40" y1="20" x2="40" y2="102" strokeOpacity="0.25" />
    </svg>
  );
}

// Boston — Custom House Clock Tower
export function BostonLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 110" className={className} {...sharedProps}>
      {/* Base building */}
      <rect x="8" y="64" width="64" height="38" />
      {/* Colonnade hint */}
      <line x1="20" y1="64" x2="20" y2="76" strokeOpacity="0.4" />
      <line x1="32" y1="64" x2="32" y2="76" strokeOpacity="0.4" />
      <line x1="48" y1="64" x2="48" y2="76" strokeOpacity="0.4" />
      <line x1="60" y1="64" x2="60" y2="76" strokeOpacity="0.4" />
      {/* Tower shaft */}
      <rect x="28" y="30" width="24" height="36" />
      {/* Clock face */}
      <circle cx="40" cy="46" r="8" />
      <line x1="40" y1="40" x2="40" y2="46" strokeOpacity="0.7" />
      <line x1="40" y1="46" x2="45" y2="46" strokeOpacity="0.7" />
      {/* Pyramid top */}
      <path d="M28,30 L40,12 L52,30" />
      {/* Finial */}
      <line x1="40" y1="12" x2="40" y2="5" />
    </svg>
  );
}

// Austin — Texas State Capitol
export function AustinLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 120 110" className={className} {...sharedProps}>
      {/* Steps */}
      <rect x="20" y="92" width="80" height="10" />
      <rect x="28" y="84" width="64" height="10" />
      {/* Wings */}
      <rect x="16" y="60" width="28" height="26" />
      <rect x="76" y="60" width="28" height="26" />
      {/* Central body */}
      <rect x="38" y="54" width="44" height="32" />
      {/* Drum */}
      <rect x="46" y="40" width="28" height="16" />
      {/* Dome */}
      <path d="M46,40 Q60,20 74,40" />
      {/* Lantern */}
      <rect x="54" y="22" width="12" height="10" />
      {/* Finial */}
      <line x1="60" y1="22" x2="60" y2="10" />
      <line x1="57" y1="13" x2="63" y2="13" />
      {/* Column hints */}
      <line x1="48" y1="54" x2="48" y2="86" strokeOpacity="0.4" />
      <line x1="60" y1="54" x2="60" y2="86" strokeOpacity="0.4" />
      <line x1="72" y1="54" x2="72" y2="86" strokeOpacity="0.4" />
    </svg>
  );
}

// Seattle/Bellevue — Space Needle
export function SeattleLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 120" className={className} {...sharedProps}>
      {/* Needle top */}
      <line x1="40" y1="4" x2="40" y2="30" />
      {/* Top disc / platform — upper curve */}
      <path d="M20,42 Q40,28 60,42" />
      {/* Top disc — bottom curve */}
      <path d="M20,42 Q40,54 60,42" />
      {/* Observation deck detail */}
      <line x1="22" y1="42" x2="58" y2="42" strokeOpacity="0.5" />
      {/* Column going down from disc */}
      <line x1="36" y1="54" x2="32" y2="86" />
      <line x1="44" y1="54" x2="48" y2="86" />
      {/* Tripod base left */}
      <path d="M32,86 Q20,96 8,108" />
      {/* Tripod base right */}
      <path d="M48,86 Q60,96 72,108" />
      {/* Tripod center brace */}
      <line x1="40" y1="86" x2="40" y2="108" />
      {/* Base ring */}
      <path d="M8,108 Q40,116 72,108" />
    </svg>
  );
}

// Atlanta — Peach
export function AtlantaLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 100" className={className} {...sharedProps}>
      {/* Peach body — left lobe */}
      <path d="M40,85 Q12,72 14,48 Q16,24 40,20" />
      {/* Peach body — right lobe */}
      <path d="M40,85 Q68,72 66,48 Q64,24 40,20" />
      {/* Center crease line */}
      <path d="M40,20 Q36,52 40,85" strokeOpacity="0.5" />
      {/* Stem */}
      <path d="M40,20 Q42,12 38,6" />
      {/* Leaf */}
      <path d="M38,14 Q52,8 58,18 Q48,22 38,14" />
    </svg>
  );
}

// Washington DC/NoVA — Washington Monument
export function WashingtonLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 60 110" className={className} {...sharedProps}>
      {/* Obelisk shaft */}
      <path d="M16,96 L22,20 L38,20 L44,96 Z" />
      {/* Pyramid cap */}
      <path d="M22,20 L30,6 L38,20" />
      {/* Horizontal band near top of shaft */}
      <line x1="22" y1="26" x2="38" y2="26" strokeOpacity="0.5" />
      {/* Base steps */}
      <rect x="10" y="96" width="40" height="5" />
      <rect x="6" y="101" width="48" height="5" />
      {/* Reflection hint */}
      <path d="M22,108 L30,118 L38,108" strokeOpacity="0.2" />
    </svg>
  );
}

// Dallas/Fort Worth — Reunion Tower
export function DallasLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 120" className={className} {...sharedProps}>
      {/* Base structure */}
      <path d="M20,104 L32,60" />
      <path d="M60,104 L48,60" />
      <path d="M40,104 L40,60" />
      {/* Base cross braces */}
      <line x1="22" y1="94" x2="58" y2="94" strokeOpacity="0.4" />
      <line x1="26" y1="82" x2="54" y2="82" strokeOpacity="0.4" />
      <line x1="30" y1="70" x2="50" y2="70" strokeOpacity="0.4" />
      {/* Tower shaft */}
      <line x1="36" y1="60" x2="33" y2="38" />
      <line x1="44" y1="60" x2="47" y2="38" />
      {/* Geodesic sphere */}
      <circle cx="40" cy="28" r="16" />
      {/* Sphere detail lines */}
      <path d="M24,28 Q40,20 56,28" strokeOpacity="0.5" />
      <path d="M24,28 Q40,36 56,28" strokeOpacity="0.5" />
      <line x1="40" y1="12" x2="40" y2="44" strokeOpacity="0.4" />
      {/* Antenna */}
      <line x1="40" y1="12" x2="40" y2="4" />
      {/* Base platform */}
      <line x1="14" y1="104" x2="66" y2="104" />
    </svg>
  );
}

// Toronto — CN Tower
export function TorontoLandmark({ className }: LandmarkProps) {
  return (
    <svg viewBox="0 0 80 130" className={className} {...sharedProps}>
      {/* Antenna/needle */}
      <line x1="40" y1="4" x2="40" y2="28" />
      {/* Upper tower shaft (narrow) */}
      <line x1="37" y1="28" x2="35" y2="62" />
      <line x1="43" y1="28" x2="45" y2="62" />
      {/* SkyPod disc */}
      <path d="M28,60 Q40,54 52,60" />
      <path d="M28,60 Q40,68 52,60" />
      <line x1="28" y1="60" x2="52" y2="60" strokeOpacity="0.4" />
      {/* Main tower shaft (wider) */}
      <path d="M35,68 L28,96" />
      <path d="M45,68 L52,96" />
      {/* Flared base — left */}
      <path d="M28,96 Q18,108 12,118" />
      {/* Flared base — right */}
      <path d="M52,96 Q62,108 68,118" />
      {/* Base ground line */}
      <line x1="10" y1="120" x2="70" y2="120" />
      {/* Structural braces */}
      <line x1="32" y1="80" x2="28" y2="96" strokeOpacity="0.3" />
      <line x1="48" y1="80" x2="52" y2="96" strokeOpacity="0.3" />
    </svg>
  );
}

const LANDMARK_MAP: Record<string, (props: LandmarkProps) => React.JSX.Element> = {
  "bay-area":         BayAreaLandmark,
  "new-york":         NewYorkLandmark,
  "chicago":          ChicagoLandmark,
  "boston":           BostonLandmark,
  "austin":           AustinLandmark,
  "seattle-bellevue": SeattleLandmark,
  "atlanta":          AtlantaLandmark,
  "washington-dc":    WashingtonLandmark,
  "dallas":           DallasLandmark,
  "toronto":          TorontoLandmark,
};

interface CityLandmarkProps extends LandmarkProps {
  cityKey: string;
}

export default function CityLandmark({ cityKey, className }: CityLandmarkProps) {
  const Component = LANDMARK_MAP[cityKey];
  if (!Component) return null;
  return <Component className={className} />;
}
