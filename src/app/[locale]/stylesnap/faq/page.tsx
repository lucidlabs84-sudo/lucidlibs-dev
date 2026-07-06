"use client";

import { useState } from "react";
import { useI18n } from "@/stylesnap/i18n/context";

export default function FAQPage() {
  const { t } = useI18n();
  const faqItems = t("faq.items", { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("faq.tag") as string}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              {t("faq.title") as string}
            </h1>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-background transition cursor-pointer"
                >
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  <span
                    className={`text-xl transition-transform shrink-0 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}