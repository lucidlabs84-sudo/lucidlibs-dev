"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, Record<string, string>> = {
  en: {
    home: "Home",
    stylesnap: "StyleSnap",
    faq: "FAQ",
    blog: "Blog",
    recover: "Recover License",
    feedback: "Feedback",
    success: "Thank You",
  },
  zh: {
    home: "首页",
    stylesnap: "StyleSnap",
    faq: "常见问题",
    blog: "博客",
    recover: "找回许可证",
    feedback: "反馈",
    success: "感谢",
  },
};

const SITE = "https://lucidlibs.dev";

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  // pathname = "/en/stylesnap/faq" or "/zh" etc
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 1) return null;

  const locale = parts[0] as string;
  const labels = LABELS[locale] || LABELS.en;

  // Build breadcrumb items
  const items: { name: string; item: string }[] = [];

  // Home
  items.push({ name: labels.home, item: `${SITE}/${locale}` });

  // Second segment onwards
  let cumulative = `/${locale}`;
  for (let i = 1; i < parts.length; i++) {
    cumulative += `/${parts[i]}`;
    const key = parts[i]; // stylesnap, faq, blog, etc
    const name = labels[key] || parts[i];
    items.push({ name, item: cumulative });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
