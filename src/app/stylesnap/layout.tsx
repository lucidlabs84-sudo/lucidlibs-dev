import type { Metadata } from "next";
import { I18nProvider } from "@/stylesnap/i18n/context";
import StyleNav from "@/stylesnap/Nav";
import StyleFooter from "@/stylesnap/Footer";

export const metadata: Metadata = {
  title: "StyleSnap - AI-Powered CSS Style Extractor & Code Generator",
  description:
    "Extract any CSS style, edit live, and export as React/Vue/Tailwind code. $29 one-time purchase.",
  openGraph: {
    title: "StyleSnap - AI-Powered CSS Style Extractor & Code Generator",
    description: "Extract any CSS style, edit live, and export as React/Vue/Tailwind code.",
    url: "https://lucidlibs.dev/stylesnap",
    siteName: "LucidLibs",
    type: "website",
  },
};

export default function StyleSnapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <div className="min-h-screen flex flex-col bg-surface text-foreground">
        <StyleNav />
        <main className="flex-1">{children}</main>
        <StyleFooter />
      </div>
    </I18nProvider>
  );
}