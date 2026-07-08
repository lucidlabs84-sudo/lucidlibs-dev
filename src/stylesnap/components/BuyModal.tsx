"use client";

import { useState } from "react";
import { useI18n } from "@/stylesnap/i18n/context";
import { openCheckout } from "@/stylesnap/lib/checkout";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BuyModal({ open, onClose }: BuyModalProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const isValidEmail = email.includes("@") && email.includes(".");

  const handleBuy = async () => {
    if (!isValidEmail) return;
    setChecking(true);
    setError("");

    try {
      const result = await openCheckout(email.trim());

      if (result.duplicate) {
        setError(t("buyModal.duplicateError") as string);
        setChecking(false);
        return;
      }

      if (result.error) {
        setError(t("buyModal.checkoutError") as string);
        setChecking(false);
        return;
      }

      // Checkout opened successfully, close modal
      onClose();
    } catch {
      setError(t("buyModal.networkError") as string);
      setChecking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-xl font-bold mb-2">
          {t("buyModal.title") as string}
        </h2>
        <p className="text-sm text-muted mb-6">
          {t("buyModal.subtitle") as string}
        </p>

        <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
          {t("buyModal.emailLabel") as string}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") handleBuy(); }}
          placeholder={t("buyModal.emailPlaceholder") as string}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
          autoFocus
          disabled={checking}
        />

        {error && (
          <div className="mt-4 p-3 bg-amber-50/10 border border-amber-500/30 rounded-lg">
            <p className="text-sm text-amber-400">{error}</p>
            <a
              href={`/${typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "en"}/stylesnap/recover`}
              className="text-xs text-accent hover:underline mt-1 inline-block"
            >
              {t("buyModal.recoverLink") as string}
            </a>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={checking}
            className="flex-1 px-4 py-3 border border-border rounded-lg text-sm font-medium hover:bg-surface/50 transition cursor-pointer disabled:opacity-50"
          >
            {t("buyModal.cancel") as string}
          </button>
          <button
            onClick={handleBuy}
            disabled={!isValidEmail || checking}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-accent to-accent-2 text-white text-sm font-medium rounded-lg hover:scale-[1.02] shadow-lg shadow-accent/25 transition cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
          >
            {checking
              ? (t("buyModal.checking") as string)
              : (t("buyModal.cta") as string)}
          </button>
        </div>

        <p className="text-xs text-muted text-center mt-4">
          {t("buyModal.guarantee") as string}
        </p>
      </div>
    </div>
  );
}
