import { Box, Wire, Caption, C, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * The customer ledger as an append-only series. Invoices post debits,
 * payments post credits, and the running balance is the sum of entries —
 * never a mutable field, so the history reconstructs exactly how a
 * balance was reached.
 */
export function LedgerTimelineDiagram() {
  const axisY = 192;
  const entries = [
    { x: 110, by: 140, label: "invoice +" },
    { x: 205, by: 112, label: "invoice +" },
    { x: 300, by: 146, label: "payment −", credit: true },
    { x: 395, by: 118, label: "invoice +" },
    { x: 490, by: 156, label: "payment −", credit: true },
    { x: 575, by: 176, label: "payment −", credit: true },
  ];
  const points =
    `60,170 ` + entries.map((e) => `${e.x},${e.by}`).join(" ") + ` 660,176`;

  return (
    <DiagramFrame title="KGD ERP customer ledger timeline" viewBox="0 0 720 240">
      <Caption x={24} y={26} anchor="start">
        append-only · corrections post reversing entries
      </Caption>

      {/* Time axis */}
      <Wire x1={48} y1={axisY} x2={672} y2={axisY} arrow />

      {/* Running-balance step line */}
      <polyline
        points={points}
        fill="none"
        stroke={C.accent}
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {entries.map((e) => (
        <g key={e.x}>
          <line
            x1={e.x}
            y1={e.by}
            x2={e.x}
            y2={axisY}
            stroke={C.node}
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <circle
            cx={e.x}
            cy={e.by}
            r="4"
            fill={e.credit ? C.accent : C.node}
          />
          <Caption x={e.x} y={axisY + 22} accent={e.credit}>
            {e.label}
          </Caption>
        </g>
      ))}

      <Box x={520} y={44} w={168} h={48} title="Balance" sub="Σ of entries" accent />
    </DiagramFrame>
  );
}
