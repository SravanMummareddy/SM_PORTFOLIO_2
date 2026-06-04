import { Section } from "@/components/ui/Section";
import { Display, Lead, Eyebrow } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Placeholder landing — NOT the Phase 3 cinematic homepage.
 * A quiet holding page that establishes the theme and links to the
 * design-system reference while later phases are built.
 */
export default function Home() {
  return (
    <Section
      spacing="large"
      width="default"
      className="relative flex min-h-[80vh] items-center pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-60"
      />
      <Reveal mode="rise" trigger="mount" className="max-w-3xl">
        <Eyebrow marker className="mb-6 block">
          Phase 2 · Design Foundation
        </Eyebrow>
        <Display>
          Building scalable backend systems and intelligent operational
          platforms.
        </Display>
        <Lead className="mt-8 max-w-2xl">
          The engineering portfolio of Sravan Mummareddy. The cinematic
          experience is under construction — the design system that powers it is
          ready.
        </Lead>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/styleguide" variant="primary" size="lg">
            View design system
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
