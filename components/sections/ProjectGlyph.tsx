/*
  Lightweight architecture hints for the featured-work previews.
  Each is a small, static SVG schematic of a project's system metaphor
  — a state machine, a document pipeline, a ledger, orbiting modules,
  a decision tree. Pure SVG, no animation, aria-hidden: they suggest
  the shape of the system without pretending to be the real diagram.
*/

export type GlyphVariant =
  | "workflow"
  | "pipeline"
  | "ledger"
  | "orbit"
  | "decision";

const EDGE = "#5e8bff";
const NODE = "#c3ccd6";
const ACCENT = "#5e8bff";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 160 110"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
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

function Node({ x, y, accent, r = 4.5 }: { x: number; y: number; accent?: boolean; r?: number }) {
  return (
    <>
      {accent ? <circle cx={x} cy={y} r={r * 2.4} fill="rgba(94,139,255,0.16)" /> : null}
      <circle cx={x} cy={y} r={r} fill={accent ? ACCENT : NODE} />
    </>
  );
}

/** State-machine workflow: states left→right with a branch. */
function Workflow() {
  return (
    <Frame>
      <g stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" strokeLinecap="round">
        <line x1="30" y1="45" x2="64" y2="45" />
        <line x1="64" y1="45" x2="98" y2="45" />
        <line x1="98" y1="45" x2="132" y2="45" />
        <line x1="98" y1="45" x2="98" y2="80" />
        <line x1="98" y1="80" x2="64" y2="80" />
      </g>
      <Node x={30} y={45} />
      <Node x={64} y={45} accent />
      <Node x={98} y={45} />
      <Node x={132} y={45} />
      <Node x={64} y={80} r={3.5} />
      <Node x={98} y={80} r={3.5} />
    </Frame>
  );
}

/** Document pipeline: source → stages → object storage. */
function Pipeline() {
  return (
    <Frame>
      <rect x="20" y="36" width="16" height="22" rx="2" fill="none" stroke={NODE} strokeOpacity="0.7" strokeWidth="1.25" />
      <line x1="24" y1="42" x2="32" y2="42" stroke={NODE} strokeOpacity="0.5" />
      <line x1="24" y1="47" x2="32" y2="47" stroke={NODE} strokeOpacity="0.5" />
      <g stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" strokeLinecap="round">
        <line x1="36" y1="47" x2="58" y2="47" />
        <line x1="76" y1="47" x2="96" y2="47" />
        <line x1="114" y1="47" x2="128" y2="47" />
      </g>
      <rect x="58" y="38" width="18" height="18" rx="3" fill="none" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.25" />
      <rect x="96" y="38" width="18" height="18" rx="3" fill="none" stroke={NODE} strokeOpacity="0.6" strokeWidth="1.25" />
      <g stroke={NODE} strokeOpacity="0.7" strokeWidth="1.25" fill="none">
        <ellipse cx="138" cy="40" rx="9" ry="3.2" />
        <path d="M129 40 v14 a9 3.2 0 0 0 18 0 v-14" />
      </g>
    </Frame>
  );
}

/** Ledger reconciliation: invoice/payment rows balancing into a ledger. */
function Ledger() {
  return (
    <Frame>
      <g stroke={NODE} strokeOpacity="0.55" strokeWidth="1.25" strokeLinecap="round">
        <line x1="26" y1="34" x2="74" y2="34" />
        <line x1="26" y1="50" x2="66" y2="50" />
        <line x1="26" y1="66" x2="58" y2="66" />
      </g>
      <line x1="92" y1="26" x2="92" y2="84" stroke={EDGE} strokeOpacity="0.35" strokeWidth="1.25" />
      <g stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.25" strokeLinecap="round">
        <line x1="100" y1="40" x2="138" y2="40" />
        <line x1="100" y1="56" x2="130" y2="56" />
      </g>
      <Node x={92} y={40} accent r={3.5} />
      <Node x={92} y={56} r={3} />
    </Frame>
  );
}

/** Orbiting modules around a personal-data core. */
function Orbit() {
  return (
    <Frame>
      <ellipse cx="80" cy="55" rx="46" ry="26" stroke={EDGE} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="80" cy="55" rx="26" ry="40" stroke={EDGE} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 4" />
      <Node x={80} y={55} accent r={6} />
      <Node x={126} y={55} r={3.5} />
      <Node x={34} y={55} r={3.5} />
      <Node x={80} y={15} r={3.5} />
      <Node x={80} y={95} r={3.5} />
      <Node x={108} y={30} r={3} />
    </Frame>
  );
}

/** Decision tree with one weighted path highlighted. */
function Decision() {
  return (
    <Frame>
      <g stroke={EDGE} strokeOpacity="0.3" strokeWidth="1.25" strokeLinecap="round">
        <line x1="28" y1="55" x2="64" y2="34" />
        <line x1="28" y1="55" x2="64" y2="76" />
        <line x1="64" y1="76" x2="104" y2="64" />
        <line x1="64" y1="76" x2="104" y2="92" />
      </g>
      <g stroke={ACCENT} strokeOpacity="0.75" strokeWidth="1.5" strokeLinecap="round">
        <line x1="64" y1="34" x2="104" y2="22" />
        <line x1="64" y1="34" x2="104" y2="46" />
      </g>
      <Node x={28} y={55} />
      <Node x={64} y={34} accent />
      <Node x={64} y={76} r={3.5} />
      <Node x={104} y={22} accent r={3.5} />
      <Node x={104} y={46} r={3} />
      <Node x={104} y={64} r={3} />
      <Node x={104} y={92} r={3} />
    </Frame>
  );
}

const GLYPHS: Record<GlyphVariant, () => React.ReactElement> = {
  workflow: Workflow,
  pipeline: Pipeline,
  ledger: Ledger,
  orbit: Orbit,
  decision: Decision,
};

export function ProjectGlyph({ variant }: { variant: GlyphVariant }) {
  const Glyph = GLYPHS[variant];
  return <Glyph />;
}
