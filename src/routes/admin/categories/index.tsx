import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { AdminPageHeader } from '@/components/layout/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { CategoryTable } from '@/features/categories/components/CategoryTable'

export const Route = createFileRoute('/admin/categories/')({
  component: CategoriesListPage,
})

function CategoriesListPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Catégories"
        description="Gérez les catégories de produits"
        action={
          <Button asChild>
            <Link to="/admin/categories/nouveau">
              <Plus className="size-4" />
              Nouvelle catégorie
            </Link>
          </Button>
        }
      />

      <CategoryTable />
    </div>
  )
}
