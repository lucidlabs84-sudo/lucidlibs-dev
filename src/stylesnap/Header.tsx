"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/stylesnap/i18n/context";
import { localesWithArticle } from "@/lib/blog";

export default function StyleSnapHeader() {
  const { t, lang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const otherLang = lang === "zh" ? "en" : "zh";
  const switchLabel = lang === "zh" ? "EN" : "中文";

  const switchLang = () => {
    const rest = pathname?.replace(/^\/(zh|en)/, "") || "/stylesnap";

    // en and zh carry different article sets, and a missing one is now a real 404 —
    // fall back to the other language's blog index instead of a dead end.
    const article = rest.match(/^\/stylesnap\/blog\/(.+)$/);
    if (article && !localesWithArticle(article[1]).includes(otherLang)) {
      router.push(`/${otherLang}/stylesnap/blog`);
      return;
    }

    router.push(`/${otherLang}${rest}`);
  };

  const links = [
    { label: t("nav.features"), href: `/${lang}/stylesnap#features` },
    { label: t("nav.pricing"), href: `/${lang}/stylesnap#pricing` },
    { label: t("nav.faq"), href: `/${lang}/stylesnap/faq` },
    { label: t("nav.blog"), href: `/${lang}/stylesnap/blog` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#0b1120]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${lang}/stylesnap`} className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <span>Style</span>
          <span className="text-indigo-400">Snap</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={switchLang}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all"
          >
            {switchLabel}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={switchLang}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-slate-300"
          >
            {switchLabel}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-slate-300"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <><path d="M4 6H20M4 12H20M4 18H20" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f172a]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
