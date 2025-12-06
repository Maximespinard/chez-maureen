import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/promotions/$id/edit')({
  component: EditPromotionPage,
})

function EditPromotionPage() {
  const { id } = Route.useParams()
  return <div>Edit Promotion {id} - TODO</div>
}
