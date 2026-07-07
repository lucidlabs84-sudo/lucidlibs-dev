"use client";

import { StudioI18nProvider } from "@/i18n/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lang } from "@/lib/i18n-detect";
import { usePathname } from "next/navigation";

export default function LocaleI18nWrapper({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Lang;
}) {
  const pathname = usePathname();
  const isStyleSnap = pathname?.includes("/stylesnap");

  return (
    <StudioI18nProvider initialLocale={initialLocale}>
      {!isStyleSnap && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isStyleSnap && <Footer />}
    </StudioI18nProvider>
  );
}
