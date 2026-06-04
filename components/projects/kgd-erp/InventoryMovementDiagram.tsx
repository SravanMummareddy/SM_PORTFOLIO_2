import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Inventory as movements, not a mutable count. Production and returns
 * append inflows; sales and adjustments append outflows; on-hand is the
 * sum. A sale's stock movement is written in the same transaction as the
 * invoice, so billing and stock can never drift apart.
 */
export function InventoryMovementDiagram() {
  const center = { x: 286, y: 78, w: 168, h: 60 };
  const cLeft = center.x;
  const cRight = center.x + center.w;
  const cMidY = center.y + center.h / 2;

  return (
    <DiagramFrame title="KGD ERP inventory movement" viewBox="0 0 720 210">
      <Caption x={24} y={24} anchor="start">
        every change is an append-only stock movement
      </Caption>

      {/* Inflows → on-hand */}
      <Wire x1={152} y1={58} x2={cLeft} y2={cMidY} accent arrow />
      <Wire x1={152} y1={154} x2={cLeft} y2={cMidY} accent arrow />
      {/* on-hand → outflows */}
      <Wire x1={cRight} y1={cMidY} x2={568} y2={58} arrow />
      <Wire x1={cRight} y1={cMidY} x2={568} y2={154} arrow />

      <Box x={24} y={36} w={128} h={44} title="Production" sub="+ in" />
      <Box x={24} y={132} w={128} h={44} title="Returns" sub="+ in" />

      <Box {...center} title="On-hand qty" sub="Σ movements" accent />

      <Box x={568} y={36} w={128} h={44} title="Sales" sub="− out" />
      <Box x={568} y={132} w={128} h={44} title="Adjustments" sub="− out" />

      <Caption x={cLeft + center.w / 2} y={200}>
        sale movement committed in the same transaction as the invoice
      </Caption>
    </DiagramFrame>
  );
}
