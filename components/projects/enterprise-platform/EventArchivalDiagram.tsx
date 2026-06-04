import { Box, Wire, Caption, C, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Event-driven archival. A document change publishes an event; archival
 * workers consume it and write to object storage with an idempotent key,
 * so a redelivered event archives exactly once. Failures retry with
 * backoff and, if still failing, move to a dead-letter queue.
 */
export function EventArchivalDiagram() {
  const y = 88;
  const h = 50;
  const mid = y + h / 2;
  const worker = { x: 356, y, w: 134, h };

  return (
    <DiagramFrame title="Event-driven archival pipeline" viewBox="0 0 720 240">
      <Caption x={24} y={26} anchor="start">
        archived exactly once · failures retry, then dead-letter
      </Caption>

      {/* main flow */}
      <Wire x1={144} y1={mid} x2={190} y2={mid} arrow />
      <Wire x1={310} y1={mid} x2={worker.x} y2={mid} accent arrow />
      <Wire x1={worker.x + worker.w} y1={mid} x2={534} y2={mid} accent arrow />
      {/* retry loop on worker */}
      <path
        d={`M ${worker.x + 34} ${y} C ${worker.x + 20} ${y - 34}, ${worker.x + worker.w - 20} ${y - 34}, ${worker.x + worker.w - 34} ${y}`}
        stroke={C.faint}
        strokeOpacity="0.5"
        strokeWidth="1.25"
        fill="none"
        markerEnd="url(#arrow)"
      />
      {/* worker → DLQ */}
      <Wire x1={worker.x + worker.w / 2} y1={y + h} x2={worker.x + worker.w / 2} y2={180} dashed arrow />

      <Box x={24} y={y} w={120} h={h} title="Doc change" sub="create / update" />
      <Box x={190} y={y} w={120} h={h} title="Event queue" accent />
      <Box {...worker} title="Archival worker" sub="idempotent" />
      <Box x={534} y={y} w={150} h={h} title="Object storage" />
      <Box x={356} y={180} w={134} h={42} title="Dead-letter" sub="inspect" />

      <Caption x={worker.x + worker.w / 2} y={48}>
        retry · backoff
      </Caption>
      <Caption x={512} y={78} accent>
        write once
      </Caption>
    </DiagramFrame>
  );
}
