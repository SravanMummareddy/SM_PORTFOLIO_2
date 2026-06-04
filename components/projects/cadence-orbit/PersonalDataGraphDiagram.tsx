import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Personal data model. Every module writes the same shape of record — a
 * typed entry stamped with time and tags — so heterogeneous domains land
 * in one graph that can be linked by day and tag, rather than siloed
 * tables that never talk to each other.
 */
export function PersonalDataGraphDiagram() {
  const sources = ["Routines", "Nutrition", "Fasting", "Mood", "Body metrics"];
  const sx = 24;
  const sw = 132;
  const sh = 38;
  const top = 30;
  const gap = 14;

  const schema = { x: 286, y: 96, w: 158, h: 84 };
  const schemaMid = schema.y + schema.h / 2;
  const graph = { x: 540, y: 96, w: 156, h: 84 };

  return (
    <DiagramFrame title="Personal data graph from typed entries" viewBox="0 0 720 290">
      <Caption x={24} y={20} anchor="start">
        one entry shape across every module · linked into a single graph
      </Caption>

      {sources.map((label, i) => {
        const y = top + i * (sh + gap);
        const mid = y + sh / 2;
        return (
          <g key={label}>
            <Wire x1={sx + sw} y1={mid} x2={schema.x} y2={schemaMid} accent />
            <Box x={sx} y={y} w={sw} h={sh} title={label} />
          </g>
        );
      })}

      <Wire x1={schema.x + schema.w} y1={schemaMid} x2={graph.x} y2={schemaMid} accent arrow />

      <Box {...schema} title="Typed entry" sub="time · type · tags" accent />
      <Box {...graph} title="Data graph" sub="linked by day + tag" />

      <Caption x={schema.x + schema.w + 12} y={schemaMid - 12} anchor="start" accent>
        normalize
      </Caption>
      <Caption x={618} y={200}>
        cross-domain links
      </Caption>
    </DiagramFrame>
  );
}
