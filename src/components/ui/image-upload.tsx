import { useRef, useState } from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useImageUpload } from '@/features/products/hooks/useImageUpload'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (url: string) => void
  onUploadEnd?: () => void
  onUploadStart?: () => void
  value: string
}

export function ImageUpload({
  value,
  onChange,
  onUploadStart,
  onUploadEnd,
  disabled = false,
}: ImageUploadProps) {
  const { upload, isUploading, error } = useImageUpload()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string>(value)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("L'image ne peut pas dépasser 10 MB")
      return
    }

    // Show local preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudflare
    onUploadStart?.()
    const url = await upload(file)
    onUploadEnd?.()

    if (url) {
      onChange(url)
    } else {
      // Upload failed, clear preview
      setPreview(value)
    }

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    setPreview('')
    onChange('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      {/* Preview or Upload Area */}
      <div className="relative">
        {preview ? (
          /* Image Preview */
          <div className="border-border-subtle relative overflow-hidden rounded-xl border">
            <img
              src={preview}
              alt="Preview"
              className="size-full max-h-64 object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-md transition-transform hover:scale-110"
                title="Supprimer l'image"
              >
                <X className="size-4 text-gray-600" />
              </button>
            )}
          </div>
        ) : (
          /* Upload Button */
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled || isUploading}
            className={cn(
              'border-border-subtle hover:bg-surface-subtle flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors',
              disabled && 'cursor-not-allowed opacity-50',
              isUploading && 'cursor-wait',
            )}
          >
            {isUploading ? (
              <>
                <Loader2 className="text-text-body size-8 animate-spin" />
                <span className="text-text-body text-sm">
                  Téléversement en cours...
                </span>
              </>
            ) : (
              <>
                <ImagePlus className="text-text-body size-8" />
                <span className="text-text-body text-sm">
                  Cliquez pour téléverser une image
                </span>
                <span className="text-text-muted text-xs">
                  PNG, JPG, WebP jusqu'à 10 MB
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Error Message */}
      {error && <div className="text-destructive text-sm">Erreur: {error}</div>}

      {/* Help Text */}
      {!preview && !error && (
        <p className="text-text-muted text-xs">
          L'image sera téléversée sur Cloudflare Images
        </p>
      )}
    </div>
  )
}
