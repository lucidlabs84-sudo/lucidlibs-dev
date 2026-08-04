import type { Metadata } from "next";
import { noIndexMetadata } from "@/lib/seo";

// Post-checkout confirmation. Nothing here is useful in search, and it used to inherit the
// StyleSnap landing page's canonical, which made it look like a duplicate of the product page.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return noIndexMetadata(locale, "/stylesnap/success", "Purchase Complete — StyleSnap");
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
