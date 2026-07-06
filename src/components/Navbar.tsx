"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStudioI18n } from "@/i18n/context";

export default function Navbar() {
  const { t, toggleLang, lang } = useStudioI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.products") as string, href: "#products" },
    { label: t("nav.about") as string, href: "#about" },
    { label: t("nav.contact") as string, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50" style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--accent)", color: "var(--on-primary)", fontFamily: "var(--font-mono)" }}>LL</div>
          <span className="font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--foreground)", letterSpacing: "-0.3px" }}>
            LucidLibs
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-light transition-colors duration-200 hover:opacity-70"
              style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>
              {link.label}
            </a>
          ))}
          <Link href={`/${lang}/stylesnap`} className="text-sm font-light transition-colors duration-200 hover:opacity-70"
            style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>
            {t("nav.stylesnap") as string}
          </Link>
          <a href="https://tools.lucidlibs.dev" target="_blank" rel="noopener noreferrer"
            className="text-sm font-light transition-colors duration-200 hover:opacity-70"
            style={{ color: "var(--muted)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>
            Free Tools
          </a>
          <button onClick={toggleLang}
            className="text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", borderColor: "var(--border)" }}>
            {t("nav.switchLang") as string}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleLang} className="text-xs font-medium px-2.5 py-1.5 rounded-full border"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", borderColor: "var(--border)" }}>
            {t("nav.switchLang") as string}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="transition-colors" style={{ color: "var(--muted)" }} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M6 6L18 18M6 18L18 6" /> : <><path d="M4 6H20" /><path d="M4 12H20" /><path d="M4 18H20" /></>}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden" style={{ background: "var(--canvas)", borderBottom: "1px solid var(--border)" }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-sm font-light" style={{ color: "var(--muted)" }}>{link.label}</a>
              ))}
              <Link href={`/${lang}/stylesnap`} onClick={() => setMobileOpen(false)}
                className="text-sm font-light" style={{ color: "var(--muted)" }}>{t("nav.stylesnap") as string}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
