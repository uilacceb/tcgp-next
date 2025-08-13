import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "limitlesstcg.nyc3.cdn.digitaloceanspaces.com" },
    ],
  },
};

export default nextConfig;
