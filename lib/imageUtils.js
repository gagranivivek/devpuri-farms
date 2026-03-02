/**
 * Get the correct image path accounting for basePath
 * - Development (localhost): returns path as-is e.g., /logo.jpg
 * - Production (GitHub Pages): prepends basePath e.g., /devpuri-farms/logo.jpg
 */
export function getImagePath(path) {
  // In development, use the path directly
  // In production, the basePath is automatically prepended by Next.js for Image component
  // But since we're using regular <img> tags, we need to manually prepend it
  
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isDev && window.location.hostname.includes('github.io')) {
      return `/devpuri-farms${path}`;
    }
  }
  
  return path;
}

