import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: '?v=1',
      },
    ],
  },
};

export default nextConfig;
