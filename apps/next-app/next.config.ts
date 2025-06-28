import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
