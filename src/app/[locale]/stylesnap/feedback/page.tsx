"use client";

import { useState } from "react";
import { useI18n } from "@/stylesnap/i18n/context";
import { submitFeedback } from "@/stylesnap/lib/feedback";

type FeedbackType = "praise" | "bug" | "feature" | "general";

const FEEDBACK_TYPES: { value: FeedbackType; emoji: string; labelKey: string }[] = [
  { value: "praise", emoji: "👍", labelKey: "feedback.typePraise" },
  { value: "bug", emoji: "🐛", labelKey: "feedback.typeBug" },
  { value: "feature", emoji: "💡", labelKey: "feedback.typeFeature" },
  { value: "general", emoji: "💬", labelKey: "feedback.typeGeneral" },
];

const RATING_EMOJI = ["", "😞", "😕", "😐", "😊", "🤩"];

export default function FeedbackPage() {
  const { t } = useI18n();
  const [type, setType] = useState<FeedbackType>("general");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    const res = await submitFeedback({
      type,
      message,
      email: email || undefined,
      rating: rating || undefined,
    });
    setLoading(false);
    if (res.ok) {
      setDone(true);
    } else {
      setError(t("feedback.error") as string);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-widest uppercase text-muted border border-border px-3 py-1 rounded-full">
          {t("feedback.tag") as string}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          {t("feedback.title") as string}
        </h1>
        <p className="mt-4 text-muted text-lg">
          {t("feedback.subtitle") as string}
        </p>
      </div>

      {done ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-3xl">
            ✅
          </div>
          <h2 className="text-xl font-bold">{t("feedback.thanks") as string}</h2>
          <p className="text-muted max-w-sm">
            {t("feedback.thanksDesc") as string}
          </p>
        </div>
      ) : (
        <div className="space-y-6 bg-surface border border-border rounded-2xl p-8 shadow-sm">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-3">
              {t("feedback.typeLabel") as string}
            </label>
            <div className="grid grid-cols-4 gap-3">
              {FEEDBACK_TYPES.map((ft) => (
                <button
                  key={ft.value}
                  onClick={() => setType(ft.value)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-sm border-2 transition-all cursor-pointer ${
                    type === ft.value
                      ? "border-foreground bg-accent-soft font-semibold"
                      : "border-border hover:border-border-hover text-muted"
                  }`}
                >
                  <span className="text-xl">{ft.emoji}</span>
                  <span>{t(ft.labelKey) as string}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("feedback.messageLabel") as string}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("feedback.messagePlaceholder") as string}
              rows={5}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none bg-background"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("feedback.ratingLabel") as string}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n === rating ? 0 : n)}
                  className={`flex-1 text-2xl py-2 rounded-xl border-2 transition-all cursor-pointer ${
                    rating === n
                      ? "border-foreground bg-accent-soft"
                      : "border-border hover:border-border-hover"
                  }`}
                >
                  {RATING_EMOJI[n]}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("feedback.emailLabel") as string}
            </label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 focus-within:border-foreground transition-colors bg-background">
              <span className="text-sm text-muted">✉</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("feedback.emailPlaceholder") as string}
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !message.trim()}
            className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-xl font-medium text-sm hover:bg-accent transition-colors disabled:opacity-40 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            ) : (
              <span>✉️</span>
            )}
            {t("feedback.submit") as string}
          </button>

          <p className="text-center text-sm text-muted">
            {t("feedback.directContact") as string}{" "}
            <a
              href="mailto:lucidlibs@outlook.com"
              className="text-foreground font-medium underline underline-offset-2 hover:no-underline"
            >
              lucidlibs@outlook.com
            </a>
          </p>
        </div>
      )}
    </section>
  );
}