import { Apple, Carrot, Leaf, ShoppingBasket, Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'

type FilterCategory = 'all' | 'fruits' | 'légumes' | 'aromates' | 'autres'

interface ProductFiltersProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
}

const filters = [
  { id: 'all' as const, label: 'Tous', icon: Leaf },
  { id: 'fruits' as const, label: 'Fruits', icon: Apple },
  { id: 'légumes' as const, label: 'Légumes', icon: Carrot },
  { id: 'aromates' as const, label: 'Aromates', icon: Sprout },
  { id: 'autres' as const, label: 'Autres produits', icon: ShoppingBasket },
]

export function ProductFilters({
  activeFilter,
  onFilterChange,
}: ProductFiltersProps) {
  return (
    <section className="from-primeur-warm-white to-primeur-cream bg-linear-to-b py-6">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id

            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                  isActive
                    ? 'border-primeur-green bg-primeur-green text-white shadow-md hover:shadow-lg'
                    : 'border-border-subtle text-text-body hover:border-primeur-green/50 bg-white hover:shadow-sm',
                )}
              >
                <Icon className="size-4 stroke-[1.8]" />
                <span>{filter.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export type { FilterCategory }
