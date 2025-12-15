import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { CategoryForm } from '@/features/categories/components/CategoryForm'

export const Route = createFileRoute('/admin/categories/nouveau')({
  component: NewCategoryPage,
})

function NewCategoryPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          Nouvelle catégorie
        </h1>
        <p className="text-text-body text-sm">
          Créez une nouvelle catégorie de produits
        </p>
      </div>

      <div className="border-border-subtle rounded-2xl border bg-white p-6">
        <CategoryForm onSuccess={() => navigate({ to: '/admin/categories' })} />
      </div>
    </div>
  )
}
