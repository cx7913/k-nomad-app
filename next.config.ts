import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.yeosu.go.kr",
      },
      {
        protocol: "https",
        hostname: "tour.yangyang.go.kr",
      },
      {
        protocol: "https",
        hostname: "www.chuncheon.go.kr",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
