import type { MetadataRoute } from "next";
import { articlesFor } from "@/lib/blog";
import { LOCALES, SITE_URL } from "@/lib/seo";

// Static routes per locale. /stylesnap/success and /stylesnap/recover are deliberately absent:
// they are noindex (post-checkout and license-recovery pages, no search value).
const STATIC_PATHS = [
  "",
  "/privacy",
  "/stylesnap",
  "/stylesnap/blog",
  "/stylesnap/faq",
  "/stylesnap/feedback",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/stylesnap") ? 0.9 : 0.6,
      });
    }

    // Only the articles this locale actually has — en and zh carry different sets.
    for (const article of articlesFor(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/stylesnap/blog/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
