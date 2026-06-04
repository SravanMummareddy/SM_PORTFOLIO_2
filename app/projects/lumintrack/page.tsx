import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Text, MonoLabel, Heading } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import {
  CaseStudyHero,
  CaseStudySection,
  Figure,
  DefinitionList,
  type DefinitionItem,
} from "@/components/case-study";
import {
  ArchitectureDiagram,
  StateMachineDiagram,
  EventTimelineDiagram,
  RagFlowDiagram,
} from "@/components/projects/lumintrack";
import { PROJECTS } from "@/content/projects";

const project = PROJECTS.find((p) => p.slug === "lumintrack");

export const metadata: Metadata = {
  title: "LuminTrack — Workflow Intelligence Platform",
  description:
    "Case study: a state-machine workflow platform with an event-sourced activity timeline, WebSocket updates, and RAG document search, backed by PostgreSQL.",
};

const ENTITIES: { name: string; detail: string }[] = [
  { name: "Workflow item", detail: "The unit that moves through the process — always in exactly one state." },
  { name: "State", detail: "The allowed states and the strict transitions permitted between them." },
  { name: "Event", detail: "An immutable record of every action; the timeline is the source of truth." },
  { name: "Document", detail: "Uploaded files, chunked and embedded for semantic retrieval." },
  { name: "User & role", detail: "Role-based authorization enforced on every command." },
  { name: "Session", detail: "OAuth 2.0 identity with stateless, verifiable JWT tokens." },
];

const DECISIONS: DefinitionItem[] = [
  {
    term: "State machine over status flags",
    body: "A strict transition table makes invalid states unrepresentable and keeps the workflow's rules in one place, rather than scattered across conditionals throughout the code.",
  },
  {
    term: "Event sourcing over a mutable status column",
    body: "Every action appends an immutable event, giving a complete audit trail. Current state is a cheap projection of that log, so history is never overwritten or lost.",
  },
  {
    term: "WebSockets over polling",
    body: "Operational dashboards need to reflect a transition the moment it happens. A push channel avoids both stale views and the load of aggressive polling.",
  },
  {
    term: "PostgreSQL — including the vectors",
    body: "The data is relational and invariant-heavy: one state per item, referential integrity throughout. Keeping document embeddings in the same Postgres (via pgvector) avoids operating a second datastore before scale demands it.",
  },
  {
    term: "RAG over keyword search",
    body: "Uploaded documents are unstructured. Embedding-based retrieval answers questions keyword search can't — and every answer cites the source chunk it was drawn from.",
  },
  {
    term: "OAuth 2.0 + JWT sessions",
    body: "Identity is delegated; sessions stay stateless and verifiable on each request. Every transition is authorized by role on the server, never trusted from the client.",
  },
];

const TRADEOFFS: DefinitionItem[] = [
  {
    term: "Single Postgres, not a dedicated vector database",
    body: "pgvector is simpler to operate and good enough at the current corpus size. A specialized ANN index earns its keep once retrieval latency or recall starts to suffer.",
  },
  {
    term: "Events in Postgres, not a message broker",
    body: "There is no cross-service fan-out or replay requirement yet, so an append-only events table beats standing up Kafka and the operational weight that comes with it.",
  },
  {
    term: "Synchronous embedding on upload",
    body: "For modest file sizes, embedding inline keeps the system simple. It becomes a background job the moment uploads grow large enough to block a request.",
  },
  {
    term: "Role-level access, not per-field permissions",
    body: "Coarse RBAC matches the operational model today. Finer-grained permissions would add real complexity without a current need to justify it.",
  },
];

const SCALING: DefinitionItem[] = [
  {
    term: "Queue-backed ingestion",
    body: "Move chunking and embedding to background workers so uploads return immediately and ingestion can absorb spikes instead of blocking the request path.",
  },
  {
    term: "Dedicated vector index",
    body: "Promote retrieval to a tuned ANN index (HNSW / IVFFlat) or a separate vector service, with caching for hot queries.",
  },
  {
    term: "Read replicas for reads",
    body: "Route dashboard and search traffic to replicas, keeping the primary for transactional writes and state transitions.",
  },
  {
    term: "Event retention and snapshots",
    body: "Partition and archive old events, and snapshot state periodically so projecting an item's current state stays cheap as the log grows.",
  },
  {
    term: "Observability across both layers",
    body: "Structured logs, per-transition metrics, and retrieval-quality monitoring — to catch regressions in the workflow and the AI layer alike.",
  },
];

const WOULD_CHANGE = [
  "Define the event schema and its versioning earlier — renaming event types after data exists is painful.",
  "Stand up a retrieval evaluation harness from the start, rather than judging relevance by eye.",
  "Draw the state machine before writing endpoints; the transitions are the real specification.",
];

