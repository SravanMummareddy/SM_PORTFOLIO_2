/*
  Static, dependency-free stand-in for the 3D hero graph.
  Serves three roles: the instant first-paint backdrop beneath the
  lazy scene, the reduced-motion view, and the non-WebGL fallback.
  Pure SVG — no three, no client JS — so it costs almost nothing.
*/

interface Node {
  x: number;
  y: number;
  accent?: boolean;
  r?: number;
}

// Hand-placed network in a 0–100 viewBox. Reads as layered services,
// not a symmetric pattern.
const NODES: Node[] = [
  { x: 18, y: 30, r: 1.1 },
  { x: 32, y: 52, accent: true, r: 1.4 },
  { x: 26, y: 72 },
  { x: 44, y: 22 },
  { x: 50, y: 44, r: 1.3 },
  { x: 48, y: 66, accent: true },
  { x: 62, y: 32 },
  { x: 68, y: 56, r: 1.2 },
  { x: 60, y: 76 },
  { x: 78, y: 40, accent: true, r: 1.3 },
  { x: 84, y: 64 },
  { x: 38, y: 38 },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [1, 4], [3, 4], [4, 5], [4, 6], [5, 8],
  [6, 7], [7, 8], [6, 9], [9, 7], [9, 10], [7, 10], [11, 1], [11, 4], [3, 11],
];

export function SystemGraphFallback() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="node-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eef2f8" />
          <stop offset="100%" stopColor="#9aa6b4" />
        </radialGradient>
        <radialGradient id="node-accent" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a9c0ff" />
          <stop offset="100%" stopColor="#5e8bff" />
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(94,139,255,0.35)" />
          <stop offset="100%" stopColor="rgba(94,139,255,0)" />
        </radialGradient>
      </defs>

      <g stroke="#5e8bff" strokeOpacity="0.16" strokeWidth="0.18">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      {NODES.map((n, i) => (
        <g key={i}>
          {n.accent ? (
            <circle cx={n.x} cy={n.y} r={(n.r ?? 1) * 4} fill="url(#glow)" />
          ) : null}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r ?? 1}
            fill={n.accent ? "url(#node-accent)" : "url(#node-core)"}
          />
        </g>
      ))}
    </svg>
  );
}
