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
  ModuleConstellationDiagram,
  PersonalDataGraphDiagram,
  InsightEngineDiagram,
  PwaOfflineSyncDiagram,
} from "@/components/projects/cadence-orbit";
import { PROJECTS } from "@/content/projects";

const project = PROJECTS.find((p) => p.slug === "cadence-orbit");

export const metadata: Metadata = {
  title: "Cadence Orbit — Personal Intelligence OS",
  description:
    "Case study: a modular personal operating system unifying notes, routines, tasks, nutrition, fasting, mood, body metrics, and gallery into one cross-domain data graph — an installable, offline-first PWA.",
};

const MODULES: { name: string; detail: string }[] = [
  { name: "Notes", detail: "Free-form capture, linked to days and tags like any other entry." },
  { name: "Routines", detail: "Recurring habits and checklists tracked against a schedule." },
  { name: "Tasks", detail: "One-off and project work with state and due dates." },
  { name: "Nutrition", detail: "Meals and intake logged as typed, timestamped entries." },
  { name: "Fasting", detail: "Fasting windows with start, end, and duration." },
  { name: "Mood", detail: "Lightweight check-ins that become a signal over time." },
  { name: "Body metrics", detail: "Weight and similar measurements as a time series." },
  { name: "Gallery", detail: "Progress photos and media, anchored to the same timeline." },
];

const MODULAR: DefinitionItem[] = [
  {
    term: "Each module owns its domain",
    body: "A module defines its own screens and rules but never its own storage format — it speaks the shared entry shape, so domains stay independent without fragmenting the data.",
  },
  {
    term: "One shared entry shape",
    body: "Every record carries a timestamp, a type, a value, and tags. Heterogeneous domains — a meal, a mood, a measurement — all reduce to the same primitive.",
  },
  {
    term: "A common day + tag axis",
    body: "Because everything is stamped with time and tags, unrelated modules line up on a single timeline, which is what makes cross-module questions possible at all.",
  },
  {
    term: "Add a module without a migration",
    body: "A new domain is a new module plus a new entry type — it joins the graph and the insight layer for free, instead of a schema change rippling through the app.",
  },
];

const TRADEOFFS: DefinitionItem[] = [
  {
    term: "A shared entry shape over per-module schemas",
    body: "A generic typed entry is less precise than a bespoke table per domain, but it's what lets eight modules share one timeline and one insight engine. For a personal OS that tradeoff is clearly worth it.",
  },
  {
    term: "Offline-first over server-authoritative",
    body: "Local-first writes add sync and reconciliation complexity, but the app has to work on a phone with no signal — so the device, not the server, is the source of truth.",
  },
  {
    term: "Rules and statistics over ML, for now",
    body: "Insights today are deterministic aggregations and correlations. That's honest, debuggable, and useful immediately; an AI layer is a future addition, not a current claim.",
  },
  {
    term: "Breadth of modules over depth in any one",
    body: "The value is in connecting domains, not in out-featuring a dedicated nutrition or notes app. Each module stays deliberately lean so the whole stays coherent.",
  },
];

const SCALING: DefinitionItem[] = [
  {
    term: "Partition entries by time",
    body: "As history grows, partition the local store by time window and lazy-load older ranges so day-to-day use stays instant.",
  },
  {
    term: "Incremental, conflict-aware sync",
    body: "Move from full reconciliation to per-entry change tracking with last-write-wins or merge rules, so syncing scales with deltas rather than data size.",
  },
  {
    term: "Precomputed insight rollups",
    body: "Cache daily and weekly aggregates instead of recomputing across all entries, so the insight engine stays fast as the timeline lengthens.",
  },
  {
    term: "An AI insight layer over the same signals",
    body: "With the typed-entry graph in place, an AI layer could surface patterns and suggestions reading the same data — kept strictly as future work until it ships.",
  },
  {
    term: "Optional multi-device accounts",
    body: "The sync API generalizes from one device to several; the offline-first model already assumes an authoritative merge, which is the hard part of multi-device.",
  },
];

const WOULD_CHANGE = [
  "Commit to the typed-entry shape even earlier — it's the decision that makes every later module and insight cheap.",
  "Design sync as change-tracking from the start rather than full reconciliation, before the data volume makes it matter.",
  "Define what a meaningful insight is up front, so the engine is built toward real questions instead of generic charts.",
];

