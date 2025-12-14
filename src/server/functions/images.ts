import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { deleteFromR2, generateImageKey, uploadToR2 } from '@/lib/r2'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

/**
 * Schema pour l'upload d'image
 */
const UploadImageSchema = z.object({
  fileData: z.string(), // Base64
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
})

/**
 * Upload une image vers Cloudflare R2
 * Le fichier est envoyé en base64 depuis le client
 */
export const uploadImage = createServerFn({ method: 'POST' })
  .inputValidator(UploadImageSchema)
  .handler(async ({ data }) => {
    try {
      // Validation taille
      if (data.fileSize > MAX_FILE_SIZE) {
        throw new Error('Fichier trop volumineux (max 10MB)')
      }

      // Validation type
      if (!ALLOWED_TYPES.includes(data.fileType)) {
        throw new Error(
          'Type de fichier non supporté (jpg, png, webp uniquement)',
        )
      }

      // Conversion base64 → Buffer
      const base64Data = data.fileData.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      // Générer clé unique
      const key = generateImageKey(data.fileName)

      // Upload vers R2
      const url = await uploadToR2(buffer, key, data.fileType)

      return {
        url,
        key,
      }
    } catch (error) {
      console.error('Erreur upload image:', error)
      throw new Error(
        error instanceof Error ? error.message : "Échec de l'upload",
      )
    }
  })

/**
 * Supprime une image de Cloudflare R2
 */
export const deleteImage = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      key: z.string().min(1, 'Clé requise'),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const success = await deleteFromR2(data.key)

      if (!success) {
        throw new Error('Échec de la suppression')
      }

      return { success: true }
    } catch (error) {
      console.error('Erreur suppression image:', error)
      throw new Error(
        error instanceof Error ? error.message : 'Échec de la suppression',
      )
    }
  })
