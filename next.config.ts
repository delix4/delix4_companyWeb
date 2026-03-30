import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  
  // Optimized for production
  swcMinify: true,
  compress: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize for Netlify
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Security headers
  poweredByHeader: false,
  
  // Build optimization
  productionBrowserSourceMaps: false,
  trailingSlash: false,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
