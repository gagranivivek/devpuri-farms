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
    // Use custom domain without basePath. If serving from repo subdomain, uncomment these:
    // basePath: '/devpuri-farms-analysis',
    // assetPrefix: '/devpuri-farms-analysis/',
  }),
};

export default nextConfig;
