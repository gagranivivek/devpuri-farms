/**
 * Get the correct image path with basePath
 * Uses Next.js basePath from environment during build
 */
export function getImagePath(path) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return basePath ? `${basePath}${path}` : path;
}


