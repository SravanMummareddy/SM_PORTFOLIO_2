import type { PillarKind } from "@/components/systems/PillarGlyph";

/**
 * Single source of truth for the three engineering pillars. Consumed by
 * the homepage "Systems I Build" cards (via `code` / `name` / `summary` /
 * `capabilities`) and the full /systems philosophy page. Related work is
 * referenced by id so it never drifts: `projects` are slugs in
 * content/projects.ts, `experience` are company names in
 * content/experience.ts, and `articles` are slugs in content/writing.ts.
 */
export interface SystemPillar {
  /** Short code label, e.g. "P01". */
  code: string;
  /** Anchor id on /systems, e.g. "backend-platforms". */
  slug: string;
  /** Drives the schematic glyph. */
  kind: PillarKind;
  name: string;
  /** One line — the homepage card summary. */
  summary: string;
  /** The longer "why" — the philosophy of the pillar. */
  philosophy: string;
  /** Architecture concepts the pillar exercises. */
  concepts: string[];
  /** Concrete technical patterns. */
  patterns: string[];
  /** Capability chips shown on the homepage card. */
  capabilities: string[];
  /** Related case studies — slugs in content/projects.ts. */
  projects: string[];
  /** Related experience — company names in content/experience.ts. */
  experience: string[];
  /** Related writing — slugs in content/writing.ts. */
  articles: string[];
}

export const PILLARS: SystemPillar[] = [
  {
    code: "P01",
    slug: "backend-platforms",
    kind: "platform",
    name: "Backend Platforms",
    summary:
      "APIs, data models, and distributed services built to stay correct under load and change.",
    philosophy:
      "Backend systems are the part nobody sees and everything depends on. The discipline is correctness under load and change: clear API contracts, honest data models, and reliability designed in rather than bolted on later. A platform earns trust by failing safely — and by evolving (migrating, scaling, integrating) without breaking the systems already built on top of it.",
    concepts: [
      "REST API contracts",
      "Relational data modeling",
      "Idempotent writes",
      "Event-driven pipelines",
      "Caching strategy",
      "Strangler migration",
    ],
    patterns: [
      "Idempotency keyed on entity + version",
      "A stable API facade over storage",
      "Event queue with retries and a dead-letter",
      "Read-through cache for hot reads",
      "Composite indexing on hot join paths",
      "Versioned endpoints for safe evolution",
    ],
    capabilities: ["REST APIs", "PostgreSQL", "Event pipelines", "Idempotency", "Caching"],
    projects: ["enterprise-platform", "lumintrack"],
    experience: ["Infor", "MLGW"],
    articles: ["legacy-modernization"],
  },
  {
    code: "P02",
    slug: "operational-intelligence",
    kind: "intelligence",
    name: "Operational Intelligence",
    summary:
      "Turning messy real-world operations into structured, observable, auditable platforms.",
    philosophy:
      "Real operations are messy — partial states, exceptions, things that must be auditable after the fact. Operational intelligence means modeling that mess honestly: explicit state machines instead of scattered boolean flags, event-sourced history instead of last-write-wins, and dashboards that read from structured truth rather than guesses. The goal is a system operators can trust, explain, and reconcile.",
    concepts: [
      "State machines",
      "Event sourcing",
      "Audit logging",
      "Transactional consistency",
      "Role-based access",
      "Operational dashboards",
    ],
    patterns: [
      "Explicit status + transition table",
      "Append-only ledgers",
      "Idempotent state transitions",
      "Payment allocation across invoices",
      "Inventory reconciliation",
      "Precomputed analytics rollups",
    ],
    capabilities: ["State machines", "Event timelines", "Dashboards", "Audit logs", "RBAC"],
    projects: ["kgd-erp", "lumintrack", "edgestack"],
    experience: [],
    articles: ["state-machines-workflows"],
  },
  {
    code: "P03",
    slug: "ai-assisted-systems",
    kind: "ai",
    name: "AI-Assisted Systems",
    summary:
      "AI applied where it improves the system — retrieval, automation, and assistance, not decoration.",
    philosophy:
      "AI earns its place on top of systems that already model real work. The valuable layer is retrieval over real documents, automation of real toil, and assistance a human still governs — not intelligence bolted on for its own sake. The mental model is an old one: treat the model as a fast, capable, occasionally-wrong service — constrain what it can do, validate its output at the boundary, and keep irreversible actions gated behind a human or a deterministic check.",
    concepts: [
      "RAG retrieval",
      "Semantic search",
      "Embeddings + pgvector",
      "Human-in-the-loop",
      "Agentic workflows",
      "Untrusted-service boundaries",
    ],
    patterns: [
      "Embedding + vector search",
      "Retrieval-augmented answers",
      "Draft-then-dispose review",
      "Confidence-gated actions",
      "Output validation at the boundary",
    ],
    capabilities: ["RAG retrieval", "Semantic search", "Workflow agents", "Embeddings"],
    projects: ["cadence-orbit", "lumintrack"],
    experience: [],
    articles: ["ai-agents-internal-tools"],
  },
];
