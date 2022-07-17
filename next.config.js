/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    DB: "mongodb://127.0.0.1:27017/test",
  },
};

module.exports = nextConfig;
