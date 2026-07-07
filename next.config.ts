import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preconnect to external origins (CDN, analytics)
  // No external fonts used — everything is system/Gstatic

  // Cache static assets aggressively (immutable hashes in filenames)
  headers: async () => [
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/icons/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400" },
      ],
    },
    {
      source: "/screenshots/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=604800" },
      ],
    },
  ],

  // Compress responses (default in Vercel, explicit for clarity)
  compress: true,

  // Generate smaller CSS/JS (already default, explicit for clarity)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
