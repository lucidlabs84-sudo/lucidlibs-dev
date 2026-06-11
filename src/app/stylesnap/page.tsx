"use client";

import { useI18n } from "@/stylesnap/i18n/context";
import { openCheckout } from "@/stylesnap/lib/checkout";

const iconMap: Record<string, string> = {
  crosshair: "◎",
  code: "⟨/⟩",
  palette: "◆",
  edit: "✎",
  screenshot: "▣",
  zap: "⚡",
};

export default function StyleSnapHome() {
  const { t } = useI18n();

  const features = t("features.items", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  const steps = t("workflow.steps", { returnObjects: true }) as Array<{
    num: string;
    title: string;
    desc: string;
  }>;
  const compRows = t("comparison.rows", { returnObjects: true }) as string[][];
  const compHeaders = t("comparison.headers", { returnObjects: true }) as string[];
  const pricingFeatures = t("pricing.features", { returnObjects: true }) as string[];

  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "StyleSnap",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Windows, macOS",
            offers: {
              "@type": "Offer",
              price: "29",
              priceCurrency: "USD",
            },
            description: t("seo.homeDesc") as string,
            browserRequirements: "Requires Microsoft Edge or Google Chrome",
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-soft)_0%,_transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-xs font-medium text-muted mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t("hero.badge") as string}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              {t("hero.title") as string}
              <br />
              <span className="bg-gradient-to-r from-foreground via-accent to-muted bg-clip-text text-transparent">
                {t("hero.titleAccent") as string}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
              {t("hero.subtitle") as string}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openCheckout()}
                className="bg-foreground text-background font-semibold px-8 py-4 rounded-xl text-lg hover:bg-accent transition-all hover:scale-[1.02] shadow-xl shadow-foreground/10 cursor-pointer"
              >
                {t("hero.cta") as string}
              </button>
              <span className="text-sm text-muted">
                {t("hero.ctaSub") as string}
              </span>
            </div>
            <p className="mt-8 text-sm text-muted">
              {t("hero.users") as string}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("features.tag") as string}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              {t("features.title") as string}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t("features.subtitle") as string}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl border border-border p-8 hover:border-border-hover transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center text-xl mb-5 group-hover:bg-accent transition-colors">
                  {iconMap[f.icon] || f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("workflow.tag") as string}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">
              {t("workflow.title") as string}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
                )}
                <div className="text-6xl font-black text-border mb-4">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("comparison.tag") as string}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">
              {t("comparison.title") as string}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  {compHeaders.map((h, i) => (
                    <th
                      key={i}
                      className={`py-4 px-4 text-left font-semibold ${
                        i > 0 ? "text-center w-28" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border hover:bg-surface transition"
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-4 px-4 ${
                          j > 0 ? "text-center font-medium" : "text-muted"
                        }`}
                      >
                        {cell === "✓" ? (
                          <span className="text-accent">✓</span>
                        ) : cell === "✗" ? (
                          <span className="text-border">✗</span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("pricing.tag") as string}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              {t("pricing.title") as string}
            </h2>
            <p className="text-muted text-lg">
              {t("pricing.subtitle") as string}
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-foreground p-10 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-semibold px-4 py-1 rounded-full">
                PRO
              </div>
              <div className="mt-2 mb-6">
                <span className="text-6xl font-black">
                  {t("pricing.price") as string}
                </span>
                <span className="text-muted text-lg ml-2">
                  {t("pricing.period") as string}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-left mb-8">
                {pricingFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openCheckout()}
                className="block w-full bg-foreground text-background font-semibold py-4 rounded-xl hover:bg-accent transition-all text-lg cursor-pointer"
              >
                {t("pricing.cta") as string}
              </button>
              <p className="text-xs text-muted mt-4">
                {t("pricing.guarantee") as string}
              </p>
              <p className="text-xs text-muted mt-1">
                {t("pricing.note") as string}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("hero.title") as string} {t("hero.titleAccent") as string}
          </h2>
          <p className="text-background/60 text-lg mb-10">
            {t("hero.subtitle") as string}
          </p>
          <button
            onClick={() => openCheckout()}
            className="inline-block bg-background text-foreground font-semibold px-10 py-4 rounded-xl text-lg hover:bg-accent transition-all cursor-pointer"
          >
            {t("hero.cta") as string}
          </button>
        </div>
      </section>
    </>
  );
}