import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getServerSession } from '@/lib/auth.server'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const session = await getServerSession()

    if (!session) {
      throw redirect({ to: '/auth/connexion' })
    }

    return { session }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const { session } = Route.useRouteContext()

  const handleLogout = async () => {
    const { signOut } = await import('@/lib/auth-client')
    await signOut()
    window.location.href = '/auth/connexion'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Administration - Chez Maureen</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session.user.name || session.user.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
