import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import type { DragEndEvent } from '@dnd-kit/core'
import type { BadgeWithCount } from '@/types/badge'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteBadgeDialog } from '@/features/badges/components/DeleteBadgeDialog'
import { SortableRow } from '@/features/badges/components/SortableRow'
import { useBadgeMutations, useBadges } from '@/features/badges/hooks/useBadges'

export function BadgeTable() {
  const navigate = useNavigate()
  const { data: badges, isLoading } = useBadges()
  const { reorder, remove } = useBadgeMutations()
  const [deleteBadge, setDeleteBadge] = useState<BadgeWithCount | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id || !badges) return

    const oldIndex = badges.findIndex((b) => b.id === active.id)
    const newIndex = badges.findIndex((b) => b.id === over.id)
    const reordered = arrayMove(badges, oldIndex, newIndex)

    reorder.mutate({
      badges: reordered.map((b, index) => ({ id: b.id, order: index })),
    })
  }

  const handleDelete = async () => {
    if (deleteBadge) {
      await remove.mutateAsync(deleteBadge.id)
      setDeleteBadge(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body text-sm">Chargement...</div>
      </div>
    )
  }

  if (!badges || badges.length === 0) {
    return (
      <div className="border-border-subtle rounded-xl border bg-white p-12 text-center">
        <p className="text-text-body text-sm">Aucun badge pour le moment.</p>
      </div>
    )
  }

  return (
    <>
      <div className="border-border-subtle rounded-xl border bg-white">
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-32">Couleur</TableHead>
                <TableHead className="w-24 text-center">Produits</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={badges.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                {badges.map((badge) => (
                  <SortableRow
                    key={badge.id}
                    badge={badge}
                    onDelete={setDeleteBadge}
                    onEdit={(id) =>
                      navigate({
                        params: { id },
                        to: `/admin/badges/$id/edit`,
                      })
                    }
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <DeleteBadgeDialog
        badge={deleteBadge}
        open={!!deleteBadge}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteBadge(null)}
      />
    </>
  )
}
