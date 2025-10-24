import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all HTTPS images
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",             // frontend path
        destination: "http://15.206.27.201/:path*", // backend HTTP
      },
    ];
  },
};

export default nextConfig;
