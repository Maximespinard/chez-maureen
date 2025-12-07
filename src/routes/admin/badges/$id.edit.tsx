import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { BadgeForm } from '@/features/badges/components/BadgeForm'
import { useBadge } from '@/features/badges/hooks/useBadges'

export const Route = createFileRoute('/admin/badges/$id/edit')({
  component: EditBadgePage,
})

function EditBadgePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { data: badge, isLoading } = useBadge(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body text-sm">Chargement...</div>
      </div>
    )
  }

  if (!badge) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="border-border-subtle rounded-2xl border bg-white p-12 text-center">
          <p className="text-text-body text-sm">Badge introuvable.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          Modifier {badge.name}
        </h1>
        <p className="text-text-body text-sm">
          Modifiez les informations du badge
        </p>
      </div>

      <div className="border-border-subtle rounded-2xl border bg-white p-6">
        <BadgeForm
          badge={{
            color: badge.color,
            id: badge.id,
            name: badge.name,
            order: badge.order,
            slug: badge.slug,
          }}
          onSuccess={() => navigate({ to: '/admin/badges' })}
        />
      </div>
    </div>
  )
}
