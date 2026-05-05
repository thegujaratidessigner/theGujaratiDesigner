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
  // Map the embedded /start-project Vite SPA living in /public/start-project
  async redirects() {
    return [
      // Always normalize to a trailing slash so the SPA's relative asset
      // URLs (./assets/...) resolve correctly to /start-project/assets/...
      { source: "/start-project", destination: "/start-project/", permanent: false },
    ];
  },
  async rewrites() {
    return [
      // Serve the SPA shell on the directory request
      { source: "/start-project/", destination: "/start-project/index.html" },
    ];
  },
};

export default nextConfig;
