import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nirvanatoday.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop/product",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop/product/:slug",
        destination: "/product/:slug",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/shop/type/:type",
        destination: "/:type",
        permanent: true,
      },
      {
        source: "/shop/:family",
        destination: "/:family",
        permanent: true,
      },
      {
        source: "/shop/:family/:item",
        destination: "/:family/:item",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
