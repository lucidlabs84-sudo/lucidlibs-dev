"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
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

            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted mb-8">
              Thank you for purchasing StyleSnap Pro! Follow the steps below to activate your license.
            </p>

            {/* License Key Card */}
            <div className="bg-background border border-border rounded-xl p-6 mb-8 text-left">
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
                Your License Key
              </label>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 font-mono text-sm tracking-wider select-all break-all">
                  {licenseKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 px-4 py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-accent transition cursor-pointer"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              {email && (
                <p className="mt-3 text-xs text-muted">
                  Associated email: <span className="font-mono">{decodeURIComponent(email)}</span>
                </p>
              )}
            </div>

            {/* Activation Steps */}
            <div className="text-left mb-8">
              <h2 className="text-lg font-semibold mb-4">How to Activate</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center">1</span>
                  <div>
                    <p className="font-medium">Open StyleSnap</p>
                    <p className="text-sm text-muted">Click the StyleSnap icon in your browser toolbar to open the side panel.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center">2</span>
                  <div>
                    <p className="font-medium">Go to Settings</p>
                    <p className="text-sm text-muted">Click the gear icon in the side panel header.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center">3</span>
                  <div>
                    <p className="font-medium">Enter License Key</p>
                    <p className="text-sm text-muted">Paste the license key above into the license key field and click Activate.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your license allows activation on up to <strong>2 devices</strong>. If you need to move to a new device, deactivate the old one first in Settings.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Invalid Link</h1>
            <p className="text-muted mb-6">
              This page is only accessible after a successful payment. If you just purchased StyleSnap, check your email for the license key.
            </p>
          </>
        )}

        <Link
          href="/stylesnap"
          className="inline-block text-sm text-muted hover:text-foreground transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><p className="text-muted">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}