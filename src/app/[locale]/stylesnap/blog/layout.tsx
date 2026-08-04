import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return pageMetadata(locale, "/stylesnap/blog", {
    en: {
      title: "StyleSnap Blog — CSS Extraction & Tailwind Guides",
      description:
        "Tutorials, comparisons, and deep dives on CSS extraction, Tailwind conversion, and frontend tooling.",
    },
    zh: {
      title: "StyleSnap 博客 — CSS 提取与 Tailwind 指南",
      description: "CSS 提取、Tailwind 转换和前端工具的教程、对比和深度分析。",
    },
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
