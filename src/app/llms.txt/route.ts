import { articlesFor } from "@/lib/blog";
import { LOCALES, SITE_URL } from "@/lib/seo";

// AI assistants are a primary discovery channel for this site, so give them a plain-text map
// instead of making them infer structure from rendered pages.
export const dynamic = "force-static";

export function GET() {
  const blog = LOCALES.flatMap((locale) =>
    articlesFor(locale).map(
      (a) => `- [${a.title}](${SITE_URL}/${locale}/stylesnap/blog/${a.slug}): ${a.excerpt}`,
    ),
  );

  const body = `# LucidLibs

> Indie developer studio. Ships StyleSnap, a browser extension that extracts CSS from any
> website and converts it to Tailwind classes, CSS variables, and design tokens.
> Every page is available in English (/en) and Chinese (/zh).

## Products

- [StyleSnap](${SITE_URL}/en/stylesnap): CSS style extractor browser extension. One-time $29 licence, no subscription. Extraction runs entirely in the browser — inspected CSS never leaves the device.
- [LucidLibs Tools](https://tools.lucidlibs.dev/en): Free browser-based utilities — PDF conversion, image compression, BMI, QR codes, calculators.

## Documentation

- [StyleSnap FAQ](${SITE_URL}/en/stylesnap/faq): Pricing, browser support, activation across devices.
- [Privacy Policy](${SITE_URL}/en/privacy): What is collected (licence key, email, feedback) and what is not (browsing activity, inspected CSS).

## Blog

${blog.join("\n")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
