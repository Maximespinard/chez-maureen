import { useMemo } from 'react'
import type { FilterCategory } from './ProductFilters'
import { ProductCard } from '@/features/home/components/ProductCard'

interface Product {
  name: string
  image: string
  origin: string
  price: string
  unit?: string
  badges?: Array<{
    type: 'new' | 'promo' | 'local' | 'season' | 'bio'
    label: string
  }>
  category: FilterCategory
}

const MOCK_PRODUCTS: Array<Product> = [
  {
    name: 'Tomates anciennes',
    image:
      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=600&fit=crop',
    origin: 'Variétés locales',
    price: '4.50',
    unit: '/kg',
    badges: [{ type: 'new', label: 'Nouveau' }],
    category: 'légumes',
  },
  {
    name: 'Pommes Golden du verger',
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop',
    origin: 'Région locale',
    price: '3.90',
    unit: '/kg',
    badges: [
      { type: 'promo', label: '-20%' },
      { type: 'local', label: 'Local' },
    ],
    category: 'fruits',
  },
  {
    name: 'Courgettes fraîches',
    image:
      'https://images.unsplash.com/photo-1623219300923-11f15f6d7747?w=800&h=600&fit=crop',
    origin: 'Cultivées localement',
    price: '3.20',
    unit: '/kg',
    badges: [{ type: 'season', label: 'De saison' }],
    category: 'légumes',
  },
  {
    name: 'Carottes bio',
    image:
      'https://images.unsplash.com/photo-1572449831106-34dfb4bd5c20?w=800&h=600&fit=crop',
    origin: 'Suisse',
    price: '2.80',
    unit: '/kg',
    badges: [
      { type: 'bio', label: 'Bio' },
      { type: 'local', label: 'Local' },
    ],
    category: 'légumes',
  },
  {
    name: 'Bananes',
    image:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop',
    origin: 'Équateur',
    price: '3.50',
    unit: '/kg',
    badges: [{ type: 'bio', label: 'Bio' }],
    category: 'fruits',
  },
  {
    name: 'Salade verte',
    image:
      'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&h=600&fit=crop',
    origin: 'Suisse',
    price: '2.50',
    unit: '/pièce',
    badges: [
      { type: 'season', label: 'De saison' },
      { type: 'local', label: 'Local' },
    ],
    category: 'légumes',
  },
  {
    name: 'Fraises',
    image:
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&h=600&fit=crop',
    origin: 'Suisse',
    price: '8.90',
    unit: '/barquette',
    badges: [{ type: 'season', label: 'De saison' }],
    category: 'fruits',
  },
  {
    name: 'Aubergines',
    image:
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop',
    origin: 'Italie',
    price: '4.20',
    unit: '/kg',
    badges: [{ type: 'local', label: 'Local' }],
    category: 'légumes',
  },
  {
    name: 'Oranges',
    image:
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&h=600&fit=crop',
    origin: 'Espagne',
    price: '3.80',
    unit: '/kg',
    category: 'fruits',
  },
  {
    name: 'Champignons de Paris',
    image:
      'https://images.unsplash.com/photo-1599818297538-0e9b21c5b468?w=800&h=600&fit=crop',
    origin: 'Suisse',
    price: '6.50',
    unit: '/250g',
    badges: [{ type: 'local', label: 'Local' }],
    category: 'autres',
  },
  {
    name: 'Kiwis',
    image:
      'https://images.unsplash.com/photo-1519897831810-a9a01aceccd1?w=800&h=600&fit=crop',
    origin: 'Nouvelle-Zélande',
    price: '5.20',
    unit: '/kg',
    category: 'fruits',
  },
  {
    name: 'Concombres',
    image:
      'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&h=600&fit=crop',
    origin: 'Suisse',
    price: '2.90',
    unit: '/pièce',
    badges: [{ type: 'season', label: 'De saison' }],
    category: 'légumes',
  },
  {
    name: 'Poivrons',
    image:
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=600&fit=crop',
    origin: 'Italie',
    price: '4.80',
    unit: '/kg',
    category: 'légumes',
  },
  {
    name: 'Raisin',
    image:
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=600&fit=crop',
    origin: 'Italie',
    price: '7.50',
    unit: '/kg',
    badges: [{ type: 'season', label: 'De saison' }],
    category: 'fruits',
  },
  {
    name: 'Basilic frais',
    image:
      'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=800&h=600&fit=crop',
    origin: 'Suisse',
    price: '3.50',
    unit: '/pot',
    badges: [
      { type: 'bio', label: 'Bio' },
      { type: 'local', label: 'Local' },
    ],
    category: 'aromates',
  },
]

interface ProductGridProps {
  searchQuery: string
  filterCategory: FilterCategory
}

export function ProductGrid({ searchQuery, filterCategory }: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Filter by category
      const matchesCategory =
        filterCategory === 'all' || product.category === filterCategory

      // Filter by search query
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, filterCategory])

  if (filteredProducts.length === 0) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
          <p className="text-text-body text-lg">
            Aucun produit ne correspond à votre recherche.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="from-primeur-warm-white to-primeur-cream bg-linear-to-b py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="animate-[fadeInUp_0.6s_ease-out_backwards]"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
