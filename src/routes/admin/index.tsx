import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: DashboardPage,
})

function DashboardPage() {
  return <div>Admin Dashboard - TODO</div>
}
