import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectGlyph, type GlyphVariant } from "./ProjectGlyph";

interface Project {
  index: string;
  slug: string;
  name: string;
  kind: string;
  status: string;
  positioning: string;
  focus: string[];
  glyph: GlyphVariant;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    slug: "lumintrack",
    name: "LuminTrack",
    kind: "Workflow Intelligence Platform",
    status: "Active Build",
    positioning:
      "A state-machine workflow platform for multi-stage operational processes — with an event-sourced activity timeline and RAG search over uploaded documents.",
    focus: ["State machine", "Event timeline", "RAG search", "WebSockets", "PostgreSQL"],
    glyph: "workflow",
  },
  {
    index: "02",
    slug: "enterprise-document-intelligence",
    name: "Enterprise Document Intelligence",
    kind: "Platform Modernization",
    status: "Enterprise Abstract",
    positioning:
      "A backend platform modernizing high-volume enterprise document retrieval, archival, and ingestion — event-driven, idempotent, and cache-backed.",
    focus: ["REST APIs", "Object storage", "Idempotency", "Event pipeline", "Caching"],
    glyph: "pipeline",
  },
  {
    index: "03",
    slug: "kgd-erp",
    name: "KGD ERP",
    kind: "Manufacturing Operations Platform",
    status: "Production Beta",
    positioning:
      "An operations platform for a real manufacturing business — invoices, payments, ledgers, and inventory modeled as one transactional, auditable system.",
    focus: ["Ledger consistency", "Payment allocation", "Inventory sync", "Audit logging"],
    glyph: "ledger",
  },
  {
    index: "04",
    slug: "cadence-orbit",
    name: "Cadence Orbit",
    kind: "Personal Intelligence OS",
    status: "Experimental System",
    positioning:
      "A modular personal operating system unifying routines, health, notes, and tasks into cross-domain insight — built mobile-first as an installable PWA.",
    focus: ["Modular domains", "Cross-module insight", "PWA", "Data modeling"],
    glyph: "orbit",
  },
  {
    index: "05",
    slug: "edgestack",
    name: "EdgeStack",
    kind: "Decision Intelligence Platform",
    status: "Experimental System",
    positioning:
      "A behavioral analytics and decision-training platform for high-variance, skill-based environments — versioned APIs, session modeling, and offline sync.",
    focus: ["Versioned API", "Session modeling", "Offline sync", "Decision scoring"],
    glyph: "decision",
  },
];

function StatusTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-control border border-border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-tertiary">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/**
 * Section 4 — featured engineering stories as system previews, not a
 * card grid. Each project is a full-width editorial row pairing a
 * concise positioning with an architecture-hint schematic. Deep detail
 * lives on the (later) case-study pages these link toward.
 */
export function FeaturedWork() {
  return (
    <Section id="work" eyebrow="Featured Engineering Stories" divider>
      <Reveal mode="rise" className="max-w-2xl">
        <Heading level={2}>Each project is a different systems problem.</Heading>
        <Lead className="mt-6">
          Not a portfolio of apps — a set of operational systems, each solving
          a distinct architecture, data, or workflow challenge.
        </Lead>
      </Reveal>

      <ul className="mt-12 border-t border-border">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Reveal mode="rise">
              <a
                href={`/projects/${project.slug}`}
                className="group grid items-center gap-8 border-b border-border py-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <MonoLabel className="text-text-faint">
                      {project.index}
                    </MonoLabel>
                    <StatusTag>{project.status}</StatusTag>
                  </div>

                  <Heading
                    level={3}
                    className="mt-5 transition-colors duration-[var(--duration-base)] group-hover:text-white"
                  >
                    {project.name}
                  </Heading>
                  <MonoLabel className="mt-1 block text-accent-strong">
                    {project.kind}
                  </MonoLabel>

                  <Text className="mt-4 max-w-xl text-sm">
                    {project.positioning}
                  </Text>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.focus.map((item) => (
                      <li key={item}>
                        <MonoLabel className="rounded-control border border-border px-2 py-1 text-text-tertiary">
                          {item}
                        </MonoLabel>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                    Read the case study
                    <span
                      aria-hidden
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                {/* Architecture hint */}
                <Card
                  variant="glass"
                  padding="none"
                  className="aspect-[16/11] w-full overflow-hidden transition-colors duration-[var(--duration-base)] group-hover:border-border-accent"
                >
                  <div className="h-full w-full p-4">
                    <ProjectGlyph variant={project.glyph} />
                  </div>
                </Card>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
