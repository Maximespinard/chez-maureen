import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { CategoryForm } from '@/features/categories/components/CategoryForm'
import { useCategory } from '@/features/categories/hooks/useCategories'

export const Route = createFileRoute('/admin/categories/$id/modifier')({
  component: EditCategoryPage,
})

function EditCategoryPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { data: category, isLoading } = useCategory(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body text-sm">Chargement...</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="border-border-subtle rounded-2xl border bg-white p-12 text-center">
          <p className="text-text-body text-sm">Catégorie introuvable.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          Modifier {category.name}
        </h1>
        <p className="text-text-body text-sm">
          Modifiez les informations de la catégorie
        </p>
      </div>

      <div className="border-border-subtle rounded-2xl border bg-white p-6">
        <CategoryForm
          category={{
            id: category.id,
            name: category.name,
            slug: category.slug,
            order: category.order,
          }}
          onSuccess={() => navigate({ to: '/admin/categories' })}
        />
      </div>
    </div>
  )
}
