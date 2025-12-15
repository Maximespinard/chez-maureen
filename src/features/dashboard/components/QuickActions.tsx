import { Link } from '@tanstack/react-router'
import { FolderTree, Package, Plus, Tag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const actions = [
  {
    label: 'Nouveau produit',
    href: '/admin/produits/nouveau',
    icon: Package,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Nouvelle catégorie',
    href: '/admin/categories/nouveau',
    icon: FolderTree,
    color: 'bg-green-50 text-green-600',
  },
  {
    label: 'Nouveau badge',
    href: '/admin/badges/nouveau',
    icon: Tag,
    color: 'bg-purple-50 text-purple-600',
  },
]

export function QuickActions() {
  return (
    <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-black/5 p-2">
          <Plus className="size-5 text-black" />
        </div>
        <h2 className="text-text-dark text-lg font-semibold">
          Actions rapides
        </h2>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.href} to={action.href}>
              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 p-4"
              >
                <div className={cn('rounded-lg p-2', action.color)}>
                  <Icon className="size-4" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
