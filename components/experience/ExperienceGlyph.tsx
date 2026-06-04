/*
  Lightweight domain motifs for the experience journey. Each is a small
  static SVG schematic of a role's system domain — a real-time feed, a
  workforce-SaaS grid, layered medical imaging, a document-modernization
  pipeline, an AI retrieval core. Same abstract visual language as the
  project glyphs: nodes, edges, accent. Pure SVG, aria-hidden.
*/

export type ExperienceGlyphVariant =
  | "product"
  | "saas"
  | "imaging"
  | "utility"
  | "ai";

const EDGE = "#5e8bff";
const NODE = "#c3ccd6";
const ACCENT = "#5e8bff";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 160 110" className="h-full w-full" fill="none" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="159"
        height="109"
        rx="12"
        stroke="rgba(255,255,255,0.06)"
      />
      {children}
    </svg>
  );
}

function Node({
  x,
  y,
  accent,
  r = 4.5,
}: {
  x: number;
  y: number;
  accent?: boolean;
  r?: number;
}) {
  return (
    <>
      {accent ? (
        <circle cx={x} cy={y} r={r * 2.4} fill="rgba(94,139,255,0.16)" />
      ) : null}
      <circle cx={x} cy={y} r={r} fill={accent ? ACCENT : NODE} />
    </>
  );
}

/** Real-time data feed: a rising series over a baseline with live point. */
function Product() {
  return (
    <Frame>
      <line x1="22" y1="84" x2="138" y2="84" stroke={NODE} strokeOpacity="0.28" strokeWidth="1.25" />
      <polyline
        points="24,72 48,60 72,66 96,44 120,36 136,28"
        stroke={EDGE}
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g stroke={NODE} strokeOpacity="0.5" strokeWidth="1.25" strokeLinecap="round">
        <line x1="40" y1="84" x2="40" y2="76" />
        <line x1="64" y1="84" x2="64" y2="74" />
        <line x1="88" y1="84" x2="88" y2="70" />
        <line x1="112" y1="84" x2="112" y2="66" />
      </g>
      <Node x={120} y={36} r={3} />
      <Node x={136} y={28} accent r={4} />
    </Frame>
  );
}

/** Workforce SaaS: modular service rows joined to a cloud orchestration node. */
function Saas() {
  return (
    <Frame>
      <g>
        <rect x="20" y="30" width="44" height="12" rx="3" stroke={NODE} strokeOpacity="0.6" strokeWidth="1.25" />
        <rect x="20" y="50" width="44" height="12" rx="3" stroke={EDGE} strokeOpacity="0.7" strokeWidth="1.25" />
        <rect x="20" y="70" width="44" height="12" rx="3" stroke={NODE} strokeOpacity="0.45" strokeWidth="1.25" />
      </g>
      <g stroke={EDGE} strokeOpacity="0.35" strokeWidth="1.25" strokeLinecap="round">
        <line x1="64" y1="36" x2="108" y2="55" />
        <line x1="64" y1="56" x2="108" y2="55" />
        <line x1="64" y1="76" x2="108" y2="55" />
      </g>
      <circle cx="116" cy="55" r="13" fill="rgba(94,139,255,0.12)" />
      <Node x={116} y={55} accent r={5} />
    </Frame>
  );
}

/** Healthcare imaging: stacked image slices with an inspection reticle. */
function Imaging() {
  return (
    <Frame>
      <g stroke={NODE} strokeOpacity="0.4" strokeWidth="1.25">
        <rect x="44" y="26" width="62" height="46" rx="4" />
        <rect x="52" y="34" width="62" height="46" rx="4" stroke={NODE} strokeOpacity="0.6" />
      </g>
      <rect x="60" y="42" width="62" height="46" rx="4" stroke={EDGE} strokeOpacity="0.7" strokeWidth="1.25" />
      <g stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.25" strokeLinecap="round">
        <line x1="91" y1="56" x2="91" y2="74" />
        <line x1="82" y1="65" x2="100" y2="65" />
      </g>
      <Node x={91} y={65} accent r={3} />
    </Frame>
  );
}

/** Utility document modernization: source docs → pipeline → object storage. */
function Utility() {
  return (
    <Frame>
      <g stroke={NODE} strokeOpacity="0.6" strokeWidth="1.25" fill="none">
        <rect x="20" y="40" width="16" height="22" rx="2" />
        <rect x="26" y="34" width="16" height="22" rx="2" stroke={NODE} strokeOpacity="0.4" />
      </g>
      <g stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" strokeLinecap="round">
        <line x1="46" y1="46" x2="66" y2="46" />
        <line x1="84" y1="46" x2="104" y2="46" />
      </g>
      <rect x="66" y="37" width="18" height="18" rx="3" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.25" />
      <g stroke={NODE} strokeOpacity="0.7" strokeWidth="1.25" fill="none">
        <ellipse cx="122" cy="40" rx="14" ry="4" />
        <path d="M108 40 v22 a14 4 0 0 0 28 0 v-22" />
        <path d="M108 51 a14 4 0 0 0 28 0" strokeOpacity="0.4" />
      </g>
    </Frame>
  );
}

/** AI-assisted core: sources retrieved into a central intelligence node. */
function Ai() {
  return (
    <Frame>
      <g stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" strokeLinecap="round">
        <line x1="28" y1="32" x2="80" y2="55" />
        <line x1="28" y1="78" x2="80" y2="55" />
        <line x1="132" y1="32" x2="80" y2="55" />
        <line x1="132" y1="78" x2="80" y2="55" />
      </g>
      <Node x={28} y={32} r={3.5} />
      <Node x={28} y={78} r={3.5} />
      <Node x={132} y={32} r={3.5} />
      <Node x={132} y={78} r={3.5} />
      <circle cx="80" cy="55" r="13" fill="rgba(94,139,255,0.16)" />
      <Node x={80} y={55} accent r={6} />
    </Frame>
  );
}

const GLYPHS: Record<ExperienceGlyphVariant, () => React.ReactElement> = {
  product: Product,
  saas: Saas,
  imaging: Imaging,
  utility: Utility,
  ai: Ai,
};

export function ExperienceGlyph({
  variant,
}: {
  variant: ExperienceGlyphVariant;
}) {
  const Glyph = GLYPHS[variant];
  return <Glyph />;
}
