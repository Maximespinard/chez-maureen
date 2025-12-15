import { Link } from '@tanstack/react-router'
import {
  FolderTree,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  Tag,
} from 'lucide-react'

import { useUnreadMessagesCount } from '@/features/contact/hooks/useUnreadCount'

export function AdminBottomNav() {
  const { data: unreadCount } = useUnreadMessagesCount()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Produits',
      href: '/admin/produits',
      icon: Package,
    },
    {
      name: 'Catégories',
      href: '/admin/categories',
      icon: FolderTree,
    },
    {
      name: 'Badges',
      href: '/admin/badges',
      icon: Tag,
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: Mail,
      badge: unreadCount || 0,
    },
    {
      name: 'Paramètres',
      href: '/admin/parametres',
      icon: Settings,
    },
  ]
  return (
    <nav className="border-border-subtle fixed inset-x-0 bottom-0 z-50 border-t bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon
          const isDashboard = item.href === '/admin'

          return (
            <Link
              key={item.name}
              to={item.href}
              className="group relative flex flex-1 items-center justify-center py-3 transition-colors"
              activeProps={{
                className: 'text-black',
              }}
              inactiveProps={{
                className: 'text-text-light hover:text-text-body',
              }}
              activeOptions={isDashboard ? { exact: true } : undefined}
              aria-label={item.name}
            >
              <div className="relative">
                <Icon className="size-6 shrink-0" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
