import { Box, Wire, Caption, DiagramFrame } from "./diagram-kit";

/**
 * The strict transition state machine. Every item is in exactly one
 * state; only the drawn transitions are legal, and each is validated
 * server-side before an event is written.
 */
export function StateMachineDiagram() {
  const w = 116;
  const h = 44;
  // Node top-left coordinates.
  const created = { x: 36, y: 150 };
  const progress = { x: 248, y: 150 };
  const blocked = { x: 248, y: 56 };
  const review = { x: 452, y: 150 };
  const done = { x: 600, y: 150 };
  const midY = 150 + h / 2;
  const pcx = progress.x + w / 2;

  return (
    <DiagramFrame title="LuminTrack workflow state machine" viewBox="0 0 720 280">
      {/* created → in progress */}
      <Wire x1={created.x + w} y1={midY} x2={progress.x} y2={midY} arrow />
      {/* in progress ↔ blocked */}
      <Wire x1={pcx - 10} y1={progress.y} x2={pcx - 10} y2={blocked.y + h} accent arrow />
      <Wire x1={pcx + 10} y1={blocked.y + h} x2={pcx + 10} y2={progress.y} arrow />
      {/* in progress → review */}
      <Wire x1={progress.x + w} y1={midY} x2={review.x} y2={midY} arrow />
      {/* review → done */}
      <Wire x1={review.x + w} y1={midY} x2={done.x} y2={midY} arrow />
      {/* review → in progress (reject), curved below */}
      <path
        d={`M ${review.x + w / 2} ${review.y + h} C ${review.x} ${midY + 70}, ${pcx + 30} ${midY + 70}, ${pcx} ${progress.y + h}`}
        stroke="#5e8bff"
        strokeOpacity="0.45"
        strokeWidth="1.25"
        strokeDasharray="4 5"
        fill="none"
        markerEnd="url(#arrow-accent)"
      />

      <Caption x={pcx + 20} y={120} anchor="start" accent>
        block
      </Caption>
      <Caption x={pcx + 40} y={246} anchor="middle" accent>
        reject → reopen
      </Caption>

      <Box {...created} w={w} h={h} title="Created" />
      <Box {...progress} w={w} h={h} title="In progress" accent />
      <Box {...blocked} w={w} h={h} title="Blocked" />
      <Box {...review} w={w} h={h} title="In review" />
      <Box {...done} w={w} h={h} title="Done" />

      <Caption x={36} y={28} anchor="start">
        one state per item · server-validated transitions
      </Caption>
    </DiagramFrame>
  );
}
