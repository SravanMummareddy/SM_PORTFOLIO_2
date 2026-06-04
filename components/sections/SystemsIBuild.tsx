import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

type PillarKind = "platform" | "intelligence" | "ai";

interface Pillar {
  id: string;
  kind: PillarKind;
  name: string;
  summary: string;
  capabilities: string[];
}

const PILLARS: Pillar[] = [
  {
    id: "P01",
    kind: "platform",
    name: "Backend Platforms",
    summary:
      "APIs, data models, and distributed services built to stay correct under load and change.",
    capabilities: ["REST APIs", "PostgreSQL", "Event pipelines", "Idempotency", "Caching"],
  },
  {
    id: "P02",
    kind: "intelligence",
    name: "Operational Intelligence",
    summary:
      "Turning messy real-world operations into structured, observable, auditable platforms.",
    capabilities: ["State machines", "Event timelines", "Dashboards", "Audit logs", "RBAC"],
  },
  {
    id: "P03",
    kind: "ai",
    name: "AI-Assisted Systems",
    summary:
      "AI applied where it improves the system — retrieval, automation, and assistance, not decoration.",
    capabilities: ["RAG retrieval", "Semantic search", "Workflow agents", "Embeddings"],
  },
];

function PillarGlyph({ kind }: { kind: PillarKind }) {
  const stroke = "#5e8bff";
  const node = "#c3ccd6";
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
      {kind === "platform" ? (
        <g>
          <rect x="8" y="10" width="32" height="8" rx="2" stroke={node} strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="8" y="20" width="32" height="8" rx="2" stroke={stroke} strokeOpacity="0.8" strokeWidth="1.5" />
          <rect x="8" y="30" width="32" height="8" rx="2" stroke={node} strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
      ) : null}
      {kind === "intelligence" ? (
        <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 12 H38 L30 24 V36 L18 30 V24 Z" strokeOpacity="0.6" />
          <circle cx="24" cy="33" r="2.5" fill={stroke} stroke="none" />
        </g>
      ) : null}
      {kind === "ai" ? (
        <g>
          <g stroke={stroke} strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="14" x2="28" y2="24" />
            <line x1="12" y1="34" x2="28" y2="24" />
            <line x1="38" y1="24" x2="28" y2="24" />
          </g>
          <circle cx="12" cy="14" r="3" fill={node} />
          <circle cx="12" cy="34" r="3" fill={node} />
          <circle cx="38" cy="24" r="3" fill={node} />
          <circle cx="28" cy="24" r="4" fill={stroke} />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * Section 3 — the three system domains Sravan builds in. Restrained
 * three-up of system panels (not feature cards): each pairs a small
 * schematic glyph with a domain and its concrete capabilities.
 */
export function SystemsIBuild() {
  return (
    <Section id="systems-i-build" eyebrow="Systems I Build" divider>
      <Reveal mode="rise" className="max-w-2xl">
        <Heading level={2}>
          Three kinds of systems, one way of thinking.
        </Heading>
        <Lead className="mt-6">
          The domain changes; the discipline doesn&apos;t — clear boundaries,
          honest data, and reliability designed in from the start.
        </Lead>
      </Reveal>

      <Stagger className="mt-14 grid gap-4 md:grid-cols-3" gap={0.1}>
        {PILLARS.map((pillar) => (
          <StaggerItem key={pillar.id} mode="settle">
            <Card variant="surface" padding="lg" className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <PillarGlyph kind={pillar.kind} />
                <MonoLabel className="text-text-faint">{pillar.id}</MonoLabel>
              </div>
              <Heading level={3} className="mt-6">
                {pillar.name}
              </Heading>
              <Text className="mt-3 text-sm">{pillar.summary}</Text>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                {pillar.capabilities.map((cap) => (
                  <li key={cap}>
                    <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary">
                      {cap}
                    </MonoLabel>
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
