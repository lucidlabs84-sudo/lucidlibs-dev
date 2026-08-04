import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, API routes, internal Next.js paths, and crawler files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/screenshots") ||
    pathname.startsWith("/downloads") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    pathname === "/opengraph-image" ||
    pathname.startsWith("/opengraph-image") ||
    /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|zip|woff2?|ttf|eot)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Already has locale prefix → pass through
  const localeMatch = pathname.match(/^\/(en|zh)(\/|$)/);
  if (localeMatch) {
    return NextResponse.next();
  }

  // 3. No locale → detect from cookie first, then Accept-Language, then fallback
  const langCookie = request.cookies.get("lang")?.value;
  const acceptLang = request.headers.get("accept-language") || "";

  let detectedLocale: string;
  let negotiated: boolean;
  if (langCookie === "en" || langCookie === "zh") {
    detectedLocale = langCookie;
    negotiated = true;
  } else if (acceptLang.startsWith("zh")) {
    detectedLocale = "zh";
    negotiated = true;
  } else {
    detectedLocale = DEFAULT_LOCALE;
    negotiated = false;
  }

  const newPathname = `/${detectedLocale}${pathname === "/" ? "" : pathname}`;
  const newUrl = new URL(newPathname, request.url);
  // Preserve query params from original request (e.g. Dodo Payments callback params)
  newUrl.search = request.nextUrl.search;

  // Crawlers send neither cookie nor a zh Accept-Language, so they always land in the
  // non-negotiated branch and get a 308. That is what makes /en (not /) the canonical URL —
  // with the old blanket 307 Google kept the un-prefixed URL and dropped /en as a duplicate.
  // Real visitors whose locale was negotiated keep a 307 so the choice is never cached.
  const response = NextResponse.redirect(newUrl, negotiated ? 307 : 308);
  if (negotiated) response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|screenshots|downloads|favicon\\.ico|sitemap\\.xml|robots\\.txt|llms\\.txt|opengraph-image).*)"],
};
