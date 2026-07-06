"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useStudioI18n } from "@/i18n/context";

interface Product {
  name: string; tagline: string; description: string; price: string;
  status: "live" | "coming" | "planned"; href: string; features: string[]; icon: string;
}

export default function Products() {
  const { t, lang } = useStudioI18n();

  const statusLabels: Record<string, string> = {
    live: t("products.statusLive") as string,
    coming: t("products.statusComing") as string,
    planned: t("products.statusPlanned") as string,
  };

  const productKeys = ["stylesnap", "coming", "planned"] as const;
  const productStatuses = ["live", "coming", "planned"] as const;
  const productHrefs = [`/${lang}/stylesnap`, "#", "mailto:lucidlibs@outlook.com"];
  const productIcons = ["SS", "?", "+"];

  const products: Product[] = productKeys.map((key, i) => ({
    name: t(`products.${key}.name`) as string,
    tagline: t(`products.${key}.tagline`) as string,
    description: t(`products.${key}.description`) as string,
    price: t(`products.${key}.price`) as string,
    status: productStatuses[i],
    href: productHrefs[i],
    features: t(`products.${key}.features`, { returnObjects: true }) as string[],
    icon: productIcons[i],
  }));

  return (
    <section id="products" className="py-24 md:py-32" style={{ background: "var(--canvas-soft)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            {t("products.tag") as string}
          </p>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "32px", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.64px", color: "var(--foreground)", fontFeatureSettings: '"ss01" 1' }}>
            {t("products.title") as string}
          </h2>
          <p className="mt-4 max-w-[50ch]" style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 300, lineHeight: 1.4, color: "var(--muted)" }}>
            {t("products.subtitle") as string}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const card = (
              <motion.div
                key={productKeys[i]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="group h-full rounded-xl p-8 transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: "var(--canvas)", border: "1px solid var(--border)",
                    boxShadow: product.status === "live" ? "var(--shadow-sm)" : "none",
                  }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{
                        background: product.status === "live" ? "var(--accent)" : "var(--canvas-soft)",
                        color: product.status === "live" ? "var(--on-primary)" : "var(--muted)",
                        fontFamily: "var(--font-mono)",
                      }}>
                      {product.icon}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full border"
                      style={{
                        background: product.status === "live" ? "var(--accent-subdued)" : "var(--canvas-soft)",
                        color: product.status === "live" ? "var(--accent-deep)" : "var(--muted)",
                        borderColor: product.status === "live" ? "transparent" : "var(--border)",
                      }}>
                      {statusLabels[product.status]}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-1 group-hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--foreground)", letterSpacing: "-0.2px" }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--muted)", fontWeight: 300 }}>
                    {product.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-secondary)", fontWeight: 300, fontFeatureSettings: '"ss01" 1' }}>
                    {product.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--muted)", fontWeight: 300 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" style={{ color: "var(--accent)" }}>
                          <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <span className="text-sm font-medium" style={{ color: "var(--accent)", fontFamily: "var(--font-sans)" }}>
                      {product.price}
                    </span>
                    {product.status === "live" && (
                      <span className="text-xs flex items-center gap-1 transition-colors" style={{ color: "var(--muted)", fontWeight: 300 }}>
                        {t("products.getItNow") as string}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M2 6H10M7 3L10 6L7 9" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return product.href.startsWith("/") ? (
              <Link key={productKeys[i]} href={product.href}>{card}</Link>
            ) : product.href.startsWith("mailto:") ? (
              <a key={productKeys[i]} href={product.href}>{card}</a>
            ) : (
              <div key={productKeys[i]}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
