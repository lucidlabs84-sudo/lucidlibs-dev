import type { Metadata } from "next";
import { I18nProvider } from "@/stylesnap/i18n/context";
import StyleNav from "@/stylesnap/Nav";
import StyleFooter from "@/stylesnap/Footer";

const localeMeta: Record<string, { title: string; description: string }> = {
  en: {
    title: "StyleSnap - AI-Powered CSS Style Extractor & Code Generator",
    description:
      "Extract any CSS style, edit live, and export as React/Vue/Tailwind code. $29 one-time purchase.",
  },
  zh: {
    title: "StyleSnap - AI 驱动 CSS 样式提取器与代码生成器",
    description:
      "提取任意 CSS 样式，实时编辑，导出为 React/Vue/Tailwind 代码。一次买断 $29。",
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
      canonical: `https://lucidlibs.dev/${locale}/stylesnap`,
      languages: {
        en: "/en/stylesnap",
        zh: "/zh/stylesnap",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://lucidlibs.dev/${locale}/stylesnap`,
      siteName: "LucidLibs",
      type: "website",
    },
  };
}

export default async function StyleSnapLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <I18nProvider initialLocale={locale as "en" | "zh"}>
      <div className="snap-theme min-h-screen flex flex-col bg-background text-foreground">
        <StyleNav />
        <main className="flex-1">{children}</main>
        <StyleFooter />
      </div>
    </I18nProvider>
  );
}
