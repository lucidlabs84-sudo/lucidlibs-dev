import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return pageMetadata(locale, "/stylesnap/faq", {
    en: {
      title: "StyleSnap FAQ — Pricing, Features, Browser Support",
      description:
        "Answers about StyleSnap: what it extracts, which browsers it supports, how the one-time license works, and how activation across devices is handled.",
    },
    zh: {
      title: "StyleSnap 常见问题 — 价格、功能、浏览器支持",
      description:
        "关于 StyleSnap CSS 提取器的常见问题：能提取什么、支持哪些浏览器、一次性买断如何计费、多设备如何激活。",
    },
  });
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
