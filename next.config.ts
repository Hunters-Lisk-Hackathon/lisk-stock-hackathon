import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Externalize server packages that have test files
  serverExternalPackages: [
    'thread-stream',
    'pino',
    'pino-abstract-transport',
    'sonic-boom',
  ],

  // Empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
