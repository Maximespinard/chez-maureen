import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

/**
 * Client R2 pour Cloudflare
 * Compatible avec AWS S3 API
 */
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

/**
 * Upload un fichier vers R2
 * @param buffer - Buffer du fichier
 * @param key - Clé unique du fichier (ex: "products/abc123.jpg")
 * @param contentType - Type MIME du fichier
 * @returns URL publique du fichier
 */
export async function uploadToR2(
  buffer: Buffer,
  key: string,
  contentType: string,
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })

    await r2Client.send(command)

    // Construire l'URL publique
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`
    return publicUrl
  } catch (error) {
    console.error("Erreur lors de l'upload vers R2:", error)
    throw new Error("Échec de l'upload de l'image")
  }
}

/**
 * Supprime un fichier de R2
 * @param key - Clé du fichier à supprimer
 * @returns true si suppression réussie
 */
export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    })

    await r2Client.send(command)
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression de R2:', error)
    return false
  }
}

/**
 * Génère une clé unique pour un fichier
 * @param originalName - Nom original du fichier
 * @returns Clé unique (ex: "products/1234567890-image.jpg")
 */
export function generateImageKey(originalName: string): string {
  const timestamp = Date.now()
  const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `products/${timestamp}-${cleanName}`
}
