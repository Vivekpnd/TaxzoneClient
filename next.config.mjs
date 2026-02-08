/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

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
