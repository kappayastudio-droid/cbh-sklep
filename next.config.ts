import type { NextConfig } from "next";

import { legacyRedirects } from "./src/lib/legacy-redirects";

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
  // Przekierowania 301 ze starego sklepu WordPress — chronią pozycje w Google.
  async redirects() {
    return legacyRedirects();
  },
};

export default nextConfig;
