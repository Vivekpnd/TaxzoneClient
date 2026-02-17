/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "taxzone.store",
        pathname: "/wp/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
