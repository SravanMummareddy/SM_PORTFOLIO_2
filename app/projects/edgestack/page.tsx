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
  SessionLifecycleDiagram,
  DecisionScoringDiagram,
  AnalyticsModelDiagram,
  OfflineSyncDiagram,
} from "@/components/projects/edgestack";
import { PROJECTS } from "@/content/projects";

const project = PROJECTS.find((p) => p.slug === "edgestack");

export const metadata: Metadata = {
  title: "EdgeStack — Decision Intelligence Platform",
  description:
    "Case study: a behavioral analytics and decision-training platform for high-variance, skill-based environments — session analytics, decision scoring against optimal strategy, a versioned REST API, and mobile-first offline sync. Applied to blackjack strategy practice.",
};

const ENTITIES: { name: string; detail: string }[] = [
  { name: "Session", detail: "A bounded practice run with a budget, a lifecycle, and a final score." },
  { name: "Decision", detail: "A single situation plus the action taken — the unit that gets scored." },
  { name: "Strategy reference", detail: "The optimal action for a situation, used as the scoring baseline." },
  { name: "Money entry", detail: "A balance change stored as integer cents to avoid float drift." },
  { name: "Budget", detail: "A pre-set limit that enforces session discipline, not a suggestion." },
  { name: "Drill", detail: "A focused training mode that replays situations to build accuracy." },
  { name: "Rollup", detail: "A pre-aggregated metric over a time window that the dashboard reads." },
  { name: "Sync record", detail: "A queued local write awaiting reconciliation with the server." },
];

const MODELING: DefinitionItem[] = [
  {
    term: "Money as integer cents, never floats",
    body: "All balances and results are stored as integer cents. Floating-point money silently drifts; integer arithmetic is exact, which matters when discipline and totals are the entire point.",
  },
  {
    term: "The decision is the atomic record",
    body: "Modeling each individual decision — not just session totals — is what makes scoring, drills, and behavioral analysis possible. Aggregates are derived from decisions, never the other way around.",
  },
  {
    term: "Session as an explicit state machine",
    body: "Opened, active, settled, scored — with pause/resume and auto-settle on abandonment. A clear lifecycle means a session can always be reconciled and never leaves data in an ambiguous state.",
  },
  {
    term: "A versioned REST API from day one",
    body: "Endpoints are versioned so the mobile client and server can evolve independently — a v1 client keeps working while v2 ships, which is essential when the client is offline and updates lag.",
  },
];

const TRADEOFFS: DefinitionItem[] = [
  {
    term: "Integer cents over a decimal money type",
    body: "Integer cents are slightly more manual than a decimal library, but they're dependency-free, exact, and trivial to reason about across the client/server boundary.",
  },
  {
    term: "Offline-first over server-authoritative",
    body: "Logging happens in the moment, often without signal, so the device has to be authoritative and reconcile later. That adds sync complexity, but a tool that can't log offline is useless for its purpose.",
  },
  {
    term: "Deterministic scoring over a learned model",
    body: "Decisions are scored against a known-optimal strategy reference, not a model. The baseline is exact and explainable — the user can see exactly why a decision was a deviation.",
  },
  {
    term: "Precomputed rollups over querying raw events",
    body: "The dashboard reads aggregated rollups rather than scanning every decision. It costs some write-time work and storage, but keeps the mobile experience instant as history grows.",
  },
];

const SCALING: DefinitionItem[] = [
  {
    term: "Partition decisions by session and time",
    body: "As decision history grows, partition by session and time window so analytics queries and local storage stay bounded.",
  },
  {
    term: "Incremental, conflict-aware sync",
    body: "Move from whole-session reconciliation to per-record change tracking with last-write-wins, so sync scales with deltas rather than total data.",
  },
  {
    term: "Streaming rollups",
    body: "Update rollups incrementally as decisions land instead of recomputing windows, keeping dashboard reads cheap at any volume.",
  },
  {
    term: "Expand the strategy reference",
    body: "The scoring baseline can grow to cover more situations and rule variations without changing the decision model — scoring stays a lookup plus comparison.",
  },
  {
    term: "Richer behavioral analytics",
    body: "With every decision captured, the same data supports deeper pattern analysis — streaks, tilt detection, drill targeting — strictly as future work.",
  },
];

const WOULD_CHANGE = [
  "Settle on integer cents and the decision-level model before anything else — they're the foundations every metric depends on.",
  "Design sync as per-record change tracking from the start, rather than reconciling whole sessions.",
  "Version the API and the local schema together, so an offline client upgrade can never desync from the server contract.",
];

