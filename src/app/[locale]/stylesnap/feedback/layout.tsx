import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return pageMetadata(locale, "/stylesnap/feedback", {
    en: {
      title: "Send Feedback — StyleSnap",
      description:
        "Report a bug, request a feature, or tell us what is working. Feedback goes straight to the developer who builds StyleSnap.",
    },
    zh: {
      title: "反馈 — StyleSnap",
      description:
        "报告问题、提出功能建议，或者告诉我们哪里好用。反馈直达 StyleSnap 的开发者本人。",
    },
  });
}

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
