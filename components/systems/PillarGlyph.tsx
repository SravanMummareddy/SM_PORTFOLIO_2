/** The three system-pillar domains. Drives the schematic glyph + styling. */
export type PillarKind = "platform" | "intelligence" | "ai";

/**
 * Small schematic glyph for a system pillar. The `pillar-core` / `pillar-conn`
 * classes are animated on hover/focus by app/globals.css (reduced-motion
 * guarded) — preserve them when reusing. Shared by the homepage
 * "Systems I Build" cards and the /systems philosophy page.
 */
export function PillarGlyph({
  kind,
  className = "h-10 w-10",
}: {
  kind: PillarKind;
  className?: string;
}) {
  const stroke = "#5e8bff";
  const node = "#c3ccd6";
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      {kind === "platform" ? (
        <g>
          <rect x="8" y="10" width="32" height="8" rx="2" stroke={node} strokeOpacity="0.7" strokeWidth="1.5" />
          <rect className="pillar-core" x="8" y="20" width="32" height="8" rx="2" stroke={stroke} strokeOpacity="0.8" strokeWidth="1.5" />
          <rect x="8" y="30" width="32" height="8" rx="2" stroke={node} strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
      ) : null}
      {kind === "intelligence" ? (
        <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round">
          <path className="pillar-conn" d="M10 12 H38 L30 24 V36 L18 30 V24 Z" strokeOpacity="0.6" />
          <circle className="pillar-core" cx="24" cy="33" r="2.5" fill={stroke} stroke="none" />
        </g>
      ) : null}
      {kind === "ai" ? (
        <g>
          <g className="pillar-conn" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="14" x2="28" y2="24" />
            <line x1="12" y1="34" x2="28" y2="24" />
            <line x1="38" y1="24" x2="28" y2="24" />
          </g>
          <circle cx="12" cy="14" r="3" fill={node} />
          <circle cx="12" cy="34" r="3" fill={node} />
          <circle cx="38" cy="24" r="3" fill={node} />
          <circle className="pillar-core" cx="28" cy="24" r="4" fill={stroke} />
        </g>
      ) : null}
    </svg>
  );
}
