/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakeimg.pl",
      "developers.google.com",
      "external-content.duckduckgo.com",
      "lh3.googleusercontent.com",
      "vrhyeprulbnxbynjopmp.supabase.co"], // Add the domain(s) where your images are hosted
  },
  eslint: {
    ignoreDuringBuilds: true
  },
}

module.exports = nextConfig