export default function LuminTrackCaseStudy() {
  if (!project) notFound();

  return (
    <>
      <CaseStudyHero
        name={project.name}
        kind={project.kind}
        status={project.status}
        positioning={project.positioning}
        focus={project.focus}
        meta={[
          { label: "Role", value: "Solo engineer" },
          { label: "Domain", value: "Operational workflows" },
          { label: "Core stack", value: "Next.js · PostgreSQL · WebSockets" },
        ]}
      />

      <CaseStudySection
        index="01"
        title="The problem"
        lead="Multi-stage operational processes tend to run on spreadsheets, email threads, and shared drives."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            State lives in someone&apos;s head or a colour-coded cell. History
            is scattered across inboxes, so no one can reliably answer the
            operational questions that matter: what state is this in, who moved
            it, when, and why. The documents attached to a process are just as
            stranded — searchable only by whoever remembers where they were
            filed.
          </Text>
          <Text>
            LuminTrack&apos;s goal is to turn that ad-hoc process into a
            structured system: one where every item has a well-defined state,
            every change is recorded, live views stay current, and the
            documents behind a process are actually searchable.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        title="System model"
        lead="A small set of entities, modeled so the system's invariants hold by construction."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ENTITIES.map((entity) => (
            <li key={entity.name}>
              <Reveal mode="rise">
                <Card variant="outline" padding="md" className="h-full">
                  <MonoLabel className="text-accent-strong">
                    {entity.name}
                  </MonoLabel>
                  <Text className="mt-2 text-sm">{entity.detail}</Text>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-8">
          <Figure
            label="State machine"
            aspect="aspect-[18/7]"
            caption="Every item occupies exactly one state. Only the drawn transitions are legal, and each is validated on the server before it is allowed."
          >
            <StateMachineDiagram />
          </Figure>
          <Figure
            label="Event timeline"
            aspect="aspect-[12/5]"
            caption="Each action appends an immutable event. The current state is a projection of that append-only log, so the full history is always recoverable."
          >
            <EventTimelineDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="03"
        title="Architecture"
        lead="A thin client over a push-capable API, a handful of focused services, and one database doing more than one job."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            The client talks to the API over REST for commands and queries, and
            holds a WebSocket connection for live updates. Behind the API, the
            state-machine service validates each transition and writes the
            resulting event in a single transaction — the event store and the
            current-state projection never disagree.
          </Text>
          <Text>
            Document intelligence runs alongside the workflow rather than as a
            separate product: uploads are chunked, embedded, and stored as
            vectors in the same PostgreSQL instance, and questions are answered
            by retrieving against them. Authentication is delegated via OAuth
            2.0, with JWT sessions authorized by role on every request.
          </Text>
        </div>

        <div className="mt-10 space-y-8">
          <Figure
            label="Architecture"
            aspect="aspect-[12/5]"
            caption="Client over REST + WebSocket, an API layer fronting the core services, all backed by a single PostgreSQL that also stores document vectors."
          >
            <ArchitectureDiagram />
          </Figure>
          <Figure
            label="RAG retrieval"
            aspect="aspect-[12/5]"
            caption="Documents are embedded on ingestion; a question is embedded, matched by similarity, and answered from the top-k chunks with citations."
          >
            <RagFlowDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        title="Technical decisions"
        lead="The choices that shaped the system — and the reasoning behind each."
      >
        <DefinitionList items={DECISIONS} />
      </CaseStudySection>

      <CaseStudySection
        index="05"
        title="Tradeoffs"
        lead="What was deliberately left unbuilt. Knowing what not to build is part of the design."
      >
        <DefinitionList items={TRADEOFFS} />
      </CaseStudySection>

      <CaseStudySection
        index="06"
        title="Scaling to 10x"
        lead="None of this is built yet — it's where the current design would bend first, and how it would adapt."
      >
        <DefinitionList items={SCALING} />
      </CaseStudySection>

      <CaseStudySection index="07" title="Reflection" divider>
        <div className="max-w-2xl space-y-5">
          <Text>
            Modeling the workflow as a state machine plus an event log first
            turned out to be the decision everything else leaned on. The
            timeline, the audit trail, and the groundwork for analytics all fell
            out of that foundation rather than being bolted on later.
          </Text>
          <Text>
            Treating the AI layer as retrieval over the system&apos;s own
            documents — not a bolt-on chatbot — kept it honest: answers stay
            grounded in real source material and cite where they came from.
          </Text>
        </div>

        <div className="mt-10 max-w-2xl">
          <Heading level={3} className="text-h3">
            What I would change
          </Heading>
          <ul className="mt-6 space-y-4">
            {WOULD_CHANGE.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
                />
                <Text className="text-sm md:text-base">{item}</Text>
              </li>
            ))}
          </ul>
        </div>
      </CaseStudySection>

      <Section divider className="text-center">
        <Reveal mode="rise" className="mx-auto max-w-xl">
          <Heading level={2}>Explore the rest of the work.</Heading>
          <Text className="mx-auto mt-5 max-w-md">
            More case studies are being written. The index has the full set of
            systems and where each one stands.
          </Text>
          <div className="mt-8 flex justify-center">
            <Button href="/projects" variant="secondary">
              All projects
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
