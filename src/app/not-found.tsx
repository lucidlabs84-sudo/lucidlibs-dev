import Link from "next/link";

// Rendered above the [locale] segment, so there is no i18n context here — keep both languages
// visible rather than guessing. Several already-crawled blog URLs now land here (an article that
// only exists in the other language), so it has to offer a way onward.
export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold tracking-widest text-muted mb-4">404</p>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="text-muted mb-8">
          This page does not exist, or is not available in this language.
          <br />
          该页面不存在，或没有当前语言的版本。
        </p>
        <div className="flex items-center justify-center gap-4 text-sm font-medium">
          <Link href="/en" className="underline">
            English home
          </Link>
          <span className="text-muted">·</span>
          <Link href="/zh" className="underline">
            中文首页
          </Link>
          <span className="text-muted">·</span>
          <Link href="/en/stylesnap/blog" className="underline">
            Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
