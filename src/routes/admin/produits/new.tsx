import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/produits/new')({
  component: NewProductPage,
})

function NewProductPage() {
  return <div>New Product - TODO</div>
}
