import { ProductCard } from './ProductCard'

const featuredProducts = [
  {
    name: 'Tomates anciennes',
    image:
      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=600&fit=crop',
    origin: 'Variétés locales',
    price: '4.50',
    badges: [{ type: 'new' as const, label: 'Nouveau' }],
  },
  {
    name: 'Pommes Golden du verger',
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop',
    origin: 'Région locale',
    price: '3.90',
    badges: [
      { type: 'promo' as const, label: '-20%' },
      { type: 'local' as const, label: 'Local' },
    ],
  },
  {
    name: 'Courgettes fraîches',
    image:
      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=600&fit=crop',
    origin: 'Cultivées localement',
    price: '3.20',
    badges: [{ type: 'season' as const, label: 'De saison' }],
  },
]

export function FeaturedProducts() {
  return (
    <div className="to-primeur-warm-white relative bg-linear-to-b from-[oklch(96%_0.015_152/0.5)] py-20">
      {/* Texture grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <section className="bg-transparent p-0">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <span className="bg-primeur-green-pale text-primeur-green mb-3 inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
              Nouveautés
            </span>
            <h2 className="text-text-dark mb-4 font-[Crimson_Pro,Georgia,serif] text-4xl font-bold md:text-5xl">
              Produits vedettes
            </h2>
            <p className="max-w-600px text-text-muted-dark mx-auto text-lg font-medium">
              Découvrez nos coups de cœur du moment
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <div
                key={product.name}
                className="group animate-[fadeInUp_0.6s_ease-out_backwards]"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
