import type { NextConfig } from "next";

const STATIC_ASSET_CACHE = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.seallabs.io" }],
        destination: "https://seallabs.io/:path*",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:file(logo-mascot|seallabs-box).png",
        headers: [...STATIC_ASSET_CACHE],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
