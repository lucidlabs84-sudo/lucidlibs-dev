"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 text-center">
            <p className="text-accent font-mono text-sm mb-3 tracking-wider uppercase">
              Contact
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              Have an idea? Let&apos;s talk.
            </h2>
            <p className="text-muted text-base max-w-[50ch] mx-auto mb-8 leading-relaxed">
              Whether it&apos;s feedback on StyleSnap, a bug report, or an idea
              for the next tool — I&apos;m always listening.
            </p>
            <a
              href="mailto:lucidlibs@outlook.com"
              className="inline-flex h-12 px-8 rounded-full bg-accent text-background font-semibold text-sm hover:bg-accent/90 transition-colors items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4L6.5 7.5L8 8.5L9.5 7.5L14 4" />
                <rect x="1" y="2" width="14" height="12" rx="2" />
              </svg>
              lucidlibs@outlook.com
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center text-background font-mono font-bold text-xs">
              LL
            </div>
            <span className="text-muted text-sm">LucidLibs</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/lucidlabs84-sudo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://style.lucidlibs.dev"
              className="text-muted hover:text-foreground transition-colors text-sm"
            >
              StyleSnap
            </a>
            <a
              href="mailto:lucidlibs@outlook.com"
              className="text-muted hover:text-foreground transition-colors text-sm"
            >
              Email
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted/60 text-xs">
            &copy; {new Date().getFullYear()} LucidLibs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}