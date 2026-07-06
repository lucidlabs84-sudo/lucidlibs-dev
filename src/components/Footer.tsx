"use client";

import Link from "next/link";
import { useStudioI18n } from "@/i18n/context";

export default function Footer() {
  const { t, lang } = useStudioI18n();

  return (
    <footer className="py-12" style={{ borderTop: "1px solid var(--border)", background: "#fafafa" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent)", color: "var(--on-primary)", fontFamily: "var(--font-mono)" }}>LL</div>
            <span className="text-sm" style={{ color: "var(--muted)", fontWeight: 400 }}>LucidLibs</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href={`/${lang}/stylesnap`} className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--muted)", fontWeight: 400 }}>{t("footer.links.stylesnap") as string}</Link>
            <a href="https://github.com/lucidlabs84-sudo" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--muted)", fontWeight: 400 }}>{t("footer.links.github") as string}</a>
            <a href="mailto:lucidlibs@outlook.com" className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--muted)", fontWeight: 400 }}>{t("footer.links.email") as string}</a>
          </div>

          <p className="text-xs" style={{ color: "var(--ink-secondary)", opacity: 0.5 }}>
            &copy; {new Date().getFullYear()} LucidLibs
          </p>
        </div>
      </div>
    </footer>
  );
}
