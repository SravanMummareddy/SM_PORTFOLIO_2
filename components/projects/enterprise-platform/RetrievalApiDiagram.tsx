import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Cache-backed document retrieval. A request hits the API, which checks
 * the cache first; on a miss it resolves metadata, fetches the binary
 * from object storage, warms the cache, and returns — consumers never
 * know whether a document lived in legacy or modern storage.
 */
export function RetrievalApiDiagram() {
  return (
    <DiagramFrame title="Document retrieval API flow" viewBox="0 0 720 230">
      <Caption x={24} y={24} anchor="start">
        cache hit returns immediately · miss falls through, then warms the cache
      </Caption>

      {/* Client → API */}
      <Wire x1={128} y1={120} x2={170} y2={120} arrow />
      {/* API → Cache (check) */}
      <Wire x1={274} y1={108} x2={330} y2={60} accent arrow />
      {/* API → Metadata (miss) */}
      <Wire x1={274} y1={132} x2={330} y2={176} arrow />
      {/* Metadata → Object storage */}
      <Wire x1={470} y1={176} x2={520} y2={176} arrow />
      {/* Object storage → Cache (warm) */}
      <Wire x1={560} y1={150} x2={446} y2={84} dashed arrow />

      <Box x={24} y={95} w={104} h={50} title="Client" />
      <Box x={170} y={95} w={104} h={50} title="API" accent />
      <Box x={330} y={36} w={140} h={46} title="Cache" sub="hit?" />
      <Box x={330} y={152} w={140} h={46} title="Metadata" sub="index" />
      <Box x={520} y={152} w={150} h={46} title="Object storage" sub="binary" />

      <Caption x={292} y={78} anchor="start" accent>
        check
      </Caption>
      <Caption x={286} y={166} anchor="start">
        on miss
      </Caption>
      <Caption x={508} y={96} accent>
        warm
      </Caption>
    </DiagramFrame>
  );
}
