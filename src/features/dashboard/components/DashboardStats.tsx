import { FolderTree, Mail, Package, Tag } from 'lucide-react'

import { cn } from '@/lib/utils'

interface DashboardStatsProps {
  stats: {
    productsCount: number
    categoriesCount: number
    badgesCount: number
    unreadMessagesCount: number
  }
}

const statItems = [
  {
    label: 'Produits',
    key: 'productsCount' as const,
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Catégories',
    key: 'categoriesCount' as const,
    icon: FolderTree,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'Badges',
    key: 'badgesCount' as const,
    icon: Tag,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Messages non lus',
    key: 'unreadMessagesCount' as const,
    icon: Mail,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon
        const value = stats[item.key]

        return (
          <div
            key={item.key}
            className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-light text-sm font-medium">
                  {item.label}
                </p>
                <p className="text-text-dark mt-2 text-3xl font-bold">
                  {value}
                </p>
              </div>
              <div className={cn('rounded-lg p-3', item.bgColor)}>
                <Icon className={cn('size-6', item.color)} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
