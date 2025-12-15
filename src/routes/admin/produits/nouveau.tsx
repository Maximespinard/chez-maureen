import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { ProductForm } from '@/features/products/components/ProductForm'

export const Route = createFileRoute('/admin/produits/nouveau')({
  component: NewProductPage,
})

function NewProductPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
          Nouveau produit
        </h1>
        <p className="text-text-body text-sm">
          Ajoutez un nouveau produit à votre catalogue
        </p>
      </div>

      <div className="border-border-subtle rounded-2xl border bg-white p-6">
        <ProductForm onSuccess={() => navigate({ to: '/admin/produits' })} />
      </div>
    </div>
  )
}
