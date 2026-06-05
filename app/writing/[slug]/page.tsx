import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleHero, Prose } from "@/components/writing/article-kit";
import { ArticleNav } from "@/components/writing/ArticleNav";
import { mdxComponents } from "@/components/writing/mdx-components";
import { ARTICLES, getArticle, getArticleSource } from "@/content/writing";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every post at build time — stays fully static. */
export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description ?? article.teaser,
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  const source = getArticleSource(slug);
  if (!article || source === undefined) notFound();

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
  });

  return (
    <>
      <ArticleHero meta={article} lead={article.lead} />
      <Prose>{content}</Prose>
      <ArticleNav currentSlug={slug} />
    </>
  );
}
