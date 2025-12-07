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

import type { CategoryWithCount } from '@/types/category'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteCategoryDialog } from '@/features/categories/components/DeleteCategoryDialog'
import { SortableRow } from '@/features/categories/components/SortableRow'
import {
  useCategories,
  useCategoryMutations,
} from '@/features/categories/hooks/useCategories'

export function CategoryTable() {
  const navigate = useNavigate()
  const { data: categories, isLoading } = useCategories()
  const { reorder, remove } = useCategoryMutations()
  const [deleteCategory, setDeleteCategory] =
    useState<CategoryWithCount | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id || !categories) return

    const oldIndex = categories.findIndex((c) => c.id === active.id)
    const newIndex = categories.findIndex((c) => c.id === over.id)
    const reordered = arrayMove(categories, oldIndex, newIndex)

    reorder.mutate({
      categories: reordered.map((c, index) => ({ id: c.id, order: index })),
    })
  }

  const handleDelete = async () => {
    if (deleteCategory) {
      await remove.mutateAsync(deleteCategory.id)
      setDeleteCategory(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body text-sm">Chargement...</div>
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="border-border-subtle rounded-xl border bg-white p-12 text-center">
        <p className="text-text-body text-sm">
          Aucune catégorie pour le moment.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="border-border-subtle rounded-xl border bg-white">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead className="w-12">Icône</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-24 text-center">Produits</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {categories.map((category) => (
                  <SortableRow
                    key={category.id}
                    category={category}
                    onEdit={(id) =>
                      navigate({
                        to: `/admin/categories/$id/edit`,
                        params: { id },
                      })
                    }
                    onDelete={setDeleteCategory}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <DeleteCategoryDialog
        category={deleteCategory}
        open={!!deleteCategory}
        onOpenChange={(open) => !open && setDeleteCategory(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
