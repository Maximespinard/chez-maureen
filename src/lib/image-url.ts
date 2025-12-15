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
    height?: number
    aspectRatio?: '4/3' | '1/1' | '16/9'
  } = {},
): string {
  if (!originalUrl) return ''

  // Fallback : si URL r2.dev, pas de transformation possible
  if (originalUrl.includes('.r2.dev')) {
    return originalUrl
  }

  try {
    const { format = 'webp', quality = 80, width = 800, aspectRatio } = options
    let { height } = options

    // Calcul automatique de la hauteur si aspectRatio fourni
    if (aspectRatio && !height) {
      const [w, h] = aspectRatio.split('/').map(Number)
      height = Math.round(width * (h / w))
    }

    const params = [
      `width=${width}`,
      ...(height ? [`height=${height}`] : []),
      `quality=${quality}`,
      `format=${format}`,
      height ? 'fit=cover' : 'fit=scale-down',
      ...(height ? ['gravity=auto'] : []),
    ].join(',')

    const url = new URL(originalUrl)
    return `${url.origin}/cdn-cgi/image/${params}${url.pathname}`
  } catch {
    // URL invalide, retourner l'originale
    return originalUrl
  }
}
