"use client";

import { StudioI18nProvider } from "@/i18n/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lang } from "@/lib/i18n-detect";

export default function LocaleI18nWrapper({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Lang;
}) {
  return (
    <StudioI18nProvider initialLocale={initialLocale}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </StudioI18nProvider>
  );
}
