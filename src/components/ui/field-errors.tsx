import { getErrorMessage } from '@/lib/errors'
import { cn } from '@/lib/utils'

interface FieldErrorsProps {
  errors?: Array<unknown>
  className?: string
}

export function FieldErrors({ errors, className }: FieldErrorsProps) {
  if (!errors || errors.length === 0) return null

  return (
    <ul className={cn('mt-1 space-y-0.5', className)}>
      {errors.map((error, index) => (
        <li key={index} className="text-badge-promo text-xs">
          {getErrorMessage(error)}
        </li>
      ))}
    </ul>
  )
}
