/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
  },
};

module.exports = nextConfig;
