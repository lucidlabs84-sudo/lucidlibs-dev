"use client";

import { motion } from "framer-motion";
import { useStudioI18n } from "@/i18n/context";

export default function Hero() {
  const { t } = useStudioI18n();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden gradient-mesh">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Studio badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "var(--grad-lavender)", color: "var(--accent)" }}>
              <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold"
                style={{ background: "var(--accent)", color: "var(--on-primary)" }}>LL</div>
              Indie Developer Studio
            </span>
          </div>

          <h1 className="mb-6" style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(40px, 8vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.8px",
            color: "var(--foreground)",
          }}>
            {t("hero.title") as string}
            <br />
            <span style={{ color: "var(--accent)" }}>{t("hero.titleAccent") as string}</span>
          </h1>

          <p className="mb-12 max-w-[55ch] mx-auto" style={{
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--ink-secondary)",
          }}>
            {t("hero.subtitle") as string}
          </p>

          {/* CTA — Stripe-style single indigo pill */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#products" className="btn-primary" style={{ padding: "10px 24px", fontSize: "16px", fontWeight: 400 }}>
              {t("hero.ctaPrimary") as string}
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full flex items-start justify-center p-1.5"
            style={{ border: "1px solid var(--border)" }}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full"
              style={{ background: "var(--muted)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
