"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useStudioI18n } from "@/i18n/context";

export default function Footer() {
  const { t, lang } = useStudioI18n();

  return (
    <footer id="contact" className="py-16" style={{ borderTop: "1px solid var(--border)", background: "var(--canvas)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-xl p-8 md:p-12 text-center" style={{ background: "var(--canvas-soft)", border: "1px solid var(--border)" }}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              {t("footer.tag") as string}
            </p>
            <h2 className="mb-4" style={{ fontFamily: "var(--font-sans)", fontSize: "26px", fontWeight: 300, lineHeight: 1.12, letterSpacing: "-0.26px", color: "var(--foreground)", fontFeatureSettings: '"ss01" 1' }}>
              {t("footer.title") as string}
            </h2>
            <p className="mb-8 max-w-[50ch] mx-auto" style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 300, lineHeight: 1.4, color: "var(--ink-secondary)" }}>
              {t("footer.subtitle") as string}
            </p>
            <a href="mailto:lucidlibs@outlook.com" className="btn-primary" style={{ padding: "10px 24px", fontSize: "16px", fontWeight: 400 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 4L6.5 7.5L8 8.5L9.5 7.5L14 4" />
                <rect x="1" y="2" width="14" height="12" rx="2" />
              </svg>
              lucidlibs@outlook.com
            </a>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent)", color: "var(--on-primary)", fontFamily: "var(--font-mono)" }}>LL</div>
            <span className="text-sm" style={{ color: "var(--muted)", fontWeight: 300 }}>LucidLibs</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/lucidlabs84-sudo" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--muted)", fontWeight: 300 }}>{t("footer.links.github") as string}</a>
            <Link href={`/${lang}/stylesnap`} className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--muted)", fontWeight: 300 }}>{t("footer.links.stylesnap") as string}</Link>
            <a href="mailto:lucidlibs@outlook.com" className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--muted)", fontWeight: 300 }}>{t("footer.links.email") as string}</a>
          </div>

          <p className="text-xs" style={{ color: "var(--ink-secondary)", fontWeight: 300, opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} LucidLibs. {t("footer.copyright") as string}
          </p>
        </div>
      </div>
    </footer>
  );
}
