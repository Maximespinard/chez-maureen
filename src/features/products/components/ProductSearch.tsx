import { Search } from 'lucide-react'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <section className="from-primeur-warm-white to-primeur-cream bg-linear-to-b py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative mx-auto max-w-2xl">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Rechercher un produit..."
            className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white py-3.5 pr-12 pl-4 text-sm shadow-sm transition-all duration-200 focus:ring-4 focus:outline-none"
          />
          <div className="text-text-light pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
            <Search className="size-5 stroke-[1.5]" />
          </div>
        </div>
      </div>
    </section>
  )
}
