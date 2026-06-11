"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 animate-gradient opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #fafafa 0%, #fff7e6 25%, #fafafa 50%, #f0f0f0 75%, #fafafa 100%)",
        }}
      />

      {/* Accent glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 animate-glow blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 animate-glow blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Studio name */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-background font-mono font-bold text-lg">
              LL
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6">
            Building tools that
            <br />
            <span className="text-accent">make dev delightful</span>
          </h1>

          <p className="text-muted text-lg md:text-xl max-w-[65ch] mx-auto mb-12 leading-relaxed">
            Independent developer studio crafting browser extensions and
            developer tools. Simple, focused, and built with care.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#products"
              className="h-12 px-8 rounded-full bg-accent text-background font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center"
            >
              Explore Products
            </a>
            <a
              href="#about"
              className="h-12 px-8 rounded-full border border-border text-foreground font-medium text-sm hover:border-border-hover hover:bg-surface-hover transition-all flex items-center"
            >
              About the Studio
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
          <div className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-muted"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}