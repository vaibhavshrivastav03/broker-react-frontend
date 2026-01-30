/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ DO NOT use static export on Amplify SSR
  // output: "export",

  // ✅ Required for Amplify SSR
  experimental: {
    serverActions: true,
  },

  images: {
    // Amplify SSR supports optimized images
    unoptimized: false,
  },

  eslint: {
    // Do not block build on lint errors
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Do not block build on TS errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
