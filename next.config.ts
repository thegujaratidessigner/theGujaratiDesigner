import type { NextConfig } from "next";

// CSP is set per-request in middleware (proxy.ts) so nonces work.
// Only static security headers live here.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.10"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s0.wp.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Legacy /start-project URL is fully replaced by /start.
      // 308 = permanent + preserves method/body. Query string carries automatically.
      { source: "/start-project", destination: "/start", permanent: true },
      { source: "/start-project/:path*", destination: "/start", permanent: true },
    ];
  },
};

export default nextConfig;
