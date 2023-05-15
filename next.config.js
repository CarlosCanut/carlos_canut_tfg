/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.communitydragon.org", "ddragon.leagueoflegends.com"]
  }
}

module.exports = nextConfig
