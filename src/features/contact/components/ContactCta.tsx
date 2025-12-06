import { Leaf } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function ContactCta() {
  return (
    <section className="from-primeur-warm-white to-primeur-cream relative overflow-hidden bg-linear-to-b py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -top-20 left-10 z-0 h-[250px] w-[250px] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] bg-[radial-gradient(circle_at_30%_60%,var(--primeur-green),transparent_70%)] opacity-[0.06] blur-2xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 z-0 h-[300px] w-[300px] rounded-[30%_70%_40%_60%/60%_30%_70%_40%] bg-[radial-gradient(circle_at_70%_40%,var(--primeur-terracotta),transparent_70%)] opacity-[0.06] blur-2xl" />

      <div className="relative z-1 mx-auto max-w-4xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-[oklch(92%_0.01_72)] bg-white p-10 text-center shadow-lg md:p-12">
          {/* Icon */}
          <div className="from-primeur-green flex size-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br to-[oklch(62%_0.08_152)] text-white shadow-lg">
            <Leaf className="size-8 stroke-[1.5]" />
          </div>

          {/* Title */}
          <h2 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-3xl font-bold tracking-tight md:text-4xl">
            Nous sommes impatients de vous accueillir au magasin !
          </h2>

          {/* Text */}
          <p className="text-text-body max-w-2xl text-base leading-relaxed md:text-lg">
            Venez découvrir nos produits frais et profitez de conseils
            personnalisés de notre équipe passionnée.
          </p>

          {/* Button */}
          <Link
            to="/produits"
            className="border-primeur-green text-primeur-green hover:bg-primeur-green mt-2 inline-flex items-center gap-2 rounded-xl border-2 bg-white px-6 py-3 font-semibold no-underline shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-md"
          >
            Voir nos produits
          </Link>
        </div>
      </div>
    </section>
  )
}
