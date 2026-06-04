import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Payment allocation. A single payment is split across a customer's open
 * invoices (oldest-first by default), and each allocation posts an entry
 * to the customer ledger — so paid and outstanding amounts are always
 * derived, never hand-edited.
 */
export function InvoicePaymentDiagram() {
  const invoices = [
    { y: 28, sub: "oldest" },
    { y: 98, sub: undefined },
    { y: 168, sub: "partial" },
  ];
  const invX = 286;
  const invW = 152;
  const invH = 46;
  const ledger = { x: 512, y: 60, w: 184, h: 124 };
  const payMidY = 129;

  return (
    <DiagramFrame title="KGD ERP invoice and payment allocation" viewBox="0 0 720 230">
      <Caption x={24} y={22} anchor="start">
        one payment, allocated across open invoices
      </Caption>

      {/* Payment → invoices (allocations) */}
      {invoices.map((inv, i) => (
        <Wire
          key={`a-${i}`}
          x1={144}
          y1={payMidY}
          x2={invX}
          y2={inv.y + invH / 2}
          accent
          arrow
        />
      ))}
      {/* Invoices → ledger (postings) */}
      {invoices.map((inv, i) => (
        <Wire
          key={`p-${i}`}
          x1={invX + invW}
          y1={inv.y + invH / 2}
          x2={ledger.x}
          y2={ledger.y + ledger.h / 2}
          arrow
        />
      ))}

      <Box x={24} y={100} w={120} h={58} title="Payment" sub="$ received" accent />

      {invoices.map((inv, i) => (
        <Box
          key={`b-${i}`}
          x={invX}
          y={inv.y}
          w={invW}
          h={invH}
          title={`Invoice ${String.fromCharCode(65 + i)}`}
          sub={inv.sub}
        />
      ))}

      <Box {...ledger} title="Customer ledger" sub="running balance" accent />

      <Caption x={210} y={210}>
        allocate · oldest-first
      </Caption>
      <Caption x={ledger.x + ledger.w / 2} y={205}>
        + ledger entry
      </Caption>
    </DiagramFrame>
  );
}
