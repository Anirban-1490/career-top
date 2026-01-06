import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/images**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname:
          "/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        // pathname:
        //   "/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@ant-design/icons"],
  },
  /* config options here */
};

export default nextConfig;
