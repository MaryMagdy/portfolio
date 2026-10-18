import type { NextConfig } from "next";

// Static export: the portfolio is plain HTML/CSS/JS and can be hosted anywhere
// (Vercel, GitHub Pages, Netlify) with no server.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
