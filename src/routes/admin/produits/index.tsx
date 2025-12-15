import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { AdminPageHeader } from '@/components/layout/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { ProductFiltersAdmin } from '@/features/products/components/ProductFiltersAdmin'
import { ProductTable } from '@/features/products/components/ProductTable'
import { useProductFilters } from '@/features/products/hooks/useProductFilters'
import { useProductsPaginated } from '@/features/products/hooks/useProducts'

export const Route = createFileRoute('/admin/produits/')({
  component: ProductsListPage,
})

function ProductsListPage() {
  const { clearFilters, filters, page, query, setFilters, setPage } =
    useProductFilters()
  const { data, isLoading } = useProductsPaginated(query)

  return (
    <div className="space-y-6">
      <AdminPageHeader
        action={
          <Button asChild>
            <Link to="/admin/produits/nouveau">
              <Plus className="size-4" />
              Nouveau produit
            </Link>
          </Button>
        }
        description="Gérez les produits de votre catalogue"
        title="Produits"
      />

      <ProductFiltersAdmin
        filters={filters}
        onFiltersChange={setFilters}
        onReset={clearFilters}
      />

      <ProductTable
        isLoading={isLoading}
        onPageChange={setPage}
        page={page}
        products={data?.items}
        total={data?.total}
        totalPages={data?.totalPages}
      />
    </div>
  )
}
