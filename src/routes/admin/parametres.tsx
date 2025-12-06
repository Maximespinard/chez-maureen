import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/parametres')({
  component: SettingsPage,
})

function SettingsPage() {
  return <div>Admin Settings - TODO</div>
}
