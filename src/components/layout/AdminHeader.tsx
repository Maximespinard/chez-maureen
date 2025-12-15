import { LogOut } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

import { authClient } from '@/lib/auth-client'

export function AdminHeader() {
  const { data: session } = authClient.useSession()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut()
    navigate({ to: '/' })
  }

  return (
    <header className="border-border-subtle sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Logo on mobile (since sidebar is hidden) */}
      <div className="text-xl font-bold text-black lg:hidden">Chez Maureen</div>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* User Menu */}
      <div className="flex items-center gap-4">
        {session?.user && (
          <div className="text-sm">
            <span className="text-text-dark font-medium">
              {session.user.name || session.user.email}
            </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="text-text-body flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
          title="Déconnexion"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    </header>
  )
}
