import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    // TODO: Check auth with Better Auth
    // const user = await getCurrentUser()
    // if (!user) throw redirect({ to: '/auth/login' })
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div>
      {/* TODO: Add AdminSidebar */}
      {/* TODO: Add AdminHeader */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
