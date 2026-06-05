import type { MetadataRoute } from "next";

/**
 * Web app manifest — name, theme, and icons for "add to home screen" /
 * installable behavior and richer mobile chrome. Icons reuse the generated
 * icon routes so there's one source for the mark.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sravan Mummareddy — Systems Product Engineer",
    short_name: "Sravan Mummareddy",
    description:
      "Backend platforms, operational intelligence, and AI-assisted systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090a",
    theme_color: "#08090a",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
