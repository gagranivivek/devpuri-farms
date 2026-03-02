/**
 * Get the correct image path accounting for basePath in static export
 * In production (GitHub Pages), prepends basePath. In development, returns as-is.
 */
export function getImagePath(path: string): string {
  if (typeof window !== 'undefined') {
    // Client-side: use window.location to determine if we're on GitHub Pages
    const isDev = window.location.hostname === 'localhost';
    const basePath = '/devpuri-farms';
    return isDev ? path : path.startsWith(basePath) ? path : basePath + path;
  }
  // Server-side: use environment variable or config
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return basePath ? basePath + path : path;
}
