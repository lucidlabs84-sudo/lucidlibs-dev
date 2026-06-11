"use client";

import { motion } from "framer-motion";
import { useStudioI18n } from "@/i18n/context";

const principleIcons = [
  <svg key="focus" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3V5M12 19V21M3 12H5M19 12H21" />
  </svg>,
  <svg key="pricing" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>,
  <svg key="craft" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61A5.5 5.5 0 0016 2A5.5 5.5 0 0011.16 4.61M7.5 4.61A5.5 5.5 0 003 2A5.5 5.5 0 000.16 4.61" />
    <path d="M12 8V16M8 12H16" />
  </svg>,
  <svg key="talk" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15A2 2 0 0119 15H5A2 2 0 013 15V3A2 2 0 015 1H19A2 2 0 0121 3V15Z" />
    <path d="M3 15L8 10M21 15L16 10" />
    <path d="M8 21H16M12 15V21" />
  </svg>,
];

export default function About() {
  const { t } = useStudioI18n();
  const principles = t("about.principles", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm mb-3 tracking-wider uppercase">
            {t("about.tag") as string}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t("about.title") as string}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl border border-border bg-surface p-8">
              <p className="text-foreground text-lg leading-relaxed mb-6">
                {t("about.story.p1") as string}
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                {t("about.story.p2") as string}
              </p>
              <p className="text-muted text-base leading-relaxed">
                {t("about.story.p3Prefix") as string}<span className="text-accent font-semibold">{t("about.story.p3Lucid") as string}</span>{t("about.story.p3LucidMeaning") as string}<span className="text-accent font-semibold">{t("about.story.p3Libs") as string}</span>{t("about.story.p3LibsMeaning") as string}
              </p>
            </div>
          </motion.div>

          {/* Principles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-xl border border-border bg-surface p-6 hover:border-border-hover hover:bg-surface-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-accent shrink-0 mt-0.5">{principleIcons[i]}</div>
                  <div>
                    <h4 className="text-foreground font-semibold text-sm mb-1">
                      {p.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}