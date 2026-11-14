import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened at 127.0.0.1. Next only allows localhost unless this is set.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      // The synthetic classification lab is a reviewer tool, not the reader-facing incident view.
      { source: "/frameworks/incident-lab", destination: "/review/incident-lab", permanent: true },
    ];
  },
};

export default nextConfig;
