import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Platform modernization. A stable REST API facade sits in front of
 * storage so consumers are decoupled from where documents live, while
 * binaries migrate from the legacy store into object storage, metadata
 * into a relational index, and hot reads into a cache.
 */
export function LegacyToModernDiagram() {
  const api = { x: 252, y: 78, w: 120, h: 92 };
  const apiR = api.x + api.w;
  const apiMid = api.y + api.h / 2;
  const right = [
    { y: 40, title: "Object storage", sub: "binaries" },
    { y: 104, title: "Metadata DB", sub: "index" },
    { y: 168, title: "Cache", sub: "hot docs" },
  ];
  const rx = 486;
  const rw = 162;

  return (
    <DiagramFrame title="Legacy-to-modern document platform" viewBox="0 0 720 240">
      <Caption x={24} y={24} anchor="start">
        stable API facade — legacy storage migrates behind it
      </Caption>

      {/* Consumers → API */}
      <Wire x1={154} y1={67} x2={api.x} y2={apiMid - 18} arrow />
      {/* Legacy → API (migrate) */}
      <Wire x1={154} y1={185} x2={api.x} y2={apiMid + 18} dashed arrow />
      {/* API → modern stores */}
      {right.map((r) => (
        <Wire
          key={r.title}
          x1={apiR}
          y1={apiMid}
          x2={rx}
          y2={r.y + 23}
          accent
          arrow
        />
      ))}

      <Box x={24} y={44} w={130} h={46} title="Consumers" />
      <Box x={24} y={162} w={130} h={46} title="Legacy store" sub="decades of docs" />
      <Box {...api} title="API layer" sub="REST · Spring" accent />
      {right.map((r) => (
        <Box key={`b-${r.title}`} x={rx} y={r.y} w={rw} h={46} title={r.title} sub={r.sub} />
      ))}

      <Caption x={196} y={205}>
        migrate
      </Caption>
    </DiagramFrame>
  );
}
