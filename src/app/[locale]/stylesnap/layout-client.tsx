"use client";

import { useEffect } from "react";
import { I18nProvider } from "@/stylesnap/i18n/context";
import { Lang } from "@/lib/i18n-detect";
import StyleSnapHeader from "@/stylesnap/Header";

export function StylesnapLayoutClient({
  children,
  locale,
  jsonLd,
}: {
  children: React.ReactNode;
  locale: string;
  jsonLd: Record<string, unknown>;
}) {
  // Set body to dark while on StyleSnap pages
  useEffect(() => {
    const orig = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0b1120";
    document.body.style.color = "#e2e8f0";
    return () => {
      document.body.style.backgroundColor = orig;
      document.body.style.color = "";
    };
  }, []);

  return (
    <I18nProvider initialLocale={locale as Lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="snap-theme">
        <StyleSnapHeader />
        {children}
      </div>
    </I18nProvider>
  );
}
