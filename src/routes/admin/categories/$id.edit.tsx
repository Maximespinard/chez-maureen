import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories/$id/edit')({
  component: EditCategoryPage,
})

function EditCategoryPage() {
  const { id } = Route.useParams()
  return <div>Edit Category {id} - TODO</div>
}
