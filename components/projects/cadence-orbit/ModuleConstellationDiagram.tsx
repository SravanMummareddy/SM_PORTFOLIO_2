import { Box, Wire, Caption, DiagramFrame } from "@/components/case-study/diagram-kit";

/**
 * Modular constellation. A shared data core sits at the centre; each
 * life domain — notes, routines, tasks, nutrition, fasting, mood, body
 * metrics, gallery — is an independent module orbiting it, reading and
 * writing through the same core rather than owning isolated storage.
 */
export function ModuleConstellationDiagram() {
  const cx = 360;
  const cy = 168;
  const rx = 252;
  const ry = 116;
  const w = 104;
  const h = 40;

  const modules: { label: string; sub?: string; deg: number }[] = [
    { label: "Notes", deg: -90 },
    { label: "Routines", deg: -38 },
    { label: "Tasks", deg: 0 },
    { label: "Nutrition", deg: 38 },
    { label: "Fasting", deg: 90 },
    { label: "Mood", deg: 142 },
    { label: "Body", sub: "metrics", deg: 180 },
    { label: "Gallery", deg: 218 },
  ];

  const pos = (deg: number) => {
    const r = (deg * Math.PI) / 180;
    return { x: cx + rx * Math.cos(r), y: cy + ry * Math.sin(r) };
  };

  return (
    <DiagramFrame title="Module constellation around a shared core" viewBox="0 0 720 336">
      <Caption x={24} y={24} anchor="start">
        eight domains · one shared core · insights read across all of them
      </Caption>

      {modules.map((m) => {
        const p = pos(m.deg);
        return <Wire key={m.label} x1={cx} y1={cy} x2={p.x} y2={p.y} />;
      })}

      <Box x={cx - 70} y={cy - 30} w={140} h={60} title="Shared core" sub="one data layer" accent />

      {modules.map((m) => {
        const p = pos(m.deg);
        return (
          <Box
            key={m.label}
            x={p.x - w / 2}
            y={p.y - h / 2}
            w={w}
            h={h}
            title={m.label}
            sub={m.sub}
          />
        );
      })}
    </DiagramFrame>
  );
}
