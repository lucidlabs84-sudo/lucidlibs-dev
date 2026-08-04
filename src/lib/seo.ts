import type { Metadata } from "next";

export const SITE_URL = "https://lucidlibs.dev";
export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * Absolute canonical + hreflang set for a locale-prefixed page.
 *
 * `path` is everything after the locale ("" for the locale home page, "/stylesnap/faq" otherwise).
 * `available` narrows the hreflang set for pages that only exist in some locales (blog posts) —
 * pointing hreflang at a URL that 404s makes Google drop the whole cluster.
 */
export function alternates(
  locale: string,
  path = "",
  available: readonly Locale[] = LOCALES,
): Metadata["alternates"] {
  const xDefault = available.includes("en") ? "en" : available[0];

  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(available.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/${xDefault}${path}`,
    },
  };
}

/**
 * Metadata for pages that exist for users but must never enter the index (post-checkout,
 * license recovery). Self-canonical on purpose: inheriting the parent layout's canonical would
 * pair "noindex" with "the real page is over there", which is a conflicting signal to Google.
 */
export function noIndexMetadata(locale: string, path: string, title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE_URL}/${locale}${path}`, languages: {} },
  };
}

type Copy = { title: string; description: string };

/**
 * Metadata for a leaf page. Without this every page under a layout inherits that layout's
 * canonical, which told Google /en/privacy was a duplicate of /en and /en/stylesnap/faq a
 * duplicate of /en/stylesnap.
 */
export function pageMetadata(
  locale: string,
  path: string,
  copy: Record<Locale, Copy>,
): Metadata {
  const c = copy[locale as Locale] ?? copy.en;

  return {
    title: c.title,
    description: c.description,
    alternates: alternates(locale, path),
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: "LucidLibs",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.description },
  };
}
