import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center gap-1 rounded-md border font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'px-2 py-0.5 text-xs',
        lg: 'px-2.5 py-1 text-sm',
        sm: 'px-1.5 py-0.5 text-[10px]',
      },
      variant: {
        default: 'bg-primeur-green/10 text-primeur-green border-transparent',
        destructive: 'bg-error-light text-error-dark border-transparent',
        outline: 'border-current text-current',
        secondary: 'bg-surface-muted text-text-dark border-transparent',
        success: 'bg-success-light text-success-dark border-transparent',
        warning: 'bg-warning-light text-warning-dark border-transparent',
      },
    },
  },
)

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ size, variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
