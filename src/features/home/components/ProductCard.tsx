import { MapPin } from 'lucide-react'

type Badge = 'new' | 'promo' | 'local' | 'season' | 'bio'

interface ProductCardProps {
  name: string
  image: string
  origin: string
  price: string
  unit?: string
  badges?: Array<{ type: Badge; label: string }>
}

const badgeStyles: Record<Badge, string> = {
  new: 'bg-badge-new',
  promo: 'bg-badge-promo animate-[pulseScale_2s_ease-in-out_infinite]',
  local: 'bg-badge-local',
  season: 'bg-badge-season',
  bio: 'bg-badge-bio',
}

export function ProductCard({
  name,
  image,
  origin,
  price,
  unit = '/kg',
  badges = [],
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-[400ms] hover:translate-y-[-12px] hover:scale-[1.02] hover:rotate-[0.5deg] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)]">
      {/* Image Wrapper */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08] group-hover:rotate-[1deg]"
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`inline-block rounded-xl px-4 py-2 text-xs font-bold tracking-wide text-white uppercase shadow-md backdrop-blur-sm transition-transform duration-150 ${badgeStyles[badge.type]}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-text-dark mb-2 font-[Crimson_Pro,Georgia,serif] text-xl font-bold">
          {name}
        </h3>

        <p className="text-text-light mb-4 flex items-center gap-1 text-sm">
          <MapPin className="h-[14px] w-[14px]" />
          {origin}
        </p>

        <div className="flex min-h-[40px] items-baseline justify-between">
          <span className="text-primeur-green hover:text-primeur-green-hover font-[Crimson_Pro,Georgia,serif] text-2xl font-bold transition-all duration-200 hover:scale-[1.04]">
            {price} CHF
            <span className="text-text-medium text-base font-normal">
              {unit}
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}
