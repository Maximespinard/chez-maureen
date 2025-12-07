import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-text-dark text-2xl font-bold">Messages</h1>
        <p className="text-text-body text-sm">
          Consultez les messages envoyés via le formulaire de contact
        </p>
      </div>

      <div className="border-border-subtle rounded-lg border bg-white p-8 text-center">
        <p className="text-text-body">
          Page messages en construction... Vous pourrez consulter et gérer tous
          les messages de contact ici.
        </p>
      </div>
    </div>
  )
}
