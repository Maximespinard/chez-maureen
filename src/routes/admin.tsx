import { Outlet, createFileRoute } from '@tanstack/react-router'
import { authMiddleware } from '@/lib/auth.middleware'
import { authClient } from '@/lib/auth-client'
import { PageTransition } from '@/components/transitions/page-transition'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
  server: {
    middleware: [authMiddleware],
  },
})

function AdminLayout() {
  // Fetch session using authClient hook
  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut()
    window.location.href = '/connexion'
  }

  // Afficher le loader si pas de session
  if (!session) {
    return <PageTransition isReady={false}>{null}</PageTransition>
  }

  return (
    <PageTransition isReady={!!session}>
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
    </PageTransition>
  )
}
