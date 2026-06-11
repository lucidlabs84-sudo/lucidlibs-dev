import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

import I18nWrapper from "@/components/I18nWrapper";

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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <I18nWrapper>{children}</I18nWrapper>
      </body>
    </html>
  );
}