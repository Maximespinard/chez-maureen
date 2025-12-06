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
    <div className="bg-gradient-to-b from-[oklch(96%_0.015_152/0.5)] to-primeur-warm-white py-20 relative">
      {/* Texture grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <section className="p-0 bg-transparent">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-primeur-green-pale text-primeur-green text-sm font-semibold rounded-full mb-3 uppercase tracking-wide">
              Nouveautés
            </span>
            <h2 className="text-4xl md:text-5xl mb-4 text-text-dark font-[Crimson_Pro,Georgia,serif] font-bold">
              Produits vedettes
            </h2>
            <p className="text-lg text-[oklch(38%_0.03_42)] font-medium max-w-[600px] mx-auto">
              Découvrez nos coups de cœur du moment
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.name}
                className="animate-[fadeInUp_0.6s_ease-out_backwards] group"
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
