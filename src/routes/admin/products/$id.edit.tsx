import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/$id/edit')({
  component: EditProductPage,
})

function EditProductPage() {
  const { id } = Route.useParams()
  return <div>Edit Product {id} - TODO</div>
}
