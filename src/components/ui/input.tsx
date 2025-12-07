import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
