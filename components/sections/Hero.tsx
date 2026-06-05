import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Display, Lead, Eyebrow, MonoLabel } from "@/components/ui/Typography";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SystemGraph } from "@/components/three/SystemGraph";
import { ScrollCue } from "./ScrollCue";

/**
 * Homepage hero. A living architecture system glows behind an
 * oversized statement of intent. The 3D layer is progressive
 * enhancement; the copy and CTAs never depend on it.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Ambient system backdrop */}
      <SystemGraph className="absolute inset-0 z-0" />

      {/* Legibility scrim: dissolve the graph toward the text + page seams. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_72%_38%,transparent_0%,rgba(8,9,10,0.35)_55%,var(--bg)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-bg via-bg/70 to-transparent"
      />

      {/* Foreground content */}
      <Container className="relative z-20 flex flex-1 items-center pt-28 pb-24">
        {/* Entrance beats: graph initializes (3D scene) → eyebrow →
            headline resolves into focus → lead → CTA. */}
        <Stagger trigger="mount" delay={0.55} gap={0.16} className="max-w-3xl">
          <StaggerItem>
            <div className="mb-7">
              <Eyebrow marker className="block">
                Sravan Mummareddy
              </Eyebrow>
              <MonoLabel className="mt-2 block text-text-tertiary">
                Systems Product Engineer
              </MonoLabel>
            </div>
          </StaggerItem>
          <StaggerItem mode="resolve">
            <Display>
              Building scalable backend systems and intelligent operational
              platforms.
            </Display>
          </StaggerItem>
          <StaggerItem>
            <Lead className="mt-8 max-w-2xl">
              I architect intelligent systems where backend infrastructure, AI
              workflows, and product experiences connect.
            </Lead>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/projects" variant="primary" size="lg">
                View the work
              </Button>
              <Button href="#systems" variant="secondary" size="lg">
                How I think about systems
              </Button>
            </div>
          </StaggerItem>
        </Stagger>
      </Container>

      <ScrollCue className="relative z-20 mx-auto mb-10" />
    </section>
  );
}
