import { cn } from '@/lib/utils'

type PriceDisplayProps = {
  originalPrice: number
  discountPercent: number | null
  discountAmount: number | null
  unit: string
  className?: string
}

export function PriceDisplay({
  originalPrice,
  discountPercent,
  discountAmount,
  unit,
  className,
}: PriceDisplayProps) {
  // Calculer le prix effectif
  let effectivePrice = originalPrice

  if (discountPercent !== null && discountPercent > 0) {
    effectivePrice = originalPrice * (1 - discountPercent / 100)
  } else if (discountAmount !== null && discountAmount > 0) {
    effectivePrice = Math.max(0, originalPrice - discountAmount)
  }

  const hasDiscount = effectivePrice < originalPrice

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      {hasDiscount && (
        <span className="text-text-muted text-sm line-through">
          {originalPrice.toFixed(2)}€
        </span>
      )}
      <span
        className={cn(
          'font-semibold',
          hasDiscount ? 'text-green-600' : 'text-text-dark',
        )}
      >
        {effectivePrice.toFixed(2)}€/{unit}
      </span>
      {hasDiscount && (
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          {discountPercent !== null
            ? `-${discountPercent}%`
            : `-${discountAmount}€`}
        </span>
      )}
    </div>
  )
}
