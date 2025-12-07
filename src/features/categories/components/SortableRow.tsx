import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ICON_MAP } from '@/lib/icon-map'
import type { CategoryIcon } from '@/schemas/category.schema'
import type { CategoryWithCount } from '@/types/category'

interface SortableRowProps {
  category: CategoryWithCount
  onDelete: (category: CategoryWithCount) => void
  onEdit: (id: string) => void
}

export function SortableRow({ category, onDelete, onEdit }: SortableRowProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.id,
  })

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const IconComponent = category.icon ? ICON_MAP[category.icon as CategoryIcon] : null

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <button
          {...attributes}
          {...listeners}
          className="text-text-light hover:text-text-body cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </button>
      </TableCell>
      <TableCell>
        {IconComponent && <IconComponent className="text-primeur-green size-5" />}
      </TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell className="text-text-body">{category.slug}</TableCell>
      <TableCell className="text-center">{category._count.products}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(category.id)}
            aria-label="Modifier"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(category)}
            aria-label="Supprimer"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
