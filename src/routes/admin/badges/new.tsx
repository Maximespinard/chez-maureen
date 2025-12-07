import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { BadgeForm } from '@/features/badges/components/BadgeForm'

export const Route = createFileRoute('/admin/badges/new')({
  component: NewBadgePage,
})

function NewBadgePage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          Nouveau badge
        </h1>
        <p className="text-text-body text-sm">
          Creez un nouveau badge pour vos produits
        </p>
      </div>

      <div className="border-border-subtle rounded-2xl border bg-white p-6">
        <BadgeForm onSuccess={() => navigate({ to: '/admin/badges' })} />
      </div>
    </div>
  )
}
