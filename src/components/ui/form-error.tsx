import { cn } from '@/lib/utils'

interface FormErrorProps {
  message?: string | null
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null

  return (
    <div
      className={cn(
        'rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600',
        className,
      )}
    >
      {message}
    </div>
  )
}
