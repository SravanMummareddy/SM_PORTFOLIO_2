import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Cross-module insight engine. Signals from independent modules feed one
 * engine that aggregates and correlates them into trends, correlations,
 * and a daily summary. A future AI layer would read the same signals —
 * it is shown dashed because it isn't shipped.
 */
export function InsightEngineDiagram() {
  const sources = ["Routines", "Nutrition", "Fasting", "Mood", "Body metrics"];
  const sx = 24;
  const sw = 122;
  const sh = 36;
  const top = 26;
  const gap = 13;

  const engine = { x: 268, y: 96, w: 168, h: 92 };
  const engineMid = engine.y + engine.h / 2;

  const outputs = [
    { label: "Trends", y: 40 },
    { label: "Correlations", y: 108 },
    { label: "Daily summary", y: 176 },
  ];
  const ox = 556;
  const ow = 140;
  const oh = 46;

  const future = { x: 268, y: 214, w: 168, h: 44 };

  return (
    <DiagramFrame title="Cross-module insight engine" viewBox="0 0 720 290">
      <Caption x={24} y={18} anchor="start">
        today: rules + statistics · future: an AI layer over the same signals
      </Caption>

      {sources.map((label, i) => {
        const y = top + i * (sh + gap);
        const mid = y + sh / 2;
        return (
          <g key={label}>
            <Wire x1={sx + sw} y1={mid} x2={engine.x} y2={engineMid} arrow />
            <Box x={sx} y={y} w={sw} h={sh} title={label} />
          </g>
        );
      })}

      {outputs.map((o) => {
        const mid = o.y + oh / 2;
        return (
          <g key={o.label}>
            <Wire x1={engine.x + engine.w} y1={engineMid} x2={ox} y2={mid} accent arrow />
            <Box x={ox} y={o.y} w={ow} h={oh} title={o.label} />
          </g>
        );
      })}

      <Wire
        x1={engine.x + engine.w / 2}
        y1={engine.y + engine.h}
        x2={engine.x + engine.w / 2}
        y2={future.y}
        dashed
        arrow
      />

      <Box {...engine} title="Insight engine" sub="aggregate · correlate" accent />
      <Box {...future} title="AI insight layer" sub="future" />

      <Caption x={future.x + future.w + 12} y={future.y + future.h / 2 + 4} anchor="start">
        not yet shipped
      </Caption>
    </DiagramFrame>
  );
}
