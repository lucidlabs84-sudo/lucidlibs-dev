"use client";

import { useI18n } from "@/stylesnap/i18n/context";
import Link from "next/link";

export default function BlogPage() {
  const { t } = useI18n();
  const articles = t("blog.articles", { returnObjects: true }) as Array<{
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
  }>;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "StyleSnap Blog",
    description: t("seo.blogDesc") as string,
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("blog.tag") as string}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              {t("blog.title") as string}
            </h1>
            <p className="text-muted text-lg">
              {t("blog.subtitle") as string}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((a, i) => (
              <Link
                key={i}
                href={`/stylesnap/blog/${a.slug}`}
                className="group block rounded-2xl border border-border p-8 hover:border-border-hover transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted bg-background px-3 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="text-xs text-muted">{a.date}</span>
                </div>
                <h2 className="text-lg font-bold mb-3 group-hover:underline decoration-2 underline-offset-4">
                  {a.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {a.excerpt}
                </p>
                <span className="text-sm font-medium">
                  {t("blog.readMore") as string}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}