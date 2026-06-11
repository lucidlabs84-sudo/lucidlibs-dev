"use client";

import { StudioI18nProvider } from "@/i18n/context";

export default function I18nWrapper({ children }: { children: React.ReactNode }) {
  return <StudioI18nProvider>{children}</StudioI18nProvider>;
}