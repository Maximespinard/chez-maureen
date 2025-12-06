import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/produits')({
  component: ProductsPage,
})

function ProductsPage() {
  return <div>Products Page - TODO</div>
}
