import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'

import type { BadgeWithCount } from '@/types/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

interface SortableRowProps {
  badge: BadgeWithCount
  onDelete: (badge: BadgeWithCount) => void
  onEdit: (id: string) => void
}

export function SortableRow({ badge, onDelete, onEdit }: SortableRowProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: badge.id,
    })

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
        <div className="flex items-center gap-3">
          <div
            className="size-6 shrink-0 rounded-full border shadow-sm"
            style={{ backgroundColor: badge.color }}
          />
          <span className="font-medium">{badge.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-text-body">{badge.slug}</TableCell>
      <TableCell>
        <code className="bg-surface-subtle rounded px-2 py-1 font-mono text-xs">
          {badge.color.toUpperCase()}
        </code>
      </TableCell>
      <TableCell className="text-center">{badge._count.products}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Modifier"
            size="icon-sm"
            variant="ghost"
            onClick={() => onEdit(badge.id)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            aria-label="Supprimer"
            size="icon-sm"
            variant="ghost"
            onClick={() => onDelete(badge)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
