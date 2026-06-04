import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * System architecture: client over REST + WebSocket, an API layer in
 * front of the core services (state machine, event store, retrieval,
 * auth), all backed by a single PostgreSQL instance that also holds the
 * document vectors.
 */
export function ArchitectureDiagram() {
  // Service column geometry.
  const sx = 408;
  const sw = 152;
  const services = [
    { y: 30, title: "State machine", sub: "transitions", accent: true },
    { y: 92, title: "Event store", sub: "append-only" },
    { y: 154, title: "Retrieval", sub: "RAG" },
    { y: 216, title: "Auth", sub: "OAuth2 · JWT" },
  ];
  const apiRightX = 352;
  const apiMidY = 178;
  const dataX = 600;

  return (
    <DiagramFrame title="LuminTrack system architecture" viewBox="0 0 720 300">
      <Caption x={84} y={150} accent>
        live updates
      </Caption>

      {/* Client → API (live path) */}
      <Wire x1={148} y1={178} x2={sx - 56} y2={178} accent arrow />
      {/* API → services */}
      {services.map((s) => (
        <Wire
          key={s.title}
          x1={apiRightX}
          y1={apiMidY}
          x2={sx}
          y2={s.y + 26}
          accent={s.accent}
          arrow
        />
      ))}
      {/* Services → PostgreSQL (data-bound services only) */}
      {services.slice(0, 3).map((s) => (
        <Wire
          key={`d-${s.title}`}
          x1={sx + sw}
          y1={s.y + 26}
          x2={dataX}
          y2={108 + (s.y - 30) * 0.6}
          arrow
        />
      ))}

      <Box x={20} y={160} w={128} h={56} title="Web client" sub="React · WS" />
      <Box x={252} y={150} w={100} h={56} title="API layer" sub="REST · WS" />

      {services.map((s) => (
        <Box
          key={`b-${s.title}`}
          x={sx}
          y={s.y}
          w={sw}
          h={52}
          title={s.title}
          sub={s.sub}
          accent={s.accent}
        />
      ))}

      <Box
        x={dataX}
        y={96}
        w={104}
        h={120}
        title="PostgreSQL"
        sub="items · events"
        accent
      />
      <Caption x={dataX + 52} y={192}>
        + embeddings
      </Caption>
    </DiagramFrame>
  );
}
