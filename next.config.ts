import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Zdjęcia produktów hostowane w WooCommerce (import katalogu).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cbh-polska.pl",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
