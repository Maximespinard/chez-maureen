import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CategoryTable } from '@/features/categories/components/CategoryTable'

export const Route = createFileRoute('/admin/categories/')({
  component: CategoriesListPage,
})

function CategoriesListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
            Catégories
          </h1>
          <p className="text-text-body text-sm">
            Gérez les catégories de produits
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/categories/new">
            <Plus className="size-4" />
            Nouvelle catégorie
          </Link>
        </Button>
      </div>

      <CategoryTable />
    </div>
  )
}
