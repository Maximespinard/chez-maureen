import { CheckCircle, Leaf, ShoppingBasket } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="from-primeur-warm-white relative overflow-hidden bg-linear-to-b to-[oklch(99.5%_0.005_42)] py-24">
      {/* Texture grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative z-[1] grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&h=560&fit=crop&q=85"
              alt="Fruits et légumes frais sélectionnés"
              loading="lazy"
              className="block max-h-[480px] w-full rounded-2xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:contrast-[0.95] hover:saturate-[0.92] hover:sepia-[0.1]"
              style={{ filter: 'saturate(0.88) sepia(0.08) contrast(0.9)' }}
            />
            <div className="absolute -top-5 -right-5 -z-10 h-full w-full rounded-2xl border-2 border-[oklch(55%_0.09_152/0.4)] transition-colors duration-300" />
          </div>

          {/* Content Column */}
          <div className="flex max-w-2xl flex-col">
            <span className="bg-primeur-green-pale text-primeur-green mb-3 inline-block w-fit rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase">
              Notre engagement
            </span>
            <h2 className="text-text-dark mb-4 font-[Crimson_Pro,Georgia,serif] text-4xl font-bold md:text-5xl">
              Chez Maureen
            </h2>
            <p className="mb-6 text-lg font-normal tracking-[-0.01em] text-[oklch(58%_0.015_42)] italic">
              Des fruits et légumes authentiques et de saison
            </p>

            <p className="mb-4 text-base leading-[1.75] font-normal text-[oklch(56%_0.018_42)]">
              Chez Maureen, nous nous engageons à proposer des fruits et légumes
              frais, savoureux et de saison, sélectionnés avec soin chaque jour.
            </p>

            <p className="mb-4 text-base leading-[1.75] font-normal text-[oklch(56%_0.018_42)]">
              Nous privilégions les producteurs locaux dès que possible, afin de
              soutenir l'agriculture de notre région et garantir une qualité
              authentique.
            </p>

            <p className="mb-4 text-base leading-[1.75] font-normal text-[oklch(56%_0.018_42)]">
              Parce que consommer local, c'est soutenir nos agriculteurs et
              savourer des produits exceptionnels qui ont du goût.
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="text-primeur-green mb-0 flex h-7 w-7 items-center justify-center">
                  <Leaf className="h-5 w-5 stroke-[1.8]" />
                </div>
                <div className="text-primeur-green font-[Crimson_Pro,Georgia,serif] text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] leading-none font-bold tracking-[-0.02em]">
                  20+
                </div>
                <div className="text-sm leading-[1.4] font-normal text-[oklch(56%_0.015_42)]">
                  Ans d'expérience
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="text-primeur-green mb-0 flex h-7 w-7 items-center justify-center">
                  <ShoppingBasket className="h-5 w-5 stroke-[1.8]" />
                </div>
                <div className="text-primeur-green font-[Crimson_Pro,Georgia,serif] text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] leading-none font-bold tracking-[-0.02em]">
                  30+
                </div>
                <div className="text-sm leading-[1.4] font-normal text-[oklch(56%_0.015_42)]">
                  Producteurs locaux
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="text-primeur-green mb-0 flex h-7 w-7 items-center justify-center">
                  <CheckCircle className="h-5 w-5 stroke-[1.8]" />
                </div>
                <div className="text-primeur-green font-[Crimson_Pro,Georgia,serif] text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] leading-none font-bold tracking-[-0.02em]">
                  100%
                </div>
                <div className="text-sm leading-[1.4] font-normal text-[oklch(56%_0.015_42)]">
                  Fraîcheur garantie
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
