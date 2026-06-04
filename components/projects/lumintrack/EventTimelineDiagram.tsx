import { Box, Wire, Caption, C, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * The event-sourced activity timeline. Every action appends an
 * immutable event; the item's current state is a projection derived by
 * replaying that log — so history is never lost.
 */
export function EventTimelineDiagram() {
  const axisY = 128;
  const events = [
    { x: 110, label: "created", above: true },
    { x: 230, label: "assigned", above: false },
    { x: 350, label: "→ active", above: true },
    { x: 470, label: "doc added", above: false },
    { x: 580, label: "→ review", above: true },
  ];

  return (
    <DiagramFrame title="LuminTrack event timeline" viewBox="0 0 720 300">
      <Caption x={40} y={40} anchor="start">
        append-only log · immutable events
      </Caption>

      {/* Timeline axis */}
      <Wire x1={48} y1={axisY} x2={672} y2={axisY} arrow />

      {events.map((e) => (
        <g key={e.label}>
          <line
            x1={e.x}
            y1={axisY}
            x2={e.x}
            y2={e.above ? axisY - 22 : axisY + 22}
            stroke={C.node}
            strokeOpacity="0.3"
            strokeWidth="1.25"
          />
          <circle cx={e.x} cy={axisY} r="4" fill={C.accent} />
          <Caption x={e.x} y={e.above ? axisY - 30 : axisY + 38}>
            {e.label}
          </Caption>
        </g>
      ))}

      {/* Projection to current state */}
      <path
        d={`M 580 ${axisY} C 580 ${axisY + 60}, 540 ${axisY + 64}, 540 ${axisY + 78}`}
        stroke={C.accent}
        strokeOpacity="0.4"
        strokeWidth="1.25"
        strokeDasharray="4 5"
        fill="none"
        markerEnd="url(#arrow-accent)"
      />
      <Box
        x={452}
        y={210}
        w={200}
        h={56}
        title="Current state"
        sub="projection of events"
        accent
      />
    </DiagramFrame>
  );
}
