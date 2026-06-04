import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Mobile offline sync. The app logs decisions to a local store first, so
 * a session is never blocked by connectivity. A sync queue flushes
 * pending writes to a versioned REST API when online; the server
 * reconciles per session and changes flow back to the device.
 */
export function OfflineSyncDiagram() {
  const y = 96;
  const h = 50;
  const mid = y + h / 2;

  const ui = { x: 24, y, w: 116, h };
  const local = { x: 182, y, w: 140, h };
  const queue = { x: 364, y, w: 140, h };
  const api = { x: 556, y, w: 140, h };

  return (
    <DiagramFrame title="Mobile offline sync via versioned API" viewBox="0 0 720 244">
      <Caption x={24} y={22} anchor="start">
        log offline · queue flushes to a versioned API when online · reconcile per session
      </Caption>

      {/* service worker shell */}
      <Box x={182} y={32} w={322} h={34} title="Service worker · offline shell" />
      <Wire x1={252} y1={66} x2={252} y2={y} dashed />
      <Wire x1={434} y1={66} x2={434} y2={y} dashed />

      {/* main flow */}
      <Wire x1={ui.x + ui.w} y1={mid} x2={local.x} y2={mid} accent arrow />
      <Wire x1={local.x + local.w} y1={mid} x2={queue.x} y2={mid} arrow />
      <Wire x1={queue.x + queue.w} y1={mid} x2={api.x} y2={mid} dashed arrow />

      {/* reconcile loop back to local store */}
      <Wire x1={api.x + api.w / 2} y1={y + h} x2={api.x + api.w / 2} y2={206} />
      <Wire x1={api.x + api.w / 2} y1={206} x2={local.x + local.w / 2} y2={206} dashed arrow />
      <Wire x1={local.x + local.w / 2} y1={206} x2={local.x + local.w / 2} y2={y + h} />

      <Box {...ui} title="Log UI" />
      <Box {...local} title="Local store" sub="device-first" accent />
      <Box {...queue} title="Sync queue" sub="pending writes" />
      <Box {...api} title="Versioned API" sub="v1 · v2" />

      <Caption x={queue.x + queue.w + 12} y={mid - 12} anchor="start">
        when online
      </Caption>
      <Caption x={424} y={224}>
        reconcile per session
      </Caption>
    </DiagramFrame>
  );
}
