import { Section } from "@/components/ui/Section";
import { Heading, Lead, Text, MonoLabel } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface Layer {
  index: string;
  name: string;
  detail: string;
}

// The system, top to bottom — these assemble on scroll into view.
const LAYERS: Layer[] = [
  {
    index: "01",
    name: "Architecture",
    detail: "Clear boundaries, typed contracts, and predictable data flow.",
  },
  {
    index: "02",
    name: "Reliability",
    detail: "Transactions, idempotency, and failure handled by design.",
  },
  {
    index: "03",
    name: "Workflows",
    detail: "State machines and events that model real operations.",
  },
  {
    index: "04",
    name: "Data",
    detail: "Relational modeling that keeps the system's invariants honest.",
  },
  {
    index: "05",
    name: "Experience",
    detail: "Interfaces that make a complex system legible.",
  },
];

/**
 * First scroll transition: from the cinematic hero into how the work
 * is built. Restrained, no 3D — the layers rise into place in sequence,
 * reading as a system assembling from its parts.
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

        <Stagger className="relative" gap={0.1}>
          {/* Spine connecting the layers */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[5px] top-3 w-px bg-border"
          />

          <ul className="flex flex-col">
            {LAYERS.map((layer) => (
              <StaggerItem key={layer.index}>
                <li className="relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-border py-6 last:border-b-0">
                  <span
                    aria-hidden
                    className="relative z-10 mt-2 size-[11px] rounded-full border border-border-strong bg-surface"
                  >
                    <span className="absolute inset-[3px] rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <MonoLabel className="text-text-faint">
                      {layer.index}
                    </MonoLabel>
                    <Heading level={3} as="h3" className="text-text-primary">
                      {layer.name}
                    </Heading>
                  </div>
                  <Text className="col-start-2 max-w-md text-sm">
                    {layer.detail}
                  </Text>
                </li>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>
      </div>
    </Section>
  );
}
