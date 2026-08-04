import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Without this, Next.js emits relative hreflang hrefs (href="/en"), which Google ignores.
  metadataBase: new URL(SITE_URL),
  title: "LucidLibs — Indie Developer Studio",
  description:
    "Building tools that make development delightful. StyleSnap and more — crafted by an independent developer.",
  keywords: [
    "developer tools",
    "CSS extractor",
    "StyleSnap",
    "browser extension",
    "indie developer",
  ],
  openGraph: {
    title: "LucidLibs — Indie Developer Studio",
    description: "Building tools that make development delightful.",
    url: "https://lucidlibs.dev",
    siteName: "LucidLibs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LucidLibs — Indie Developer Studio",
    description: "Building tools that make development delightful.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PT27K9GE8Z"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-PT27K9GE8Z');`}
      </Script>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
