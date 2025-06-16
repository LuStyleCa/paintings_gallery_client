import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['paintings-gallery-bucket.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
