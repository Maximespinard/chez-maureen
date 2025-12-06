import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div>
      {/* TODO: Add Header */}
      <main>
        <Outlet />
      </main>
      {/* TODO: Add Footer */}
    </div>
  )
}
