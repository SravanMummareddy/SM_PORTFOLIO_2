import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og";

/*
  Site-wide default OpenGraph / Twitter card. Lives at the app root, so it's
  the fallback preview image for every route that doesn't define its own
  opengraph-image. Mirrors the homepage hero (copy kept in sync with
  components/sections/Hero.tsx).
*/

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Sravan Mummareddy",
    subEyebrow: "Systems Product Engineer",
    title:
      "Building scalable backend systems and intelligent operational platforms.",
    footer: "Backend platforms · Operational intelligence · AI-assisted systems",
  });
}
