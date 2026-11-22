import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened at 127.0.0.1. Next only allows localhost unless this is set.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      // The synthetic classification lab is a reviewer tool, not the reader-facing incident view.
      { source: "/frameworks/incident-lab", destination: "/review/incident-lab", permanent: true },
      // One taxonomy: the market-view pages are now sections of their canonical domain page.
      { source: "/markets/endpoint", destination: "/domains/corporate#endpoint", permanent: true },
      { source: "/markets/network", destination: "/domains/corporate#network", permanent: true },
      { source: "/markets/exposure", destination: "/domains/corporate#exposure", permanent: true },
      { source: "/markets", destination: "/domains", permanent: true },
      // ISPM was folded into ITDR (identity threat detection and posture) on 2026-11-18.
      { source: "/categories/ispm", destination: "/categories/itdr", permanent: true },
      { source: "/markets/:slug*", destination: "/domains", permanent: true },
    ];
  },
};

export default nextConfig;
