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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon
        const value = stats[item.key]

        return (
          <div
            key={item.key}
            className="border-border-subtle rounded-lg border bg-white p-4 shadow-sm lg:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-light text-xs font-medium lg:text-sm">
                  {item.label}
                </p>
                <p className="text-text-dark mt-1 text-2xl font-bold lg:mt-2 lg:text-3xl">
                  {value}
                </p>
              </div>
              <div className={cn('rounded-lg p-2 lg:p-3', item.bgColor)}>
                <Icon className={cn('size-5 lg:size-6', item.color)} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
