import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { ProductForm } from '@/features/products/components/ProductForm'
import { useProduct } from '@/features/products/hooks/useProducts'

export const Route = createFileRoute('/admin/produits/$id/edit')({
  component: EditProductPage,
})

function EditProductPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useProduct(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body text-sm">Chargement...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="border-border-subtle rounded-2xl border bg-white p-12 text-center">
          <p className="text-text-body text-sm">Produit introuvable.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          Modifier {product.name}
        </h1>
        <p className="text-text-body text-sm">
          Modifiez les informations du produit
        </p>
      </div>

      <div className="border-border-subtle rounded-2xl border bg-white p-6">
        <ProductForm
          product={product}
          onSuccess={() => navigate({ to: '/admin/produits' })}
        />
      </div>
    </div>
  )
}
