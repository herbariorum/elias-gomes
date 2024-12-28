import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https'
      },
      {
        hostname: 'eu-west-2.graphassets.com' ,
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
