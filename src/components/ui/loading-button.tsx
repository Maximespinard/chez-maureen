import { Loader2 } from 'lucide-react'
import { forwardRef } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ children, loading, disabled, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn('relative', className)}
        {...props}
      >
        {loading && (
          <Loader2 className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-spin" />
        )}
        <span className={cn(loading && 'invisible')}>{children}</span>
      </Button>
    )
  },
)

LoadingButton.displayName = 'LoadingButton'
