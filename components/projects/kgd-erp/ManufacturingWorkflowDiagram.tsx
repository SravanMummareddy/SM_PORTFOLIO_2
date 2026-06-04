import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * The end-to-end operational flow: raw materials become finished stock,
 * which is sold against an order, billed on an invoice, settled by a
 * payment, and posted to the customer ledger — one continuous pipeline
 * from materials to money.
 */
export function ManufacturingWorkflowDiagram() {
  const w = 82;
  const h = 48;
  const y = 58;
  const step = 94;
  const x0 = 24;
  const stages = [
    { title: "Materials" },
    { title: "Production" },
    { title: "Inventory", accent: true },
    { title: "Order" },
    { title: "Invoice" },
    { title: "Payment" },
    { title: "Ledger", accent: true },
  ];

  return (
    <DiagramFrame title="KGD ERP operational flow" viewBox="0 0 720 170">
      <Caption x={24} y={28} anchor="start">
        materials → money · one operational flow
      </Caption>

      {stages.slice(0, -1).map((_, i) => {
        const x1 = x0 + i * step + w;
        const x2 = x0 + (i + 1) * step;
        return <Wire key={i} x1={x1} y1={y + h / 2} x2={x2} y2={y + h / 2} arrow />;
      })}

      {stages.map((s, i) => (
        <Box
          key={s.title}
          x={x0 + i * step}
          y={y}
          w={w}
          h={h}
          title={s.title}
          accent={s.accent}
        />
      ))}

      <Caption x={x0 + 2 * step + w / 2} y={130}>
        stock movements
      </Caption>
      <Caption x={x0 + 6 * step + w / 2} y={130}>
        running balance
      </Caption>
    </DiagramFrame>
  );
}
