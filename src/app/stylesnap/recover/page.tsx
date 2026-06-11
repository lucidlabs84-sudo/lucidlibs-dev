"use client";

import { useState } from "react";
import { useI18n } from "@/stylesnap/i18n/context";
import Link from "next/link";

const PROXY_BASE_URL = "https://api.lucidlibs.dev";

export default function LicenseRecoveryPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ sent: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${PROXY_BASE_URL}/api/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      setResult({ sent: data.sent, message: data.message });
    } catch {
      setResult({
        sent: false,
        message: (t("recovery.errorNetwork") as string) || "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-background flex items-center justify-center">
          <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          {t("recovery.title") as string}
        </h1>
        <p className="text-muted text-sm text-center mb-8">
          {t("recovery.subtitle") as string}
        </p>

        {/* Form */}
        {!result?.sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
                {t("recovery.emailLabel") as string}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("recovery.emailPlaceholder") as string}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground/10 transition"
                disabled={loading}
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim() || !email.includes("@")}
              className="w-full bg-foreground text-background font-medium py-3 rounded-xl hover:bg-accent transition disabled:opacity-40 cursor-pointer"
            >
              {loading ? t("recovery.sending") as string : t("recovery.submit") as string}
            </button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-green-800 font-medium mb-1">
              {t("recovery.checkInbox") as string}
            </p>
            <p className="text-xs text-green-600">
              {t("recovery.checkSpam") as string}
            </p>
          </div>
        )}

        {/* Error */}
        {result && !result.sent && (
          <div className="mt-4 bg-accent-soft border border-accent/30 rounded-lg p-4 text-sm text-foreground">
            {result.message}
          </div>
        )}

        {/* Back link */}
        <div className="mt-8 text-center space-y-2">
          <Link
            href="/stylesnap"
            className="inline-block text-sm text-muted hover:text-foreground transition"
          >
            ← {t("recovery.backHome") as string}
          </Link>
          <br />
          <a
            href="mailto:lucidlibs@outlook.com"
            className="inline-block text-xs text-muted hover:text-foreground transition"
          >
            {t("recovery.contactSupport") as string}
          </a>
        </div>
      </div>
    </div>
  );
}