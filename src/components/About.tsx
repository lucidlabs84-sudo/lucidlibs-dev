"use client";

import { motion } from "framer-motion";

const principles = [
  {
    title: "Focus over features",
    desc: "Every tool solves one problem well. No bloat, no settings page fatigue.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3V5M12 19V21M3 12H5M19 12H21" />
      </svg>
    ),
  },
  {
    title: "Fair pricing",
    desc: "One-time purchases. No subscriptions, no hidden tiers. Pay once, own forever.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    title: "Crafted by hand",
    desc: "Not a VC-funded factory. Every pixel, every line of code is reviewed by one person who cares.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61A5.5 5.5 0 0016 2A5.5 5.5 0 0011.16 4.61M7.5 4.61A5.5 5.5 0 003 2A5.5 5.5 0 000.16 4.61" />
        <path d="M12 8V16M8 12H16" />
      </svg>
    ),
  },
  {
    title: "Open conversation",
    desc: "Feedback directly shapes the roadmap. No ticket queues, no corporate walls.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15A2 2 0 0119 15H5A2 2 0 013 15V3A2 2 0 015 1H19A2 2 0 0121 3V15Z" />
        <path d="M3 15L8 10M21 15L16 10" />
        <path d="M8 21H16M12 15V21" />
      </svg>
    ),
  },
];

export default function About() {
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
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            One person, one mission
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
                LucidLibs is an independent developer studio. Not a startup, not
                a team of 50. One person who builds tools for developers —
                because the best software comes from someone who actually uses
                it.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                I got tired of tools that over-promise and under-deliver. So I
                started building my own. Every product under LucidLibs started
                from a real frustration: a workflow that should be simpler, a
                task that should take seconds not hours.
              </p>
              <p className="text-muted text-base leading-relaxed">
                The name says it all — <span className="text-accent font-semibold">Lucid</span> (clear, easy to understand) + <span className="text-accent font-semibold">Libs</span> (libraries, tools). Software that makes your life clearer, not more complicated.
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
                  <div className="text-accent shrink-0 mt-0.5">{p.icon}</div>
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