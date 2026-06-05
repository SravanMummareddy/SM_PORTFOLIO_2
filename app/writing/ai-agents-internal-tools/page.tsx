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

const meta = getArticle("ai-agents-internal-tools");

export const metadata: Metadata = {
  title: "How AI Agents Change Internal Software Workflows",
  description:
    "Where retrieval and agents genuinely reduce operational toil in internal tools — and where they quietly don't. A grounded, non-hype look at AI-assisted workflows.",
};

export default function AiAgentsArticle() {
  if (!meta) notFound();

  return (
    <>
      <ArticleHero
        meta={meta}
        lead="The interesting question about AI agents in internal tools isn't whether they're impressive. It's which specific kinds of work they remove — and which kinds they only appear to."
      />

      <Prose>
        <ProseText>
          Internal tools are full of small, repetitive judgment tasks: finding
          the right record, summarizing a thread, drafting a routine response,
          checking whether something matches a policy. These are exactly the
          tasks language models and retrieval are good at — and also exactly the
          tasks where a confident wrong answer is expensive. The value is real,
          but it&apos;s narrower and more specific than the demos suggest.
        </ProseText>

        <ProseHeading>Where it genuinely helps</ProseHeading>
        <ProseText>
          The clearest wins share a shape: the work is high-volume and
          low-stakes-per-instance, a human stays in the loop, and a wrong answer
          is easy to notice and cheap to correct.
        </ProseText>
        <ProseList
          items={[
            "Retrieval over scattered knowledge. Pulling the relevant document, ticket, or policy out of a large corpus turns \"I know we wrote this down somewhere\" into a few seconds. The human still decides; the machine just finds.",
            "First-draft generation. Drafting a reply, a summary, or a structured record that a person edits is faster than starting from blank — as long as editing is genuinely required, not skipped.",
            "Triage and routing. Classifying, tagging, and prioritizing an inbound queue so humans spend attention where it matters, with the model's confidence guiding how much to trust each call.",
          ]}
        />

        <Callout label="The pattern that works">
          AI helps most when it drafts and a human disposes. The model removes the
          blank-page and the needle-in-a-haystack costs; the person keeps the
          judgment and the accountability. The workflow changes from &quot;do the
          task&quot; to &quot;review and correct a proposal.&quot;
        </Callout>

        <ProseHeading>Where it quietly doesn&apos;t</ProseHeading>
        <ProseText>
          The failure mode isn&apos;t the agent producing nonsense — that&apos;s
          easy to catch. It&apos;s the agent producing something plausible and
          wrong in a workflow where nobody is positioned to notice. When AI output
          flows straight into a system of record with no review step, you
          haven&apos;t removed the work; you&apos;ve deferred it to whoever
          discovers the error later, usually with interest.
        </ProseText>
        <ProseList
          items={[
            "Tasks with no cheap verification. If checking the answer is as hard as producing it, an automated draft saves little and risks a lot.",
            "Actions that are hard to reverse. The more irreversible the side effect, the more a human gate is worth — agents are best kept to proposing those actions, not committing them.",
            "Work where the real cost was coordination, not typing. If the slow part was getting three teams to agree, generating text faster doesn't touch the bottleneck.",
          ]}
        />

        <ProseHeading>Treat the agent as an untrusted service</ProseHeading>
        <ProseText>
          The most useful mental model is an old one: an AI agent is a fast,
          capable, occasionally-wrong service that you integrate the way you&apos;d
          integrate any unreliable dependency. Constrain what it can do, validate
          its output at the boundary, keep irreversible actions behind a human or
          a deterministic check, and log enough to audit what it did. None of that
          is novel — it&apos;s ordinary systems discipline applied to a new kind of
          component.
        </ProseText>
        <ProseText>
          Framed that way, the design question stops being &quot;how smart is the
          model&quot; and becomes &quot;where in this workflow can I tolerate a
          wrong answer, and what catches it when it&apos;s wrong.&quot; That
          question has a concrete answer for every step, and the answers tell you
          exactly where an agent belongs.
        </ProseText>

        <Callout label="Takeaway">
          AI agents change internal workflows most where they draft and a human
          disposes, the work is high-volume, and errors are cheap to catch. They
          help least where verification is hard, actions are irreversible, or the
          real bottleneck was coordination. Wire them in like any untrusted
          dependency — and the hype sorts itself out.
        </Callout>
      </Prose>

      <ArticleNav currentSlug="ai-agents-internal-tools" />
    </>
  );
}
