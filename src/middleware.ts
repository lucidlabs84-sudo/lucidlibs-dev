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
  let detectedLocale: string;
  if (langCookie === "en" || langCookie === "zh") {
    detectedLocale = langCookie;
  } else {
    const acceptLang = request.headers.get("accept-language") || "";
    detectedLocale = acceptLang.startsWith("zh") ? "zh" : DEFAULT_LOCALE;
  }

  const newPathname = `/${detectedLocale}${pathname === "/" ? "" : pathname}`;
  const newUrl = new URL(newPathname, request.url);
  // Preserve query params from original request (e.g. Dodo Payments callback params)
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|screenshots|downloads|favicon\\.ico|sitemap\\.xml|robots\\.txt|opengraph-image).*)"],
};
