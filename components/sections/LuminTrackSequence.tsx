"use client";

import { ScrollSequence } from "@/components/motion/ScrollSequence";
import { cn } from "@/lib/utils";

const EDGE = "#5e8bff";
const NODE = "#c3ccd6";
const ACCENT = "#5e8bff";

// Aligned state-machine positions (stage 1+).
const STATES = [
  { x: 30, y: 42 },
  { x: 64, y: 42 },
  { x: 98, y: 42 },
  { x: 132, y: 42 },
];
// Scatter offsets applied only at stage 0 (the "messy workflow").
const SCATTER = [
  { dx: -2, dy: 16 },
  { dx: -8, dy: -15 },
  { dx: 9, dy: 18 },
  { dx: -5, dy: -17 },
];

const STAGES = [
  { title: "Workflow problem", caption: "Manual workflow — disconnected and hard to trust." },
  { title: "State machine", caption: "A strict state machine structures every transition." },
  { title: "Event timeline", caption: "An event-sourced timeline records what happened." },
  { title: "AI retrieval", caption: "A RAG layer makes documents semantically searchable." },
];

function show(active: number, stage: number) {
  return active >= stage ? "opacity-100" : "opacity-0";
}

function Visual({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 160 110" className="h-full w-full" fill="none" aria-hidden>
      {/* Connections — state machine (stage 1) */}
      <g
        className={cn("transition-opacity duration-500", show(active, 1))}
        stroke={EDGE}
        strokeOpacity="0.4"
        strokeWidth="1.25"
        strokeLinecap="round"
      >
        <line x1="30" y1="42" x2="64" y2="42" />
        <line x1="64" y1="42" x2="98" y2="42" />
        <line x1="98" y1="42" x2="132" y2="42" />
        <line x1="98" y1="42" x2="98" y2="64" />
        <line x1="98" y1="64" x2="64" y2="64" />
      </g>

      {/* State nodes — present from stage 0, scattered then aligning */}
      {STATES.map((s, i) => {
        const scattered = active === 0;
        const dx = scattered ? SCATTER[i].dx : 0;
        const dy = scattered ? SCATTER[i].dy : 0;
        return (
          <g
            key={i}
            style={{
              transform: `translate(${dx}px, ${dy}px)`,
              transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <circle
              cx={s.x}
              cy={s.y}
              r={i === 1 ? 5 : 4.5}
              fill={i === 1 && active >= 1 ? ACCENT : NODE}
              fillOpacity={scattered ? 0.55 : 1}
              style={{ transition: "fill 500ms, fill-opacity 500ms" }}
            />
          </g>
        );
      })}
      {/* Sub-states for the branch (stage 1) */}
      <g className={cn("transition-opacity duration-500", show(active, 1))}>
        <circle cx="64" cy="64" r="3.5" fill={NODE} />
        <circle cx="98" cy="64" r="3.5" fill={NODE} />
      </g>

      {/* Event timeline (stage 2) */}
      <g className={cn("transition-opacity duration-500", show(active, 2))}>
        <line x1="22" y1="88" x2="138" y2="88" stroke={NODE} strokeOpacity="0.35" strokeWidth="1.25" />
        {[30, 52, 74, 96, 118].map((x) => (
          <line key={x} x1={x} y1="84" x2={x} y2="92" stroke={EDGE} strokeOpacity="0.6" strokeWidth="1.25" strokeLinecap="round" />
        ))}
      </g>

      {/* AI retrieval layer (stage 3) */}
      <g className={cn("transition-opacity duration-700", show(active, 3))}>
        <line
          x1="132"
          y1="20"
          x2="98"
          y2="42"
          stroke={ACCENT}
          strokeOpacity="0.5"
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />
        <circle cx="132" cy="20" r="11" fill="rgba(94,139,255,0.16)" />
        <circle cx="132" cy="20" r="5" fill={ACCENT} />
      </g>
    </svg>
  );
}

/**
 * LuminTrack's featured story, told by scroll. As the row passes through
 * the viewport it advances through four stages — workflow problem → state
 * machine → event timeline → AI retrieval — building one cumulative
 * schematic. No pin, no added page height; reduced motion shows the final
 * assembled system.
 */
export function LuminTrackSequence() {
  return (
    <ScrollSequence steps={4} className="flex flex-col">
      {(active) => (
        <>
          <div className="aspect-[16/10] w-full p-4">
            <Visual active={active} />
          </div>
          <div className="flex items-center gap-3 border-t border-border px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              {STAGES.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 w-5 rounded-full transition-colors duration-300",
                    i <= active ? "bg-accent" : "bg-border-strong",
                  )}
                />
              ))}
            </div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-tertiary">
              {STAGES[active].title}
            </span>
          </div>
          {/* Fixed height keeps the card geometry stable across stages —
              no layout shift, and the ScrollTrigger range stays constant. */}
          <p className="flex min-h-[3.25rem] items-start px-4 pb-4 text-sm text-text-secondary">
            {STAGES[active].caption}
          </p>
        </>
      )}
    </ScrollSequence>
  );
}
