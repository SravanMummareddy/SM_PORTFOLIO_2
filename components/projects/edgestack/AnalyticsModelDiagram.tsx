import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Analytics model. Raw records — sessions, individual decisions, and
 * integer-cent money entries — feed a rollup layer that aggregates over
 * time windows. The dashboard reads only those rollups, never the raw
 * stream, so panels stay fast as history grows.
 */
export function AnalyticsModelDiagram() {
  const sources = [
    { label: "Sessions", sub: "lifecycle", y: 40 },
    { label: "Decisions", sub: "scored", y: 110 },
    { label: "Money entries", sub: "integer cents", y: 180 },
  ];
  const sx = 24;
  const sw = 138;
  const sh = 46;

  const rollups = { x: 252, y: 96, w: 158, h: 80 };
  const rollupsMid = rollups.y + rollups.h / 2;

  const panels = [
    { label: "Accuracy trend", y: 32 },
    { label: "Net result", y: 88 },
    { label: "Budget discipline", y: 144 },
    { label: "Volume", y: 200 },
  ];
  const px = 506;
  const pw = 138;
  const ph = 46;

  return (
    <DiagramFrame title="Analytics dashboard model" viewBox="0 0 720 272">
      <Caption x={24} y={22} anchor="start">
        raw sessions, decisions, and integer-cent money roll up into dashboard metrics
      </Caption>

      {sources.map((s) => (
        <g key={s.label}>
          <Wire x1={sx + sw} y1={s.y + sh / 2} x2={rollups.x} y2={rollupsMid} accent />
          <Box x={sx} y={s.y} w={sw} h={sh} title={s.label} sub={s.sub} />
        </g>
      ))}

      {panels.map((p) => (
        <g key={p.label}>
          <Wire x1={rollups.x + rollups.w} y1={rollupsMid} x2={px} y2={p.y + ph / 2} arrow />
          <Box x={px} y={p.y} w={pw} h={ph} title={p.label} />
        </g>
      ))}

      <Box {...rollups} title="Rollups" sub="aggregate · window" accent />

      <Caption x={px + pw / 2} y={262}>
        dashboard reads rollups, not raw events
      </Caption>
    </DiagramFrame>
  );
}
