/**
 * Génère une URL Cloudflare Images optimisée
 * Fallback vers l'URL originale si pas sur custom domain
 *
 * @param originalUrl - URL R2 de l'image originale
 * @param options - Options de transformation
 * @returns URL optimisée ou originale si transformation impossible
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  options: {
    format?: 'auto' | 'avif' | 'webp'
    quality?: number
    width?: number
  } = {},
): string {
  if (!originalUrl) return ''

  // Fallback : si URL r2.dev, pas de transformation possible
  if (originalUrl.includes('.r2.dev')) {
    return originalUrl
  }

  try {
    const { format = 'webp', quality = 80, width = 800 } = options

    const params = [
      `width=${width}`,
      `quality=${quality}`,
      `format=${format}`,
      'fit=scale-down',
    ].join(',')

    const url = new URL(originalUrl)
    return `${url.origin}/cdn-cgi/image/${params}${url.pathname}`
  } catch {
    // URL invalide, retourner l'originale
    return originalUrl
  }
}
