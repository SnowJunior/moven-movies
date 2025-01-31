import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc"
      },
      {
        protocol: 'https',
        hostname: 'heroui.com',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      }
    ],
  },
};

export default nextConfig;
