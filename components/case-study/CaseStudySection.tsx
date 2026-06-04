import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Lead, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

interface CaseStudySectionProps {
  id?: string;
  /** Two-digit section number, e.g. "02". */
  index: string;
  title: string;
  /** Optional intro paragraph rendered under the heading. */
  lead?: ReactNode;
  children: ReactNode;
  /** Top hairline divider. Defaults to true. */
  divider?: boolean;
}

/**
 * A numbered case-study section. Pairs an engineering-metadata index
 * with a heading and optional lead, then renders its body — the shared
 * rhythm every case-study page is composed from.
 */
export function CaseStudySection({
  id,
  index,
  title,
  lead,
  children,
  divider = true,
}: CaseStudySectionProps) {
  return (
    <Section id={id} divider={divider}>
      <Reveal mode="rise" className="max-w-2xl">
        <MonoLabel className="text-accent-strong">{index}</MonoLabel>
        <Heading level={2} className="mt-4">
          {title}
        </Heading>
        {lead ? <Lead className="mt-6">{lead}</Lead> : null}
      </Reveal>
      <div className="mt-12">{children}</div>
    </Section>
  );
}
