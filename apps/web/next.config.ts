// custom next.js configuration to define path aliases using webpack

import path from 'path';
import type { Configuration } from 'webpack';

const nextConfig = {
  webpack: (config: Configuration) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@shared': path.resolve(__dirname, '../../shared'),
        '@': path.resolve(__dirname, './'),
      };
    }
    return config;
  },
};

export default nextConfig;