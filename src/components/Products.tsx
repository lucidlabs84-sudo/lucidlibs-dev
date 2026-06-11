"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useStudioI18n } from "@/i18n/context";

interface Product {
  name: string;
  tagline: string;
  description: string;
  price: string;
  status: "live" | "coming" | "planned";
  href: string;
  features: string[];
  icon: string;
}

const statusColors = {
  live: "bg-accent-soft text-accent border-accent/30",
  coming: "bg-muted/10 text-muted border-muted/30",
  planned: "bg-muted/5 text-muted/60 border-muted/20",
};

export default function Products() {
  const { t, lang } = useStudioI18n();

  const statusLabels: Record<string, string> = {
    live: t("products.statusLive") as string,
    coming: t("products.statusComing") as string,
    planned: t("products.statusPlanned") as string,
  };

  const productKeys = ["stylesnap", "coming", "planned"] as const;
  const productStatuses = ["live", "coming", "planned"] as const;
  const productHrefs = ["/stylesnap", "#", "mailto:lucidlibs@outlook.com"];
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
    <section id="products" className="py-24 md:py-32">
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
            {t("products.tag") as string}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t("products.title") as string}
          </h2>
          <p className="text-muted text-base max-w-[50ch] mt-4 leading-relaxed">
            {t("products.subtitle") as string}
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={productKeys[i]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {product.href.startsWith("/") ? (
                <Link
                  href={product.href}
                  className="group block h-full rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover hover:shadow-lg hover:shadow-accent/5 hover:scale-[1.02]"
                >
                  <ProductContent product={product} statusLabels={statusLabels} />
                </Link>
              ) : (
                <a
                  href={product.href}
                  className="group block h-full rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover hover:shadow-lg hover:shadow-accent/5 hover:scale-[1.02]"
                >
                  <ProductContent product={product} statusLabels={statusLabels} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductContent({
  product,
  statusLabels,
}: {
  product: Product;
  statusLabels: Record<string, string>;
}) {
  const { t } = useStudioI18n();

  return (
    <>
      {/* Icon + status */}
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
            product.status === "live"
              ? "bg-accent text-background"
              : "bg-muted/10 text-muted"
          }`}
        >
          {product.icon}
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[product.status]}`}
        >
          {statusLabels[product.status]}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold tracking-tight text-foreground mb-1 group-hover:text-accent transition-colors">
        {product.name}
      </h3>

      {/* Tagline */}
      <p className="text-muted text-sm mb-4">{product.tagline}</p>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed mb-6">
        {product.description}
      </p>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {product.features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-xs text-muted">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-accent shrink-0"
            >
              <path
                d="M2 7L5.5 10.5L12 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {f}
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-mono text-accent">{product.price}</span>
        {product.status === "live" && (
          <span className="text-xs text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
            {t("products.getItNow") as string}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6H10M7 3L10 6L7 9" />
            </svg>
          </span>
        )}
      </div>
    </>
  );
}