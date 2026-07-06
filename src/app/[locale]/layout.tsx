import type { Metadata } from "next";
import LocaleI18nWrapper from "@/components/LocaleI18nWrapper";

const localeMeta: Record<string, { title: string; description: string }> = {
  en: {
    title: "LucidLibs — Indie Developer Studio",
    description:
      "Building tools that make development delightful. StyleSnap and more — crafted by an independent developer.",
  },
  zh: {
    title: "LucidLibs — 独立开发者工作室",
    description:
      "打造让开发更愉悦的工具。StyleSnap 及更多 — 由独立开发者匠心打造。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMeta[locale] || localeMeta.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://lucidlibs.dev/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://lucidlibs.dev/${locale}`,
      siteName: "LucidLibs",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    keywords: [
      "developer tools",
      "CSS extractor",
      "StyleSnap",
      "browser extension",
      "indie developer",
      "开发工具",
    ],
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LocaleI18nWrapper initialLocale={locale as "en" | "zh"}>
      {children}
    </LocaleI18nWrapper>
  );
}
