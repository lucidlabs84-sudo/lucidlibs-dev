"use client";

import { useI18n } from "@/stylesnap/i18n/context";
import Link from "next/link";

export default function StyleFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="text-xl font-bold tracking-tight mb-3">
              Style<span className="text-muted">Snap</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {t("footer.description") as string}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">
              {t("footer.product") as string}
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/stylesnap#features" className="hover:text-foreground transition">
                  {t("footer.features") as string}
                </Link>
              </li>
              <li>
                <Link href="/stylesnap#pricing" className="hover:text-foreground transition">
                  {t("footer.pricing") as string}
                </Link>
              </li>
              <li>
                <Link href="/stylesnap/faq" className="hover:text-foreground transition">
                  {t("footer.faq") as string}
                </Link>
              </li>
              <li>
                <Link href="/stylesnap/recover" className="hover:text-foreground transition">
                  {t("footer.recoverLicense") as string}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">
              {t("footer.resources") as string}
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/stylesnap/blog" className="hover:text-foreground transition">
                  {t("footer.blog") as string}
                </Link>
              </li>
              <li>
                <span className="text-border">{t("footer.changelog") as string}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">
              {t("footer.company") as string}
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <span className="text-border">{t("footer.privacy") as string}</span>
              </li>
              <li>
                <span className="text-border">{t("footer.terms") as string}</span>
              </li>
              <li>
                <Link href="/stylesnap/feedback" className="hover:text-foreground transition">
                  {t("footer.feedback") as string}
                </Link>
              </li>
              <li>
                <a href="mailto:lucidlibs@outlook.com" className="hover:text-foreground transition">
                  {t("footer.contact") as string}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted">
          {t("footer.copyright") as string}
        </div>
      </div>
    </footer>
  );
}