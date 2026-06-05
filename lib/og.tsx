import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
  Shared OpenGraph card renderer. Used by the site-wide app/opengraph-image.tsx
  and by per-route opengraph-image.tsx files (case studies, articles) so every
  share card shares identical chrome — only the copy changes. ImageResponse
  renders a flex/CSS subset only: inline styles, hardcoded colors (matching
  app/globals.css), and fonts supplied as raw buffers.
*/

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Sravan Mummareddy — Systems Product Engineer";

// Geist weights live as committed TTFs in app/_og (next/font objects can't be
// passed to ImageResponse). Read once at module scope.
const geistRegular = readFileSync(join(process.cwd(), "app/_og/Geist-Regular.ttf"));
const geistSemiBold = readFileSync(join(process.cwd(), "app/_og/Geist-SemiBold.ttf"));

// Faint node-graph motif echoing components/three/SystemGraphFallback.tsx.
const NODES: { x: number; y: number; r: number; accent?: boolean }[] = [
  { x: 770, y: 132, r: 7 },
  { x: 905, y: 96, r: 9, accent: true },
  { x: 1052, y: 158, r: 6 },
  { x: 980, y: 262, r: 8 },
  { x: 1126, y: 330, r: 7, accent: true },
  { x: 842, y: 300, r: 6 },
  { x: 1008, y: 432, r: 9, accent: true },
  { x: 1132, y: 504, r: 6 },
  { x: 900, y: 470, r: 7 },
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 5], [3, 1], [3, 2], [5, 8], [3, 6], [6, 7], [6, 4], [8, 6],
];

export interface OgCardProps {
  /** Uppercase kicker after the accent dot (e.g. name + context). */
  eyebrow: string;
  /** Optional secondary line under the eyebrow (e.g. the role). */
  subEyebrow?: string;
  /** The large focal headline. */
  title: string;
  /** Headline font size — shrink for long titles. Defaults to 66. */
  titleSize?: number;
  /** Optional accent line under the title (e.g. a project's kind). */
  subtitle?: string;
  /** Bottom line after the accent rule (e.g. focus tags). */
  footer?: string;
}

function OgCard({
  eyebrow,
  subEyebrow,
  title,
  titleSize = 66,
  subtitle,
  footer,
}: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#08090a",
        fontFamily: "Geist",
      }}
    >
      {/* Ambient accent glow, top-right */}
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -160,
          width: 760,
          height: 760,
          display: "flex",
          background:
            "radial-gradient(circle at center, rgba(94,139,255,0.22) 0%, rgba(94,139,255,0) 62%)",
        }}
      />

      {/* Node-graph motif */}
      <svg
        width={1200}
        height={630}
        viewBox="0 0 1200 630"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#5e8bff"
            strokeOpacity={0.16}
            strokeWidth={1.4}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.accent ? "#5e8bff" : "#3a4048"}
            fillOpacity={n.accent ? 0.85 : 0.9}
          />
        ))}
      </svg>

      {/* Foreground content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 76,
        }}
      >
        {/* Kicker */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#5e8bff",
              }}
            />
            <div
              style={{
                fontSize: 25,
                letterSpacing: 4,
                color: "#6b727a",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          </div>
          {subEyebrow ? (
            <div style={{ marginTop: 12, fontSize: 27, color: "#a4abb3" }}>
              {subEyebrow}
            </div>
          ) : null}
        </div>

        {/* Headline (+ optional accent subtitle) */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#f2f4f6",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 18, fontSize: 30, color: "#9db8ff" }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 120, height: 2, backgroundColor: "#5e8bff" }} />
          {footer ? (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                fontSize: 23,
                letterSpacing: 1,
                color: "#6b727a",
              }}
            >
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Build the ImageResponse for an OG card with the Geist fonts attached. */
export function renderOgImage(props: OgCardProps) {
  return new ImageResponse(<OgCard {...props} />, {
    ...OG_SIZE,
    fonts: [
      { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
      { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
    ],
  });
}
