/**
 * Language detection utility
 * Priority: localStorage (user preference) > browser language > IP geolocation > fallback "en"
 */

export type Lang = "en" | "zh";

const STORAGE_KEY = "lang";

/** Country code → language mapping for IP-based detection */
const COUNTRY_LANG_MAP: Record<string, Lang> = {
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  SG: "zh", // significant Chinese-speaking population
};

/** Detect language from browser's navigator */
function detectFromBrowser(): Lang | null {
  if (typeof navigator === "undefined") return null;
  const langs = navigator.languages || [navigator.language];
  for (const l of langs) {
    if (l.startsWith("zh")) return "zh";
  }
  return null;
}

/** Detect language from IP geolocation (async, may fail) */
async function detectFromIP(): Promise<Lang | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    const country: string = data.country_code;
    return COUNTRY_LANG_MAP[country] ?? null;
  } catch {
    return null;
  }
}

/** Read saved language preference from localStorage */
export function getStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") return stored;
  return null;
}

/** Save language preference to localStorage */
export function setStoredLang(lang: Lang): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

/**
 * Detect language with full priority chain.
 * Returns the detected Lang (sync part first, then optionally IP fallback).
 */
export async function detectLang(): Promise<Lang> {
  // 1. localStorage (user's explicit choice)
  const stored = getStoredLang();
  if (stored) return stored;

  // 2. Browser language
  const browser = detectFromBrowser();
  if (browser) return browser;

  // 3. IP geolocation
  const ip = await detectFromIP();
  if (ip) return ip;

  // 4. Fallback
  return "en";
}

/**
 * Synchronous detection (no IP fallback).
 * Used for SSR-safe initial state where async is not possible.
 */
export function detectLangSync(): Lang {
  const stored = getStoredLang();
  if (stored) return stored;
  return detectFromBrowser() ?? "en";
}
