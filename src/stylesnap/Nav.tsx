"use client";

import { useState } from "react";
import { useI18n } from "@/stylesnap/i18n/context";
import { openCheckout } from "@/stylesnap/lib/checkout";
import Link from "next/link";

const navLinks = [
  { labelKey: "nav.features", href: "/stylesnap#features" },
  { labelKey: "nav.pricing", href: "/stylesnap#pricing" },
  { labelKey: "nav.faq", href: "/stylesnap/faq" },
  { labelKey: "nav.blog", href: "/stylesnap/blog" },
];

export default function StyleNav() {
  const { t, toggleLang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/stylesnap" className="text-xl font-bold tracking-tight">
          Style<span className="text-accent">Snap</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition"
            >
              {t(link.labelKey) as string}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-sm text-muted hover:text-foreground transition px-2 py-1 rounded border border-transparent hover:border-border cursor-pointer"
          >
            {t("nav.switchLang") as string}
          </button>
          <button
            onClick={() => openCheckout()}
            className="bg-gradient-to-r from-accent to-accent-2 text-white text-sm font-medium px-5 py-2 rounded-lg hover:scale-[1.03] shadow-lg shadow-accent/25 transition cursor-pointer"
          >
            {t("nav.getStarted") as string}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <>
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-surface/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-muted hover:text-foreground transition text-sm font-medium"
              >
                {t(link.labelKey) as string}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}