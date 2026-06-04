import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArticleHero,
  Prose,
  ProseHeading,
  ProseText,
  ProseList,
  Callout,
} from "@/components/writing/article-kit";
import { getArticle } from "@/content/writing";

const meta = getArticle("legacy-modernization");

export const metadata: Metadata = {
  title: "Modernizing Legacy Enterprise Systems Without Breaking Production",
  description:
    "Strangler patterns, idempotent writes, and shipping migrations behind a system that can't go down — a practical approach to modernizing legacy enterprise software.",
};

export default function LegacyModernizationArticle() {
  if (!meta) notFound();

  return (
    <>
      <ArticleHero
        meta={meta}
        lead="The hard part of modernizing a legacy system is never the new code. It's that the old system is load-bearing, in production, and not allowed to stop while you replace it."
      />

      <Prose>
        <ProseText>
          Legacy systems get a bad reputation they often don&apos;t deserve. The
          reason a system is still running after a decade is usually that it
          works — it encodes years of business rules, edge cases, and hard-won
          fixes. The goal of modernization isn&apos;t to prove the old system was
          bad. It&apos;s to change the parts that genuinely hold the business
          back, without losing what already works or taking production down in
          the process.
        </ProseText>

        <ProseHeading>Why the big rewrite keeps failing</ProseHeading>
        <ProseText>
          The instinct is to build the replacement in parallel and flip a switch.
          It almost never works, for reasons that have little to do with
          engineering skill: the new system has to match behavior nobody fully
          remembers, the cutover is a single high-stakes event with no safe
          rollback, and while the rewrite is underway the old system keeps
          changing, so you&apos;re chasing a moving target. The longer the rewrite
          runs, the wider the gap grows.
        </ProseText>

        <Callout label="The core idea">
          Replace incrementally, behind a stable interface. Put a facade in front
          of the old system, route traffic through it, and migrate one capability
          at a time — so the old and new coexist and the cutover is a hundred
          small reversible steps instead of one irreversible leap.
        </Callout>

        <ProseHeading>The strangler pattern</ProseHeading>
        <ProseText>
          The strangler pattern is the practical version of this. You introduce a
          layer — an API, a gateway, a service facade — that consumers talk to
          instead of the legacy system directly. At first it just forwards
          everything to the old system. Then, capability by capability, you move
          functionality behind the facade to new implementations, while consumers
          keep calling the same stable contract.
        </ProseText>
        <ProseList
          items={[
            "Consumers depend on the interface, not the implementation — so where the work actually happens can change without anyone downstream rewriting their code.",
            "Each migrated capability is independently shippable and independently reversible. If a new path misbehaves, you route that one capability back to the old system.",
            "The legacy system shrinks gradually until what's left is small enough to retire — or small enough that it no longer matters.",
          ]}
        />

        <ProseHeading>Idempotency is what makes it safe</ProseHeading>
        <ProseText>
          The moment you have two systems, retries, and traffic moving between
          paths, you need writes that can be safely repeated. An idempotent
          write — keyed on something stable like an entity id and version — means
          a request applied twice produces the same result as applying it once.
          That single property is what lets you retry failures, replay events,
          and run old and new paths during migration without producing duplicates
          or corruption.
        </ProseText>
        <ProseText>
          Pair it with a clear data strategy. Decide deliberately whether the old
          or new store is the source of truth for each capability during the
          transition, and make the direction of data flow explicit. Ambiguity
          about which system owns a piece of data is where migrations quietly go
          wrong.
        </ProseText>

        <ProseHeading>Define what &quot;done&quot; means up front</ProseHeading>
        <ProseText>
          A migration without an exit criterion runs forever, with both systems
          alive and twice the maintenance. Before starting, decide how
          you&apos;ll know a capability has fully moved — coverage, parity checks,
          a period of running both and comparing outputs — so the legacy path can
          be retired with confidence rather than left on indefinitely &quot;just in
          case.&quot;
        </ProseText>

        <Callout label="Takeaway">
          Don&apos;t rewrite a load-bearing system in one move. Wrap it in a
          stable interface, make writes idempotent, migrate one capability at a
          time, and define in advance how you&apos;ll know the old path is safe to
          turn off. Boring, incremental, reversible — that&apos;s what keeps
          production up.
        </Callout>
      </Prose>

      <Section divider className="text-center">
        <Reveal mode="rise" className="mx-auto max-w-xl">
          <Heading level={2}>More notes on systems.</Heading>
          <Text className="mx-auto mt-5 max-w-md">
            Short, architecture-focused writing on building and modernizing real
            software.
          </Text>
          <div className="mt-8 flex justify-center">
            <Button href="/writing" variant="secondary">
              All writing
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
