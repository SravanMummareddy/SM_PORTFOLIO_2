import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og";
import { getArticle } from "@/content/writing";

const article = getArticle("state-machines-workflows");

export const alt = article?.title ?? OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Sravan Mummareddy · Writing",
    title: article?.title ?? "Engineering writing",
    titleSize: 52,
    footer: article ? `${article.category}  ·  ${article.readingTime}` : undefined,
  });
}
