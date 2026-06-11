"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import en from "./en.json";
import zh from "./zh.json";

type Lang = "en" | "zh";
type Translations = Record<string, unknown>;

const resources: Record<Lang, Translations> = { en, zh };

interface I18nContextType {
  lang: Lang;
  t: (key: string, options?: { returnObjects?: boolean }) => string | unknown;
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

export function StudioI18nProvider({ children }: { children: ReactNode }) {
  // Always start with "en" to match SSR output, then switch after hydration
  const [lang, setLang] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    const detected: Lang =
      stored === "en" || stored === "zh"
        ? stored
        : navigator.language.startsWith("zh")
          ? "zh"
          : "en";
    if (detected !== "en") {
      setLang(detected);
      document.documentElement.lang = detected;
    }
    setHydrated(true);
  }, []);

  const t = useCallback(
    (key: string, options?: { returnObjects?: boolean }) => {
      const value = getNestedValue(resources[lang] as Record<string, unknown>, key);
      if (options?.returnObjects) return value;
      return (value as string) ?? key;
    },
    [lang]
  );

  const toggleLang = useCallback(() => {
    const next: Lang = lang === "en" ? "zh" : "en";
    setLang(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", next);
      document.documentElement.lang = next;
    }
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useStudioI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useStudioI18n must be used within StudioI18nProvider");
  return ctx;
}