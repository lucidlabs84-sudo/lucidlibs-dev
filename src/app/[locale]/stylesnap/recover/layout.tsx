import type { Metadata } from "next";
import { noIndexMetadata } from "@/lib/seo";

// License recovery is an account action, not a landing page — keep it out of the index.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return noIndexMetadata(locale, "/stylesnap/recover", "Recover Your License — StyleSnap");
}

export default function RecoverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
