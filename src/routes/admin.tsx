import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AdminBottomNav } from '@/components/layout/AdminBottomNav'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { PageTransition } from '@/components/transitions/page-transition'
import { authClient } from '@/lib/auth-client'
import { authMiddleware } from '@/lib/auth.middleware'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
  server: {
    middleware: [authMiddleware],
  },
})

function AdminLayout() {
  const { data: session } = authClient.useSession()

  // Show loader if no session
  if (!session) {
    return <PageTransition isReady={false}>{null}</PageTransition>
  }

  return (
    <PageTransition isReady={!!session}>
      <div className="bg-surface-warm flex h-screen">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />

          {/* Content Area with bottom padding on mobile for bottom nav */}
          <main className="flex-1 overflow-auto p-6 pb-24 lg:pb-6">
            <Outlet />
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <AdminBottomNav />
      </div>
    </PageTransition>
  )
}
