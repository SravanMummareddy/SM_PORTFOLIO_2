import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/lib/og";
import { getArticle } from "@/content/writing";

type Params = { params: Promise<{ slug: string }> };

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateImageMetadata({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  return [
    {
      id: "og",
      alt: article?.title ?? OG_ALT,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  return renderOgImage({
    eyebrow: "Sravan Mummareddy · Writing",
    title: article?.title ?? "Engineering writing",
    titleSize: 52,
    footer: article ? `${article.category}  ·  ${article.readingTime}` : undefined,
  });
}
