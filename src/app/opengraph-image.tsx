import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LucidLibs — Indie Developer Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #533afd 0%, #7646e1 50%, #3b82f6 100%)",
          fontFamily: "Inter",
        }}
      >
        {/* Mesh gradient overlay */}
        <div
          tw="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }}
        />
        <div tw="flex flex-col items-center relative z-10">
          <span
            tw="text-8xl font-bold tracking-tight mb-4"
            style={{ color: "#ffffff", letterSpacing: "-0.03em" }}
          >
            LucidLibs
          </span>
          <span
            tw="text-3xl font-light tracking-wide"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Indie Developer Studio
          </span>
          <div
            tw="mt-10 px-8 py-3 rounded-full border border-white/20"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <span tw="text-xl text-white/80">lucidlibs.dev</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
