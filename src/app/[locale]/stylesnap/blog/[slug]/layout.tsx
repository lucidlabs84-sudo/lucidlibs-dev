import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articlesFor, getArticle, localesWithArticle } from "@/lib/blog";
import { alternates, SITE_URL, type Locale } from "@/lib/seo";

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return articlesFor(params.locale as Locale).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);

  // The layout below turns this into a real 404; without an override it would inherit the blog
  // index's title and label the error page as the blog.
  if (!article) return { title: "Page not found — LucidLibs", robots: { index: false } };

  return {
    title: `${article.title} — LucidLibs Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}/${locale}/stylesnap/blog/${slug}`,
      siteName: "LucidLibs",
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
    // Only the locales that actually carry this article — several exist in one language only.
    alternates: alternates(locale, `/stylesnap/blog/${slug}`, localesWithArticle(slug)),
  };
}

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Previously an unknown slug rendered a client-side "Article Not Found" screen with HTTP 200,
  // which Google files as a soft 404. Return a real 404 instead.
  if (!getArticle(locale, slug)) notFound();

  return <>{children}</>;
}
