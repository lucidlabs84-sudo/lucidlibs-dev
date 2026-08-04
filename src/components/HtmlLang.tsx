"use client";

import { useEffect } from "react";

/**
 * The root layout renders <html lang="en"> for every route because it sits above the
 * [locale] segment and cannot read params without opting the whole tree into dynamic
 * rendering. Correct the attribute on the client so screen readers announce zh pages in
 * Chinese instead of English.
 */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
