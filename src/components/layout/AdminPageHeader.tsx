import type { ReactNode } from 'react'

interface AdminPageHeaderProps {
  title: string
  description: string
  action?: ReactNode
}

export function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          {title}
        </h1>
        <p className="text-text-body text-sm">{description}</p>
      </div>
      {action && <div className="lg:shrink-0">{action}</div>}
    </div>
  )
}
