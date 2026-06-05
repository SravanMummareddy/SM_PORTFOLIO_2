import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleHero,
  Prose,
  ProseHeading,
  ProseText,
  ProseList,
  Callout,
} from "@/components/writing/article-kit";
import { ArticleNav } from "@/components/writing/ArticleNav";
import { getArticle } from "@/content/writing";

const meta = getArticle("state-machines-workflows");

export const metadata: Metadata = {
  title: "Designing State Machines for Real Workflow Systems",
  description:
    "Why explicit states and strict transitions beat boolean flags once a workflow has more than three steps — and how to model them without over-engineering.",
};

export default function StateMachinesArticle() {
  if (!meta) notFound();

  return (
    <>
      <ArticleHero
        meta={meta}
        lead="Most workflow bugs aren't logic errors. They're the system being in a combination of states nobody thought was possible. State machines exist to make those combinations unrepresentable."
      />

      <Prose>
        <ProseText>
          Almost every operational product is, underneath, a workflow: something
          moves from one stage to the next, with rules about what&apos;s allowed
          at each step. An order gets placed, paid, fulfilled. A document is
          drafted, reviewed, approved. A ticket is opened, worked, closed. The
          first version is usually modeled with a few boolean columns —
          <code className="font-mono text-[0.9em] text-text-secondary"> is_paid</code>,
          <code className="font-mono text-[0.9em] text-text-secondary"> is_shipped</code>,
          <code className="font-mono text-[0.9em] text-text-secondary"> is_cancelled</code>
          — and it works fine, right up until it doesn&apos;t.
        </ProseText>

        <ProseHeading>The problem with boolean flags</ProseHeading>
        <ProseText>
          Three boolean flags describe eight combinations, but only a few of them
          are legal. What does it mean for an order to be both shipped and
          cancelled? Paid but not placed? Nothing in the schema forbids it, so
          eventually some race condition, retry, or half-finished migration
          produces exactly that — and now you have data that no part of your code
          knows how to handle.
        </ProseText>
        <ProseText>
          The flags also don&apos;t encode transitions. They tell you where a
          record is, but not how it&apos;s allowed to get somewhere else. The
          rules about valid movement end up scattered across services, controllers,
          and the occasional cron job, each re-deriving them slightly differently.
        </ProseText>

        <Callout label="The core idea">
          A state machine replaces a set of independent flags with one explicit
          state plus a defined set of legal transitions. The illegal combinations
          stop being something you check for and start being something you cannot
          represent.
        </Callout>

        <ProseHeading>What a state machine actually buys you</ProseHeading>
        <ProseText>
          Modeling a workflow as a single status field with named states —
          and a transition table describing which states can move to which —
          changes the shape of the whole system:
        </ProseText>
        <ProseList
          items={[
            "Invalid states are unrepresentable. There is one status, and it's always exactly one of the known values. The eight-way ambiguity collapses to a handful of real states.",
            "Transition rules live in one place. \"Approved can go to Published or Rejected, but Draft cannot go straight to Published\" is a single definition, not a rule re-implemented in five handlers.",
            "Side effects attach to transitions, not to scattered writes. Sending a notification or charging a card belongs to the act of moving between states, which makes it auditable.",
            "The audit trail falls out for free. A log of transitions is a complete, ordered history of what happened and when — exactly what operations and support teams ask for.",
          ]}
        />

        <ProseHeading>Keep it boring on purpose</ProseHeading>
        <ProseText>
          You rarely need a state-machine library or a formal workflow engine to
          get this. A status enum, a transition function that rejects illegal
          moves, and a table that records each transition will carry a system a
          long way. The discipline is in funneling every change through that one
          function, so there is no back door that writes the status field
          directly.
        </ProseText>
        <ProseText>
          The two extensions worth adding early are a <em>blocked</em> or error
          state — real workflows stall, and pretending they don&apos;t just hides
          the stuck records — and idempotent transitions, so a retried request
          that re-applies the same move is a no-op rather than a double charge.
          Both are cheap when the machine is explicit and painful to bolt on
          later.
        </ProseText>

        <ProseHeading>When not to reach for one</ProseHeading>
        <ProseText>
          A state machine earns its keep when there are real rules about ordering
          and legality. If a record just accumulates independent attributes with
          no notion of sequence, flags or a simple status are fine — forcing a
          machine onto genuinely unordered data adds ceremony without removing
          any ambiguity. The signal to reach for one is the third or fourth
          boolean flag, the first &quot;how did it get into <em>that</em> state&quot;
          bug, or the first time two people disagree about which transitions are
          allowed.
        </ProseText>

        <Callout label="Takeaway">
          Don&apos;t model where a record is with a pile of booleans. Model it
          with one explicit state and a closed set of legal transitions. The
          impossible combinations disappear, the rules live in one place, and the
          history writes itself.
        </Callout>
      </Prose>

      <ArticleNav currentSlug="state-machines-workflows" />
    </>
  );
}
