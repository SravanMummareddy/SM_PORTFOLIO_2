import type { GlyphVariant } from "@/components/sections/ProjectGlyph";

/**
 * Single source of truth for the featured engineering stories. Consumed
 * by the homepage previews, the /projects index, and the case-study
 * pages so project metadata never drifts across surfaces.
 */
export interface ProjectMeta {
  index: string;
  slug: string;
  name: string;
  kind: string;
  status: string;
  positioning: string;
  focus: string[];
  glyph: GlyphVariant;
  /** True only when a deep case-study page exists at /projects/{slug}. */
  hasCaseStudy: boolean;
}

export const PROJECTS: ProjectMeta[] = [
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
    hasCaseStudy: true,
  },
  {
    index: "02",
    slug: "enterprise-platform",
    name: "Enterprise Document Intelligence",
    kind: "Platform Modernization",
    status: "Enterprise Abstract",
    positioning:
      "A backend platform modernizing high-volume enterprise document retrieval, archival, and ingestion — event-driven, idempotent, and cache-backed.",
    focus: ["REST APIs", "Object storage", "Idempotency", "Event pipeline", "Caching"],
    glyph: "pipeline",
    hasCaseStudy: true,
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
    hasCaseStudy: true,
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
    hasCaseStudy: true,
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
    hasCaseStudy: false,
  },
];

/**
 * Where a project preview should link. Only LuminTrack has a deep
 * case study today; the rest route to the index so no link 404s.
 */
export function projectHref(project: ProjectMeta): string {
  return project.hasCaseStudy ? `/projects/${project.slug}` : "/projects";
}
