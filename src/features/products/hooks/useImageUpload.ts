import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

import { uploadImage } from '@/server/functions/images'

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const uploadImageFn = useServerFn(uploadImage)

  const upload = async (
    file: File,
  ): Promise<{ url: string; key: string } | null> => {
    setIsUploading(true)
    setError(null)

    try {
      // Convertir le fichier en base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Upload vers le serveur qui uploade vers R2
      const result = await uploadImageFn({
        data: {
          fileData: base64,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        },
      })

      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload échoué'
      setError(message)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return { upload, isUploading, error }
}
