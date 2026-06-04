import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Rule-based data-quality automation. Incoming documents and metadata
 * pass through a validation gate of declarative rules; records that pass
 * proceed to archival, records that fail are flagged for correction
 * rather than silently archived.
 */
export function DataQualityGateDiagram() {
  const gate = { x: 250, y: 82, w: 150, h: 66 };
  const gateR = gate.x + gate.w;
  const gateMid = gate.y + gate.h / 2;

  return (
    <DiagramFrame title="Data-quality validation gate" viewBox="0 0 720 230">
      <Caption x={24} y={24} anchor="start">
        declarative rules · auditable · pass through or quarantine
      </Caption>

      {/* Incoming → gate */}
      <Wire x1={154} y1={gateMid} x2={gate.x} y2={gateMid} arrow />
      {/* gate → accepted (pass) */}
      <Wire x1={gateR} y1={gateMid - 14} x2={470} y2={62} accent arrow />
      {/* gate → flagged (fail) */}
      <Wire x1={gateR} y1={gateMid + 14} x2={470} y2={170} arrow />

      <Box x={24} y={89} w={130} h={52} title="Documents" sub="+ metadata" />
      <Box {...gate} title="Validation gate" sub="rule checks" accent />
      <Box x={470} y={40} w={160} h={46} title="Accepted" sub="→ archive" />
      <Box x={470} y={148} w={160} h={46} title="Flagged" sub="→ correct" />

      <Caption x={432} y={52} accent>
        pass
      </Caption>
      <Caption x={432} y={184}>
        fail
      </Caption>
      <Caption x={325} y={172}>
        missing · malformed · mismatched refs
      </Caption>
    </DiagramFrame>
  );
}
