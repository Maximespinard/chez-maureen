import { createFileRoute } from '@tanstack/react-router'

import { SettingsForm } from '@/features/settings/components/SettingsForm'

export const Route = createFileRoute('/admin/parametres')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres du commerce</h1>
        <p className="text-text-body">
          Configurez les informations affichées sur votre site vitrine.
        </p>
      </div>
      <SettingsForm />
    </div>
  )
}
