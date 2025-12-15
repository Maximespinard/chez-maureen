import { Link } from '@tanstack/react-router'
import {
  ChevronLeft,
  ChevronRight,
  FolderTree,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  Tag,
} from 'lucide-react'

import { useUnreadMessagesCount } from '@/features/contact/hooks/useUnreadCount'
import { cn } from '@/lib/utils'
import { useAdminStore } from '@/stores/admin.store'

export function AdminSidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAdminStore()
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
      name: 'Paramètres',
      href: '/admin/parametres',
      icon: Settings,
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: Mail,
      badge: unreadCount || 0,
    },
  ]

  return (
    <aside
      className={cn(
        'border-border-subtle flex h-screen flex-col border-r bg-white transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-56',
      )}
    >
      {/* Logo */}
      <div className="border-border-subtle flex h-16 items-center justify-center border-b px-4">
        {!sidebarCollapsed && (
          <Link to="/" className="text-xl font-bold text-black">
            Chez Maureen
          </Link>
        )}
        {sidebarCollapsed && (
          <Link to="/" className="text-2xl font-bold text-black">
            CM
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isDashboard = item.href === '/admin'
          return (
            <Link
              key={item.name}
              to={item.href}
              className="group text-text-body relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
              activeProps={{
                className:
                  'bg-black/5 text-black border-l-4 border-black hover:bg-black/5',
              }}
              activeOptions={isDashboard ? { exact: true } : undefined}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.name}</span>}
              {!sidebarCollapsed &&
                item.badge !== undefined &&
                item.badge > 0 && (
                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {item.badge}
                  </span>
                )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-border-subtle border-t p-2">
        <button
          onClick={toggleSidebar}
          className="text-text-body flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="size-5" />
          ) : (
            <>
              <ChevronLeft className="size-5" />
              <span>Réduire</span>
            </>
          )}
        </button>
      </div>

      {/* Spacer to push content to top */}
      <div className="flex-1" />
    </aside>
  )
}
