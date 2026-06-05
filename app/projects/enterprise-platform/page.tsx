import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Text, MonoLabel, Heading } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import {
  CaseStudyHero,
  CaseStudyNav,
  CaseStudySection,
  Figure,
  DefinitionList,
  type DefinitionItem,
} from "@/components/case-study";
import {
  LegacyToModernDiagram,
  RetrievalApiDiagram,
  EventArchivalDiagram,
  DataQualityGateDiagram,
} from "@/components/projects/enterprise-platform";
import { PROJECTS } from "@/content/projects";

const project = PROJECTS.find((p) => p.slug === "enterprise-platform");

export const metadata: Metadata = {
  title: "Enterprise Document Intelligence — Platform Modernization",
  description:
    "Case study: an abstracted, enterprise-safe account of modernizing a high-volume document platform — API facade, object-storage migration, idempotent event-driven archival, cache-backed retrieval, and rule-based data-quality automation.",
};

const ENTITIES: { name: string; detail: string }[] = [
  { name: "Document", detail: "A stored artifact — statement, record, or generated file — with metadata." },
  { name: "Metadata index", detail: "Searchable attributes used to locate a document quickly." },
  { name: "Object store", detail: "Where document binaries live after migration off legacy storage." },
  { name: "Ingestion event", detail: "A message representing a new or updated document to archive." },
  { name: "Archive job", detail: "A unit of bulk document generation or archival work." },
  { name: "Validation rule", detail: "A declarative data-quality check applied before acceptance." },
  { name: "Cache", detail: "A fast layer in front of frequently retrieved documents." },
  { name: "Operational log", detail: "A record of processing outcomes for audit and reliability." },
];

const RELIABILITY: DefinitionItem[] = [
  {
    term: "Idempotent writes keyed on document + version",
    body: "Archival can be retried or replayed safely — an event delivered twice produces one archived document, never duplicates or corruption.",
  },
  {
    term: "A stable API facade over storage",
    body: "Putting a REST contract in front of storage let binaries migrate from legacy to object storage without consumers changing — a strangler migration with no big-bang cutover.",
  },
  {
    term: "Event-driven archival over monolithic batch",
    body: "Per-document events with retries and a dead-letter queue contain a failure to a single document instead of failing an entire nightly run.",
  },
  {
    term: "Cache-backed retrieval",
    body: "A cache in front of hot documents keeps common reads fast and shields object storage from repeated fetches.",
  },
  {
    term: "Declarative, auditable data-quality rules",
    body: "Validation expressed as rules separate from pipeline code, so coverage can grow without risky rewrites of the pipeline itself.",
  },
];

const TRADEOFFS: DefinitionItem[] = [
  {
    term: "Eventual consistency on archival",
    body: "Archival is asynchronous, so a just-created document can be momentarily behind in the archive. For this domain that's acceptable, and idempotency keeps it correct.",
  },
  {
    term: "Legacy and modern paths coexisting during migration",
    body: "Running both adds temporary complexity, but a gradual strangler cutover was far safer than a single migration event on a system that couldn't go down.",
  },
  {
    term: "Rule-based validation, not ML",
    body: "Deterministic, auditable rules suit a compliance-sensitive document domain better than a model whose decisions are hard to explain.",
  },
  {
    term: "Object storage with a relational index, not a document database",
    body: "Binaries belong in object storage with metadata indexed relationally; a specialized document database wasn't warranted for the access patterns.",
  },
];

const SCALING: DefinitionItem[] = [
  {
    term: "Tier and partition object storage",
    body: "Move cold documents to cheaper storage tiers and partition by time or type to keep retrieval and cost in check.",
  },
  {
    term: "Scale archival workers horizontally",
    body: "The event pipeline scales by adding consumers; partition the queue by document type or tenant to parallelize.",
  },
  {
    term: "Cache strategy by access pattern",
    body: "Tune TTLs, add a tier for the hottest documents, and pre-warm the cache ahead of predictable bulk runs.",
  },
  {
    term: "Backpressure and rate limits",
    body: "Protect object storage and downstream systems during ingestion spikes with backpressure and per-consumer limits.",
  },
  {
    term: "Observability across the pipeline",
    body: "Per-event tracing, archival-lag metrics, and dead-letter dashboards so failures surface before they accumulate.",
  },
  {
    term: "Continuous data-quality scoring",
    body: "Track validation pass rates over time to catch upstream data regressions early.",
  },
];

const WOULD_CHANGE = [
  "Invest in the idempotency keys and event-schema design earliest — they're the contracts everything else leans on.",
  "Make data-quality rules and their outcomes observable from day one, not a later addition.",
  "Define migration success metrics — coverage and parity — up front, so the legacy path can be retired with confidence.",
];

