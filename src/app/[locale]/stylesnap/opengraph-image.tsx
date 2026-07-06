import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "StyleSnap — AI-Powered CSS Style Extractor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col"
        style={{
          background: "#0d0d12",
          fontFamily: "Inter",
          padding: "60px 80px",
        }}
      >
        {/* Top accent bar */}
        <div
          tw="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: "linear-gradient(90deg, #533afd, #a855f7, #ec4899)" }}
        />
        <div tw="flex flex-col justify-center flex-1">
          {/* Logo */}
          <span
            tw="text-base font-medium tracking-widest uppercase mb-8"
            style={{ color: "#a78bfa" }}
          >
            LucidLibs
          </span>
          {/* Product name */}
          <span
            tw="text-7xl font-bold mb-4"
            style={{ color: "#ffffff", letterSpacing: "-0.03em" }}
          >
            StyleSnap
          </span>
          {/* Tagline */}
          <span
            tw="text-3xl font-light"
            style={{ color: "#a1a1aa" }}
          >
            AI-Powered CSS Style Extractor
          </span>
          {/* Features row */}
          <div tw="flex gap-6 mt-10">
            {["Extract CSS", "Tailwind Ready", "Design Tokens", "$29 One-Time"].map(
              (feat) => (
                <div
                  key={feat}
                  tw="px-5 py-2.5 rounded-xl text-lg font-medium"
                  style={{ background: "#1a1a24", color: "#d4d4d8" }}
                >
                  {feat}
                </div>
              )
            )}
          </div>
        </div>
        {/* Bottom bar */}
        <div tw="flex items-center justify-between">
          <span tw="text-lg" style={{ color: "#52525b" }}>Browser Extension</span>
          <span tw="text-lg" style={{ color: "#52525b" }}>lucidlibs.dev/stylesnap</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
