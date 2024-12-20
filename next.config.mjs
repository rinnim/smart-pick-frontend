/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "www.techlandbd.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "www.startech.com.bd",
      },
      {
        protocol: "https",
        hostname: "www.ryans.com",
      },
      {
        protocol: "https",
        hostname: "ryans.com",
      }
    ],
  },
};

export default nextConfig;
