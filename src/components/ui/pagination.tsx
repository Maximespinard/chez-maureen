import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  className?: string
  onPageChange: (page: number) => void
  page: number
  totalPages: number
}

export function Pagination({
  className,
  onPageChange,
  page,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const canGoPrevious = page > 1
  const canGoNext = page < totalPages

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: Array<number | 'ellipsis'> = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      if (page > 3) pages.push('ellipsis')

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) pages.push(i)

      if (page < totalPages - 2) pages.push('ellipsis')

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)}>
      <Button
        disabled={!canGoPrevious}
        onClick={() => onPageChange(page - 1)}
        size="sm"
        variant="outline"
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Page précédente</span>
      </Button>

      {getPageNumbers().map((pageNum, idx) =>
        pageNum === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Button
            key={pageNum}
            className="min-w-9"
            onClick={() => onPageChange(pageNum)}
            size="sm"
            variant={pageNum === page ? 'default' : 'outline'}
          >
            {pageNum}
          </Button>
        ),
      )}

      <Button
        disabled={!canGoNext}
        onClick={() => onPageChange(page + 1)}
        size="sm"
        variant="outline"
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">Page suivante</span>
      </Button>
    </nav>
  )
}
