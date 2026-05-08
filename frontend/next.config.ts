// frontend/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan koneksi ke backend Render
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  // Optional: jika kamu mau proxy API request lewat Next.js
  async rewrites() {
    return [
      // Uncomment ini kalau mau sembunyikan URL backend dari client
      // {
      //   source: "/api/:path*",
      //   destination: `${process.env.API_URL}/api/:path*`,
      // },
    ];
  },
};

export default nextConfig;