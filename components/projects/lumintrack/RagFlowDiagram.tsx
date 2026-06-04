import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * RAG document retrieval. Uploaded documents are chunked and embedded
 * into the vector store on ingestion; a question is embedded, matched by
 * similarity, and answered from the top-k chunks with citations.
 */
export function RagFlowDiagram() {
  const h = 50;
  const store = { x: 470, y: 116, w: 156, h: 68 };

  return (
    <DiagramFrame title="LuminTrack RAG retrieval flow" viewBox="0 0 720 300">
      {/* Ingestion lane */}
      <Caption x={24} y={34} anchor="start">
        ingestion
      </Caption>
      <Wire x1={134} y1={70} x2={168} y2={70} arrow />
      <Wire x1={264} y1={70} x2={298} y2={70} arrow />
      {/* embed → store */}
      <Wire x1={394} y1={70} x2={store.x + 40} y2={store.y} arrow />

      <Box x={24} y={46} w={110} h={h} title="Document" sub="upload" />
      <Box x={168} y={46} w={96} h={h} title="Chunk" />
      <Box x={298} y={46} w={96} h={h} title="Embed" />

      {/* Vector store */}
      <Box {...store} title="Vector store" sub="pgvector" accent />

      {/* Query lane */}
      <Caption x={24} y={214} anchor="start">
        query
      </Caption>
      <Wire x1={134} y1={250} x2={168} y2={250} arrow />
      <Wire x1={264} y1={250} x2={298} y2={250} arrow />
      {/* retrieve → store (query) and store → retrieve (results) */}
      <Wire x1={360} y1={225} x2={store.x + 30} y2={store.y + store.h} dashed arrow />
      <Wire x1={store.x + 86} y1={store.y + store.h} x2={395} y2={225} accent arrow />
      {/* retrieve → answer */}
      <Wire x1={428} y1={250} x2={store.x} y2={250} accent arrow />

      <Box x={24} y={225} w={110} h={h} title="Question" />
      <Box x={168} y={225} w={96} h={h} title="Embed" />
      <Box x={298} y={225} w={130} h={h} title="Retrieve" sub="top-k" />
      <Box x={470} y={225} w={156} h={h} title="Answer" sub="with citations" accent />

      <Caption x={store.x + store.w / 2 + 10} y={206} accent>
        top-k chunks
      </Caption>
    </DiagramFrame>
  );
}