export default function EnterprisePlatformCaseStudy() {
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
          { label: "Role", value: "Backend engineer (team)" },
          { label: "Domain", value: "Enterprise document platforms" },
          { label: "Core", value: "Java · Spring · object storage" },
        ]}
      />

      <CaseStudySection
        index="01"
        title="The problem"
        lead="A large enterprise had decades of documents trapped in a legacy platform that was never built for today's retrieval volume or integration needs."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Storage was tied to aging infrastructure, retrieval was slow and
            tightly coupled to the consumers that depended on it, and ingestion
            and archival ran as brittle batch jobs where a single failure could
            sink an entire run. Modernizing it head-on was risky precisely
            because so much depended on it.
          </Text>
          <Text>
            As part of a backend team, I contributed to modernizing this
            platform: moving document storage to object storage, exposing clean
            REST APIs, and making ingestion and archival event-driven and
            reliable — without disrupting the systems already running on the old
            platform. The account here is intentionally abstracted and free of
            any confidential internal detail.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        title="System model"
        lead="The platform reduced to a handful of entities — documents and their metadata, the stores they live in, and the events and rules that move and guard them."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
      </CaseStudySection>

      <CaseStudySection
        index="03"
        title="Architecture"
        lead="A REST API facade decouples consumers from storage, so the hard migration can happen behind a stable contract."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            A Java/Spring REST API sits in front of document storage, so
            consumers depend on a stable contract rather than on where bytes
            actually live. Binaries were migrated from the legacy store into
            object storage; metadata stays in a relational store and serves as
            the index for retrieval, with a cache in front of hot documents.
          </Text>
          <Text>
            Ingestion and archival moved from monolithic batch to an
            event-driven pipeline. Crucially, the old and new paths coexist
            during migration — a strangler approach — so consumers move across
            gradually instead of through a single risky cutover.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Legacy → modern"
            aspect="aspect-[18/7]"
            caption="A stable API facade in front of storage: binaries migrate to object storage, metadata to a relational index, and hot reads to a cache — without consumers changing."
          >
            <LegacyToModernDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        title="Document retrieval flow"
        lead="Cache-backed retrieval behind a single contract, so consumers never know whether a document is legacy or modern."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            A retrieval request reaches the API with an identifier or query. The
            API checks the cache first; on a miss it resolves the document in the
            relational metadata index, fetches the binary from object storage,
            warms the cache, and returns it.
          </Text>
          <Text>
            Because the API is the stable contract, consumers don&apos;t know or
            care whether a document still lives in legacy storage or has moved to
            object storage. Cache-backed retrieval keeps frequently-accessed
            documents fast and reduces load on the object store.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Retrieval API"
            aspect="aspect-[16/5]"
            caption="A cache hit returns immediately; a miss falls through to metadata and object storage, then warms the cache for next time."
          >
            <RetrievalApiDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="05"
        title="Archival / event pipeline"
        lead="Archival as per-document events with idempotent writes, so failures stay contained instead of sinking a nightly batch."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Instead of a nightly batch that could fail wholesale, archival is
            event-driven: when a document is created or updated, an event is
            published, and archival workers consume it and write to object
            storage. Writes are idempotent — keyed on a document and version — so
            a redelivered or retried event archives exactly once.
          </Text>
          <Text>
            Failed events retry with backoff and, if they still fail, move to a
            dead-letter queue for inspection rather than blocking the pipeline.
            Bulk document generation still runs as batch where that fits, but
            feeds the same idempotent archival path.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Event archival"
            aspect="aspect-[16/5]"
            caption="A document change publishes an event; workers archive it exactly once with an idempotent key, retrying on failure and dead-lettering what can't be processed."
          >
            <EventArchivalDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="06"
        title="Data-quality automation"
        lead="A rule-based gate that catches bad data before it's archived, rather than after it causes a dispute."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            High-volume document systems accumulate bad data — missing metadata,
            malformed fields, mismatched references. I worked on rule-based
            validation that checks documents and metadata against defined rules
            before they&apos;re accepted or archived. Records that pass proceed;
            records that fail are flagged and routed for correction instead of
            being silently archived.
          </Text>
          <Text>
            The rules are declarative and auditable, so coverage can grow without
            rewriting pipeline code, and some bulk analysis ran with Python and
            Pandas over exported data. The aim was simple: make data quality a
            gate, not an afterthought.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Validation gate"
            aspect="aspect-[16/5]"
            caption="Incoming documents pass through a gate of declarative rules — accepted records archive, flagged records route for correction."
          >
            <DataQualityGateDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="07"
        title="Reliability decisions"
        lead="The choices that made a fragile legacy process into something that fails safely."
      >
        <DefinitionList items={RELIABILITY} />
      </CaseStudySection>

      <CaseStudySection
        index="08"
        title="Tradeoffs"
        lead="What was deliberately kept simple — and why, for enterprise infrastructure, that's usually right."
      >
        <DefinitionList items={TRADEOFFS} />
      </CaseStudySection>

      <CaseStudySection
        index="09"
        title="Scaling to 10x"
        lead="None of this is presented as built — it's where the pipeline would bend first, and how it would adapt."
      >
        <DefinitionList items={SCALING} />
      </CaseStudySection>

      <CaseStudySection index="10" title="Reflection" divider>
        <div className="max-w-2xl space-y-5">
          <Text>
            Contributing to this platform made the value of boring, reliable
            infrastructure concrete. An API facade plus idempotent, event-driven
            archival turned a fragile legacy process into something that could
            fail safely and migrate gradually.
          </Text>
          <Text>
            The biggest lever wasn&apos;t any single technology — it was
            decoupling consumers from storage, so a hard migration could happen
            behind a stable contract without anyone downstream feeling the seam.
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

      <CaseStudyNav currentSlug="enterprise-platform" />
    </>
  );
}
