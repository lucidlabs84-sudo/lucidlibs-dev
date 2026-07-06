"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/stylesnap/i18n/context";

function SuccessContent() {
  const { t, lang } = useI18n();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const licenseKey = searchParams.get("license_key") || "";
  const email = searchParams.get("email") || "";
  const status = searchParams.get("status") || "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = licenseKey;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-lg px-6">
        {status === "succeeded" && licenseKey ? (
          <>
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-2">{t("success.title") as string}</h1>
            <p className="text-muted mb-8">
              {t("success.subtitle") as string}
            </p>

            {/* License Key Card */}
            <div className="bg-background border border-border rounded-xl p-6 mb-8 text-left">
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
                {t("success.licenseKeyLabel") as string}
              </label>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm tracking-wider select-all break-all">
                  {licenseKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 px-4 py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-accent transition cursor-pointer"
                >
                  {copied ? (t("success.copied") as string) : (t("success.copy") as string)}
                </button>
              </div>
              {email && (
                <p className="mt-3 text-xs text-muted">
                  {t("success.associatedEmail") as string} <span className="font-mono">{decodeURIComponent(email)}</span>
                </p>
              )}
            </div>

            {/* Activation Steps */}
            <div className="text-left mb-8">
              <h2 className="text-lg font-semibold mb-4">{t("success.howToActivate") as string}</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center">1</span>
                  <div>
                    <p className="font-medium">{t("success.step1Title") as string}</p>
                    <p className="text-sm text-muted">{t("success.step1Desc") as string}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center">2</span>
                  <div>
                    <p className="font-medium">{t("success.step2Title") as string}</p>
                    <p className="text-sm text-muted">{t("success.step2Desc") as string}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center">3</span>
                  <div>
                    <p className="font-medium">{t("success.step3Title") as string}</p>
                    <p className="text-sm text-muted">{t("success.step3Desc") as string}</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <strong>{t("success.noteLabel") as string}</strong> {t("success.noteText") as string}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">{t("success.invalidTitle") as string}</h1>
            <p className="text-muted mb-6">
              {t("success.invalidDesc") as string}
            </p>
          </>
        )}

        <Link
          href={`/${lang}/stylesnap`}
          className="inline-block text-sm text-muted hover:text-foreground transition"
        >
          {t("success.backHome") as string}
        </Link>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const { t } = useI18n();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-muted">{t("success.loading") as string}</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}