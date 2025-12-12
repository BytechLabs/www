import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/industries',
        destination: '/services',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
