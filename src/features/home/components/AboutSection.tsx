import { CheckCircle, Leaf, ShoppingBasket } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-primeur-warm-white to-[oklch(99.5%_0.005_42)] relative overflow-hidden">
      {/* Texture grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start relative z-[1]">
          {/* Image Column */}
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&h=560&fit=crop&q=85"
              alt="Fruits et légumes frais sélectionnés"
              loading="lazy"
              className="w-full max-h-[480px] rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] object-cover block transition-all duration-300 hover:saturate-[0.92] hover:sepia-[0.1] hover:contrast-[0.95]"
              style={{ filter: 'saturate(0.88) sepia(0.08) contrast(0.9)' }}
            />
            <div className="absolute -top-5 -right-5 w-full h-full border-2 border-[oklch(55%_0.09_152/0.4)] rounded-[20px] -z-10 transition-colors duration-300" />
          </div>

          {/* Content Column */}
          <div className="max-w-[540px] flex flex-col">
            <span className="inline-block px-4 py-2 bg-primeur-green-pale text-primeur-green text-sm font-semibold rounded-full mb-3 uppercase tracking-wide w-fit">
              Notre engagement
            </span>
            <h2 className="text-4xl md:text-5xl mb-4 text-text-dark font-[Crimson_Pro,Georgia,serif] font-bold">
              Chez Maureen
            </h2>
            <p className="text-lg italic font-normal text-[oklch(58%_0.015_42)] mb-6 -tracking-[0.01em]">
              Des fruits et légumes authentiques et de saison
            </p>

            <p className="text-base leading-[1.75] text-[oklch(56%_0.018_42)] mb-4 font-normal">
              Chez Maureen, nous nous engageons à proposer des fruits et légumes frais,
              savoureux et de saison, sélectionnés avec soin chaque jour.
            </p>

            <p className="text-base leading-[1.75] text-[oklch(56%_0.018_42)] mb-4 font-normal">
              Nous privilégions les producteurs locaux dès que possible, afin de soutenir
              l'agriculture de notre région et garantir une qualité authentique.
            </p>

            <p className="text-base leading-[1.75] text-[oklch(56%_0.018_42)] mb-4 font-normal">
              Parce que consommer local, c'est soutenir nos agriculteurs et savourer des
              produits exceptionnels qui ont du goût.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-6 pt-4">
              <div className="text-center flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 text-primeur-green mb-0">
                  <Leaf className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] font-bold text-primeur-green leading-none -tracking-[0.02em] font-[Crimson_Pro,Georgia,serif]">
                  20+
                </div>
                <div className="text-sm text-[oklch(56%_0.015_42)] font-normal leading-[1.4]">
                  Ans d'expérience
                </div>
              </div>

              <div className="text-center flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 text-primeur-green mb-0">
                  <ShoppingBasket className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] font-bold text-primeur-green leading-none -tracking-[0.02em] font-[Crimson_Pro,Georgia,serif]">
                  30+
                </div>
                <div className="text-sm text-[oklch(56%_0.015_42)] font-normal leading-[1.4]">
                  Producteurs locaux
                </div>
              </div>

              <div className="text-center flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 text-primeur-green mb-0">
                  <CheckCircle className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] font-bold text-primeur-green leading-none -tracking-[0.02em] font-[Crimson_Pro,Georgia,serif]">
                  100%
                </div>
                <div className="text-sm text-[oklch(56%_0.015_42)] font-normal leading-[1.4]">
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
