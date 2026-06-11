"use client";

import { useI18n } from "@/stylesnap/i18n/context";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, lang } = useI18n();

  const allArticles = t("blogArticles", { returnObjects: true }) as Record<
    string,
    {
      title: string;
      date: string;
      category: string;
      readTime: string;
      content: string[];
    }
  >;

  const article = slug ? allArticles[slug] : null;

  if (!article) {
    return (
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">404</h1>
          <p className="text-muted mb-8">Article not found.</p>
          <Link href="/stylesnap/blog" className="text-sm font-medium underline">
            ← Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.date,
    author: { "@type": "Organization", name: "StyleSnap" },
    publisher: { "@type": "Organization", name: "StyleSnap" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <Link
            href="/stylesnap/blog"
            className="text-sm text-muted hover:text-foreground transition mb-8 inline-block"
          >
            ← {lang === "zh" ? "返回博客" : "Back to Blog"}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted bg-background px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-muted">{article.date}</span>
            <span className="text-xs text-muted">· {article.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
            {article.title}
          </h1>
          <div className="prose max-w-none">
            {article.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold mt-10 mb-4">
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-bold mt-8 mb-3">
                    {block.slice(4)}
                  </h3>
                );
              }
              if (block.includes("\n- ")) {
                const lines = block.split("\n");
                return (
                  <div key={i}>
                    <p className="text-muted leading-relaxed mb-4">
                      {lines[0]}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted mb-4">
                      {lines.slice(1).map((line, j) => (
                        <li key={j} className="leading-relaxed">
                          {line.replace(/^- /, "")}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (/^\d+\./.test(block)) {
                const lines = block.split("\n");
                return (
                  <ol key={i} className="list-decimal list-inside space-y-2 text-muted mb-4">
                    {lines.map((line, j) => (
                      <li key={j} className="leading-relaxed">
                        {line.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i} className="text-muted leading-relaxed mb-4">
                  {block}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
}