import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'

import { getImageUploadUrl } from '@/server/functions/images'

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const getUploadUrlFn = useServerFn(getImageUploadUrl)

  const upload = async (file: File): Promise<string | null> => {
    setIsUploading(true)
    setError(null)

    try {
      // 1. Get direct upload URL from server
      const { uploadURL, id } = await getUploadUrlFn()

      // 2. Upload file directly to Cloudflare
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch(uploadURL, {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Upload failed')
      }

      const result = await uploadResponse.json()

      if (!result.success) {
        throw new Error(result.errors?.[0]?.message || 'Failed to upload image')
      }

      // 3. Return the public delivery URL
      // Cloudflare Images URL format: https://imagedelivery.net/{account-hash}/{image-id}/public
      return (
        result.result.variants?.[0] ||
        `https://imagedelivery.net/.../${id}/public`
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setError(message)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return { upload, isUploading, error }
}
