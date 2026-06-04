import { Section } from "@/components/ui/Section";
import { Heading, Lead } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { SystemLayers } from "./SystemLayers";

/**
 * First scroll transition: from the cinematic hero into how the work is
 * built. The right column ({@link SystemLayers}) assembles its architecture
 * timeline as the section scrolls — connector growing, nodes activating,
 * layers resolving in sequence.
 */
export function SystemsIntro() {
  return (
    <Section id="systems" eyebrow="Engineering Philosophy" divider spacing="large">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal mode="rise">
          <Heading level={2} className="max-w-md">
            Software is a system, not a stack of features.
          </Heading>
          <Lead className="mt-6 max-w-md">
            The interesting work lives in how the parts hold together under
            load, change, and real operational pressure.
          </Lead>
        </Reveal>

        <SystemLayers />
      </div>
    </Section>
  );
}
