"use client";

import { I18nProvider } from "@/stylesnap/i18n/context";
import { Lang } from "@/lib/i18n-detect";

export function StylesnapLayoutClient({
  children,
  locale,
  jsonLd,
}: {
  children: React.ReactNode;
  locale: string;
  jsonLd: Record<string, unknown>;
}) {
  return (
    <I18nProvider initialLocale={locale as Lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </I18nProvider>
  );
}
