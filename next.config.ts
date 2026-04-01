import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nirvanatoday.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
