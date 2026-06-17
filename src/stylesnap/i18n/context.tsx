"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import en from "./en.json";
import zh from "./zh.json";
import { Lang, detectLang, setStoredLang } from "@/lib/i18n-detect";

type Translations = Record<string, unknown>;

const resources: Record<Lang, Translations> = { en, zh };

interface I18nContextType {
  lang: Lang;
  t: (key: string, options?: { returnObjects?: boolean }) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Start with "en" to match SSR output, detect real lang after hydration
  const [lang, setLang] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    detectLang().then((detected) => {
      if (detected !== "en") {
        setLang(detected);
        document.documentElement.lang = detected;
      }
      setHydrated(true);
    });
  }, []);

  const t = useCallback(
    (key: string, options?: { returnObjects?: boolean }): any => {
      const value = getNestedValue(resources[lang] as Record<string, unknown>, key);
      if (options?.returnObjects) return value;
      return String(value ?? key);
    },
    [lang]
  );

  const toggleLang = useCallback(() => {
    const next: Lang = lang === "en" ? "zh" : "en";
    setLang(next);
    setStoredLang(next);
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
