/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ REMOVE static export for Amplify SSR
  // output: "export",

  allowedDevOrigins: ["*.preview.same-app.com"],

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // ✅ Keep this true for Amplify
    unoptimized: true,

    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "vessels-cdn.s3.us-east-1.amazonaws.com",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vessels-cdn.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
