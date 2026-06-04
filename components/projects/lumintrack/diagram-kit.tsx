import type { ReactNode } from "react";

/*
  Shared SVG primitives for LuminTrack's system diagrams. Abstract,
  monochrome-with-accent visuals consistent with the homepage glyphs —
  boxes, wires, and nodes on a near-black panel. No real screenshots.
*/

export const C = {
  accent: "#5e8bff",
  node: "#c3ccd6",
  title: "#e7eaed",
  text: "#a4abb3",
  faint: "#6b727a",
} as const;

export function DiagramFrame({
  title,
  viewBox,
  children,
}: {
  title: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      role="img"
      aria-label={title}
      fill="none"
    >
      <title>{title}</title>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={C.faint} />
        </marker>
        <marker
          id="arrow-accent"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={C.accent} />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        fill={accent ? "rgba(94,139,255,0.09)" : "rgba(255,255,255,0.022)"}
        stroke={accent ? "rgba(94,139,255,0.42)" : "rgba(255,255,255,0.11)"}
        strokeWidth="1"
      />
      <text
        x={cx}
        y={sub ? cy - 3 : cy}
        textAnchor="middle"
        dominantBaseline="central"
        className="font-mono"
        fontSize="13"
        fill={accent ? "#9db8ff" : C.title}
      >
        {title}
      </text>
      {sub ? (
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          fontSize="10.5"
          fill={C.faint}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function Wire({
  x1,
  y1,
  x2,
  y2,
  accent,
  dashed,
  arrow,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent?: boolean;
  dashed?: boolean;
  arrow?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={accent ? C.accent : C.node}
      strokeOpacity={accent ? 0.6 : 0.32}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeDasharray={dashed ? "4 5" : undefined}
      markerEnd={arrow ? `url(#${accent ? "arrow-accent" : "arrow"})` : undefined}
    />
  );
}

export function Caption({
  x,
  y,
  children,
  anchor = "middle",
  accent,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  accent?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="font-mono"
      fontSize="10.5"
      fill={accent ? "#9db8ff" : C.faint}
    >
      {children}
    </text>
  );
}
