import type { MetadataRoute } from "next";

const BASE_URL = "https://lucidlibs.dev";
const LOCALES = ["en", "zh"];

// Static routes per locale
const STATIC_PATHS = [
  "",
  "/privacy",
  "/stylesnap",
  "/stylesnap/blog",
  "/stylesnap/faq",
  "/stylesnap/feedback",
  "/stylesnap/recover",
  "/stylesnap/success",
];

// Blog slugs — must match stylesnap/i18n/en.json blogArticles keys
const BLOG_SLUGS = [
  "css-to-tailwind-guide",
  "design-tokens-workflow",
  "css-extraction-tools-guide",
  "react-css-modules-best-practices",
  "why-tailwind-wins",
  "edge-extension-development",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Static pages
    for (const path of STATIC_PATHS) {
      entries.push({
        url: path ? `${BASE_URL}/${locale}${path}` : `${BASE_URL}/${locale}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/stylesnap") ? 0.9 : 0.6,
      });
    }

    // Blog articles
    for (const slug of BLOG_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/stylesnap/blog/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
