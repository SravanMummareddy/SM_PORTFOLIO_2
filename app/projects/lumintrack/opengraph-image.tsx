import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og";
import { PROJECTS } from "@/content/projects";

const project = PROJECTS.find((p) => p.slug === "lumintrack");

export const alt = project ? `${project.name} — ${project.kind}` : OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Sravan Mummareddy · Case study",
    title: project?.name ?? "Case study",
    titleSize: 84,
    subtitle: project?.kind,
    footer: project?.focus.join("  ·  "),
  });
}
