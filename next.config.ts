import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy requests starting with /api
        destination: 'http://localhost:8080/api/:path*', // Forward to Argo Workflows backend
      },
    ];
  },
};

export default nextConfig;
