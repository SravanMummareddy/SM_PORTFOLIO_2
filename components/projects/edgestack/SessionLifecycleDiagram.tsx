import { Box, Wire, Caption, C, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Session lifecycle. A practice session moves through a small state
 * machine — opened with a budget, active while decisions are logged,
 * then settled and scored. A session can be paused and resumed, and an
 * abandoned session still settles so its data is never lost.
 */
export function SessionLifecycleDiagram() {
  const y = 92;
  const h = 52;
  const mid = y + h / 2;

  const open = { x: 24, y, w: 120, h };
  const active = { x: 214, y, w: 130, h };
  const settled = { x: 414, y, w: 130, h };
  const scored = { x: 596, y, w: 100, h };

  return (
    <DiagramFrame title="Practice session lifecycle" viewBox="0 0 720 244">
      <Caption x={24} y={26} anchor="start">
        budget set on open · decisions logged while active · settled, then scored
      </Caption>

      <Wire x1={open.x + open.w} y1={mid} x2={active.x} y2={mid} arrow />
      <Wire x1={active.x + active.w} y1={mid} x2={settled.x} y2={mid} accent arrow />
      <Wire x1={settled.x + settled.w} y1={mid} x2={scored.x} y2={mid} accent arrow />

      {/* pause / resume loop on active */}
      <path
        d={`M ${active.x + 34} ${y} C ${active.x + 18} ${y - 36}, ${active.x + active.w - 18} ${y - 36}, ${active.x + active.w - 34} ${y}`}
        stroke={C.faint}
        strokeOpacity="0.5"
        strokeWidth="1.25"
        fill="none"
        markerEnd="url(#arrow)"
      />

      {/* abandoned still settles */}
      <Wire x1={active.x + active.w / 2} y1={y + h} x2={active.x + active.w / 2} y2={184} dashed arrow />
      <Wire x1={active.x + active.w} y1={204} x2={settled.x + settled.w / 2} y2={y + h} dashed arrow />

      <Box {...open} title="Opened" sub="budget set" />
      <Box {...active} title="Active" sub="logging decisions" accent />
      <Box {...settled} title="Settled" sub="totals locked" />
      <Box {...scored} title="Scored" />
      <Box x={active.x} y={184} w={active.w} h={40} title="Abandoned" sub="auto-settle" />

      <Caption x={active.x + active.w / 2} y={50}>
        pause · resume
      </Caption>
      <Caption x={420} y={208} anchor="start">
        still settles · no data lost
      </Caption>
    </DiagramFrame>
  );
}
