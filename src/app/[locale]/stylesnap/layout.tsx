import type { Metadata } from "next";
import { StylesnapLayoutClient } from "./layout-client";
import { alternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isZh = locale === "zh";

  return {
    title: isZh
      ? "StyleSnap — AI驱动的CSS样式提取器浏览器扩展"
      : "StyleSnap — AI-Powered CSS Style Extractor",
    description: isZh
      ? "一键提取任意网页的CSS样式，即时生成可复用代码。支持Tailwind CSS、CSS变量、设计Token导出。$29一次性买断。"
      : "Extract CSS styles from any website with one click. Generate reusable code instantly. Tailwind CSS, CSS variables, design tokens export. $29 one-time purchase.",
    openGraph: {
      title: isZh
        ? "StyleSnap — AI驱动的CSS样式提取器"
        : "StyleSnap — AI-Powered CSS Style Extractor",
      description: isZh
        ? "一键提取任意网页的CSS样式，即时生成可复用代码。"
        : "Extract CSS styles from any website with one click. Generate reusable code instantly.",
      url: `https://lucidlibs.dev/${locale}/stylesnap`,
      siteName: "LucidLibs",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isZh
        ? "StyleSnap — AI驱动的CSS样式提取器"
        : "StyleSnap — AI-Powered CSS Style Extractor",
      description: isZh
        ? "一键提取任意网页的CSS样式。$29一次性买断。"
        : "Extract CSS styles from any website. $29 one-time.",
    },
    alternates: alternates(locale, "/stylesnap"),
    keywords: [
      "CSS extractor",
      "StyleSnap",
      "browser extension",
      "CSS to Tailwind",
      "design tokens",
      "CSS变量提取",
      "样式提取",
    ],
  };
}

export default async function StylesnapLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StyleSnap",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: {
      "@type": "Offer",
      price: "29",
      priceCurrency: "USD",
    },
    description:
      "AI-powered CSS style extractor browser extension. Extract, convert, and export CSS from any website.",
    url: `https://lucidlibs.dev/${locale}/stylesnap`,
  };

  return (
    <StylesnapLayoutClient locale={locale} jsonLd={jsonLd}>
      {children}
    </StylesnapLayoutClient>
  );
}