export default function EdgeStackCaseStudy() {
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
          { label: "Domain", value: "Behavioral analytics" },
          { label: "Core", value: "Versioned API · mobile · offline-first" },
        ]}
      />

      <CaseStudySection
        index="01"
        title="The problem"
        lead="In high-variance, skill-based environments, outcomes are noisy — a good decision can lose and a bad one can win — so judging skill by results is misleading."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            When luck dominates the short term, the only honest measure of
            improvement is decision quality, not the scoreboard. But decision
            quality is invisible unless you capture every choice, compare it to
            what was optimal, and track that accuracy over time — separately
            from how the results happened to land.
          </Text>
          <Text>
            EdgeStack is a decision-intelligence platform for exactly that. The
            applied domain here is blackjack strategy practice and session
            tracking — a clean, well-defined environment with a known-optimal
            baseline — but the system is built as behavioral analytics and
            skill-based training: log decisions, score them against optimal
            play, and turn sessions into a discipline rather than a gamble.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        title="System model"
        lead="A small set of entities — sessions and the decisions inside them, a strategy baseline to score against, and money tracked to the cent."
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
        lead="A mobile-first client over a versioned REST API, with the device authoritative and the server reconciling — because logging happens in the moment, often offline."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            The client is mobile-first and offline-capable: decisions and money
            entries are written locally the instant they happen, then synced. A
            versioned REST API sits between client and server so the two can
            evolve independently — critical when an offline client may be
            several versions behind.
          </Text>
          <Text>
            On the server, decisions and sessions persist as the source of
            record, and a rollup layer pre-aggregates them into the metrics the
            dashboard reads. Money is integer cents end to end, so totals are
            exact across the client/server boundary.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Session lifecycle"
            aspect="aspect-[18/6]"
            caption="A session is an explicit state machine — opened with a budget, active while decisions are logged, then settled and scored, with auto-settle on abandonment so no data is lost."
          >
            <SessionLifecycleDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        title="Session analytics"
        lead="A session isn't a number — it's a lifecycle, captured decision by decision, so the analytics can separate skill from variance."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Every session moves through a defined lifecycle and accumulates the
            individual decisions made within it. Because the decision is the
            atomic record, a finished session yields far more than a win or
            loss: decision accuracy, where deviations happened, budget
            adherence, and volume.
          </Text>
          <Text>
            Capturing data at that granularity is what lets the platform report
            on behavior rather than outcome — the whole point in an environment
            where results are noisy and discipline is the real signal.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="05"
        title="Decision scoring engine"
        lead="The core mechanic: compare each decision to the optimal action and record whether it was optimal play or a deviation."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            For each decision, the engine takes the situation and the action
            taken, looks up the optimal action from a strategy reference, and
            compares. A match is optimal play; a mismatch is recorded as a
            deviation and flagged. Those outcomes roll up into a per-session
            decision-accuracy score.
          </Text>
          <Text>
            Scoring is deterministic against a known-optimal baseline, not a
            learned model — so it&apos;s exact and explainable. The user can see
            precisely which decisions deviated and what the optimal action would
            have been, which is what makes it a training tool.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Decision scoring"
            aspect="aspect-[18/6]"
            caption="Each decision is compared to the optimal action from a strategy reference; matches and deviations roll up into a session accuracy score."
          >
            <DecisionScoringDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="06"
        title="Mobile / offline strategy"
        lead="Logging happens live and often without signal, so the device is authoritative and the network is an enhancement — not a dependency."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            EdgeStack is mobile-first and offline-first. Decisions are written to
            a local store immediately so logging never waits on connectivity,
            and a service worker caches the app shell so it loads with no
            connection. A sync queue holds pending writes and flushes them to the
            versioned API when a connection returns.
          </Text>
          <Text>
            The server reconciles per session and changes flow back to the
            device. Keeping the device authoritative is what makes logging
            instant; versioning the API is what keeps an offline, possibly stale,
            client compatible with a server that has moved on.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Offline sync"
            aspect="aspect-[18/6]"
            caption="Writes land locally first; the sync queue flushes to a versioned REST API when online, and the server reconciles per session back to the device."
          >
            <OfflineSyncDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="07"
        title="Analytics dashboard model"
        lead="The dashboard never scans raw events — it reads pre-aggregated rollups, so it stays fast as decision history grows."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Sessions, decisions, and integer-cent money entries are the raw
            inputs. A rollup layer aggregates them over time windows into the
            metrics that matter — accuracy trend, net result, budget discipline,
            and volume — and the dashboard reads only those rollups.
          </Text>
          <Text>
            Separating raw records from aggregated reads keeps the mobile
            dashboard responsive regardless of how much history a user has, and
            keeps the expensive work on the write path instead of every screen
            load.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Analytics model"
            aspect="aspect-[20/8]"
            caption="Raw sessions, decisions, and integer-cent money roll up into dashboard metrics; panels read rollups, never the raw event stream."
          >
            <AnalyticsModelDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="08"
        title="Data modeling decisions"
        lead="The modeling choices that make exact money, honest scoring, and offline evolution possible."
      >
        <DefinitionList items={MODELING} />
      </CaseStudySection>

      <CaseStudySection
        index="09"
        title="Tradeoffs"
        lead="What was deliberately kept simple — and why each was the right call for a behavioral-analytics tool."
      >
        <DefinitionList items={TRADEOFFS} />
      </CaseStudySection>

      <CaseStudySection
        index="10"
        title="Scaling to 10x"
        lead="None of this is presented as built — it's where more decisions, sessions, and devices would push the design first."
      >
        <DefinitionList items={SCALING} />
      </CaseStudySection>

      <CaseStudySection index="11" title="Reflection" divider>
        <div className="max-w-2xl space-y-5">
          <Text>
            EdgeStack started from a simple observation: in a high-variance
            environment, results lie and only decisions tell the truth. Building
            it was an exercise in modeling behavior precisely — the decision as
            the atomic unit, money as exact integer cents, the session as a clean
            state machine.
          </Text>
          <Text>
            The biggest lever was committing to capture and score at the level of
            the individual decision. Everything useful — training drills,
            accuracy trends, discipline metrics — falls out of that one modeling
            choice, scored against an exact, explainable baseline.
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

      <CaseStudyNav currentSlug="edgestack" />
    </>
  );
}
