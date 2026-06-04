import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Offline-first PWA. The app writes to a local store first, so it works
 * with no connection; a sync queue holds pending writes and flushes to
 * the backend when the network returns, then reconciles changes back.
 * A service worker caches the shell so the app loads offline.
 */
export function PwaOfflineSyncDiagram() {
  const y = 96;
  const h = 50;
  const mid = y + h / 2;

  const ui = { x: 24, y, w: 110, h };
  const local = { x: 176, y, w: 140, h };
  const queue = { x: 358, y, w: 140, h };
  const backend = { x: 556, y, w: 140, h };

  return (
    <DiagramFrame title="Offline-first PWA sync" viewBox="0 0 720 244">
      <Caption x={24} y={22} anchor="start">
        local-first writes · queue flushes when online · reconcile on reconnect
      </Caption>

      {/* service worker shell */}
      <Box x={176} y={32} w={322} h={34} title="Service worker · offline shell" />
      <Wire x1={246} y1={66} x2={246} y2={y} dashed />
      <Wire x1={428} y1={66} x2={428} y2={y} dashed />

      {/* main flow */}
      <Wire x1={ui.x + ui.w} y1={mid} x2={local.x} y2={mid} accent arrow />
      <Wire x1={local.x + local.w} y1={mid} x2={queue.x} y2={mid} arrow />
      <Wire x1={queue.x + queue.w} y1={mid} x2={backend.x} y2={mid} dashed arrow />

      {/* reconcile loop back to local store */}
      <Wire x1={backend.x + backend.w / 2} y1={y + h} x2={backend.x + backend.w / 2} y2={206} />
      <Wire x1={backend.x + backend.w / 2} y1={206} x2={local.x + local.w / 2} y2={206} dashed arrow />
      <Wire x1={local.x + local.w / 2} y1={206} x2={local.x + local.w / 2} y2={y + h} />

      <Box {...ui} title="App UI" />
      <Box {...local} title="Local store" sub="IndexedDB" accent />
      <Box {...queue} title="Sync queue" sub="pending writes" />
      <Box {...backend} title="Backend" sub="sync API" />

      <Caption x={queue.x + queue.w + 12} y={mid - 12} anchor="start">
        when online
      </Caption>
      <Caption x={420} y={224}>
        reconcile on reconnect
      </Caption>
    </DiagramFrame>
  );
}
