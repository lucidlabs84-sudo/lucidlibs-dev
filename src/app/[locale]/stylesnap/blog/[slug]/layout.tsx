import type { Metadata } from "next";
import enData from "@/stylesnap/i18n/en.json";
import zhData from "@/stylesnap/i18n/zh.json";

type BlogArticle = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const data: Record<string, BlogArticle> =
    locale === "zh" ? (zhData as Record<string, unknown>).blogArticles as Record<string, BlogArticle>
      : (enData as Record<string, unknown>).blogArticles as Record<string, BlogArticle>;

  const article = data?.[slug];

  if (!article) {
    return {
      title: locale === "zh" ? "文章未找到" : "Article Not Found",
    };
  }

  return {
    title: `${article.title} — LucidLibs Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://lucidlibs.dev/${locale}/stylesnap/blog/${slug}`,
      siteName: "LucidLibs",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: `https://lucidlibs.dev/${locale}/stylesnap/blog/${slug}`,
      languages:
        locale === "en"
          ? { zh: `/zh/stylesnap/blog/${slug}` }
          : { en: `/en/stylesnap/blog/${slug}` },
    },
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
