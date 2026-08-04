import enData from "@/stylesnap/i18n/en.json";
import zhData from "@/stylesnap/i18n/zh.json";
import { LOCALES, type Locale } from "./seo";

type ArticleBody = { title: string; date: string };
type ArticleCard = { slug: string; excerpt: string };

/**
 * An article is only real in a locale when that locale's i18n file carries its body.
 * en and zh deliberately carry different sets, so every consumer (sitemap, hreflang,
 * 404 handling) has to ask per locale instead of assuming one shared list.
 */
export type Article = { slug: string; title: string; date: string; excerpt: string };

function index(data: unknown): Record<string, Article> {
  const d = data as {
    blogArticles?: Record<string, ArticleBody>;
    blog?: { articles?: ArticleCard[] };
  };
  const excerpts = new Map((d.blog?.articles ?? []).map((a) => [a.slug, a.excerpt]));

  return Object.fromEntries(
    Object.entries(d.blogArticles ?? {}).map(([slug, body]) => [
      slug,
      { slug, title: body.title, date: body.date, excerpt: excerpts.get(slug) ?? "" },
    ]),
  );
}

const articles: Record<Locale, Record<string, Article>> = {
  en: index(enData),
  zh: index(zhData),
};

export function getArticle(locale: string, slug: string): Article | undefined {
  return articles[locale as Locale]?.[slug];
}

export function articlesFor(locale: Locale): Article[] {
  return Object.values(articles[locale]);
}

export function localesWithArticle(slug: string): Locale[] {
  return LOCALES.filter((l) => slug in articles[l]);
}