export default function CadenceOrbitCaseStudy() {
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
          { label: "Domain", value: "Personal data systems" },
          { label: "Core", value: "PWA · offline-first · modular" },
        ]}
      />

      <CaseStudySection
        index="01"
        title="The problem"
        lead="Personal data lives in a dozen disconnected apps — one for habits, one for meals, one for notes — and none of them can answer a question that spans more than one."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Each app is its own silo with its own model, so the data that
            would actually be useful — how routines relate to mood, how fasting
            tracks against body metrics — is split across tools that never
            talk. The interesting questions are exactly the cross-domain ones,
            and no single app can see across the boundary.
          </Text>
          <Text>
            Cadence Orbit is an attempt to model personal life as one system
            instead of many apps: a modular operating system where notes,
            routines, tasks, nutrition, fasting, mood, body metrics, and a
            gallery are modules over a shared data layer — installable as a
            PWA and built to work offline first.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        title="System model"
        lead="Eight modules, but one underlying primitive — every domain reduces to a typed, timestamped, tagged entry."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((mod) => (
            <li key={mod.name}>
              <Reveal mode="rise">
                <Card variant="outline" padding="md" className="h-full">
                  <MonoLabel className="text-accent-strong">{mod.name}</MonoLabel>
                  <Text className="mt-2 text-sm">{mod.detail}</Text>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection
        index="03"
        title="Architecture"
        lead="A shared data core at the centre, with independent modules orbiting it — not a stack of unrelated mini-apps."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            The architecture is a constellation: a single shared data layer
            sits at the centre, and each life domain is an independent module
            that reads and writes through it. A module owns its own screens and
            rules, but not its own storage format — everything it records flows
            into the same core.
          </Text>
          <Text>
            That inversion is the whole point. Because modules don&apos;t own
            isolated databases, adding a domain doesn&apos;t fork the data, and
            anything that reads across modules — the insight layer especially —
            has one place to look.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Module constellation"
            aspect="aspect-[20/9]"
            caption="Each domain is an independent module orbiting one shared data core, rather than a silo with its own storage."
          >
            <ModuleConstellationDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        title="Modular domain design"
        lead="The trick that makes eight different domains interoperate: they all speak the same typed-entry shape."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            A meal, a mood check-in, a body measurement, and a note look nothing
            alike on screen, but underneath they&apos;re the same primitive — an
            entry with a timestamp, a type, a value, and tags. Each module is
            responsible for its own domain logic and presentation, then hands
            the core a normalized entry.
          </Text>
          <Text>
            Modeling personal data this way turns a pile of incompatible tables
            into a single graph. Entries link by day and by tag, so the data
            from one module is automatically reachable from another, and a new
            module is additive rather than a migration.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Personal data graph"
            aspect="aspect-[20/8]"
            caption="Every module normalizes to one typed entry, so heterogeneous domains link into a single graph by day and tag."
          >
            <PersonalDataGraphDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="05"
        title="Cross-module insights"
        lead="The payoff of one shared graph: an engine that can correlate signals no single module could see on its own."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Because every module feeds the same graph, one insight engine can
            aggregate and correlate across all of them — surfacing trends,
            cross-domain correlations, and a daily summary that pulls from
            routines, nutrition, fasting, mood, and metrics together.
          </Text>
          <Text>
            Today that engine is deterministic: rules and statistics over the
            entries, which is debuggable and useful immediately. A future
            AI-assisted layer would read the very same signals to suggest
            patterns — but that&apos;s explicitly future work, not a current
            capability.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Insight engine"
            aspect="aspect-[20/8]"
            caption="Module signals feed one engine that produces trends, correlations, and a daily summary; an AI layer over the same signals is future work."
          >
            <InsightEngineDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="06"
        title="PWA / offline strategy"
        lead="A personal OS has to work on a phone with no signal — so the device is the source of truth, not the server."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Cadence Orbit is an installable PWA built offline-first. Writes land
            in a local store on the device immediately, so logging a meal or a
            mood never waits on the network. A service worker caches the app
            shell so it loads with no connection at all.
          </Text>
          <Text>
            A sync queue holds pending writes and flushes them to the backend
            when a connection returns, then reconciles changes back to the local
            store. The device staying authoritative is what keeps the experience
            instant — the network is an enhancement, not a dependency.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Offline sync"
            aspect="aspect-[18/6]"
            caption="Writes go to the local store first; a queue flushes to the backend when online and reconciles changes back on reconnect."
          >
            <PwaOfflineSyncDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="07"
        title="Modular domain design decisions"
        lead="The choices that let independent modules stay independent while still sharing one coherent data model."
      >
        <DefinitionList items={MODULAR} />
      </CaseStudySection>

      <CaseStudySection
        index="08"
        title="Tradeoffs"
        lead="What was deliberately given up — and why, for a personal intelligence OS, each was the right call."
      >
        <DefinitionList items={TRADEOFFS} />
      </CaseStudySection>

      <CaseStudySection
        index="09"
        title="Scaling to 10x"
        lead="None of this is presented as built — it's where a growing timeline and more devices would push the design first."
      >
        <DefinitionList items={SCALING} />
      </CaseStudySection>

      <CaseStudySection index="10" title="Reflection" divider>
        <div className="max-w-2xl space-y-5">
          <Text>
            Building Cadence Orbit made the difference between an app and a
            system concrete. A collection of trackers is just more silos; what
            makes it an operating system is the shared model underneath — the
            decision to treat every domain as the same typed entry.
          </Text>
          <Text>
            The biggest lever wasn&apos;t any one feature. It was modeling
            personal data as a single graph so that modules, insights, and
            future AI all read from one place — and committing to offline-first
            so the system belongs to the device, not the server.
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
