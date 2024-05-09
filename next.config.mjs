/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  transpilePackages: ["@mui/x-charts"],
};

export default nextConfig;
