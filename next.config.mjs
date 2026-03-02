import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // For GitHub Pages static export during build
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/devpuri-farms',
    assetPrefix: '/devpuri-farms/',
  }),
};

export default nextConfig;
