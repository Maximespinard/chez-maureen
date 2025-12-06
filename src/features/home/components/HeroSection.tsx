import { Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#2c2c2c] to-[#1a1a1a] bg-cover bg-fixed bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
    >
      {/* Overlay */}
      <div className="backdrop-blur-0 absolute inset-0 z-1 bg-linear-to-b from-[rgba(28,28,28,0.45)] via-[rgba(28,28,28,0.55)] to-[rgba(28,28,28,0.65)]" />

      {/* Container */}
      <div className="relative z-2 mx-auto flex w-full max-w-[900px] flex-col items-center justify-center gap-16">
        {/* Content */}
        <div className="mt-10 flex flex-col items-center gap-10 text-center">
          {/* Micro Label */}
          <div className="mt-2 mb-6 flex animate-[slideInDown_0.6s_ease-out] items-center justify-center gap-2 text-[13px] font-semibold tracking-wide text-white/85 uppercase">
            <span className="inline-block text-base">🌱</span>
            <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Fraîcheur garantie · Producteurs locaux
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="m-0 mb-4 animate-[slideInUp_0.7s_ease-out_0.1s_both] font-[Crimson_Pro,Georgia,serif] text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.1] font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Chez Maureen fruits <br /> et légumes
            </h1>
          </div>

          {/* Subtitle */}
          <p className="m-0 max-w-[600px] animate-[slideInUp_0.7s_ease-out_0.2s_both] text-lg leading-[1.7] font-normal text-white/92 drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
            Du champ à vos paniers, soutenez le local, consommez l'exceptionnel
          </p>

          {/* CTA Button */}
          <Link
            to="/produits"
            className="from-primeur-green hover:from-primeur-green-hover relative mt-4 inline-block min-w-[180px] animate-[slideInUp_0.7s_ease-out_0.3s_both] cursor-pointer overflow-hidden rounded-xl border border-none border-[oklch(70%_0.06_152/0.5)] bg-linear-to-br to-[oklch(60%_0.09_152)] px-10 py-4 text-center text-base font-semibold text-white no-underline shadow-[0_12px_24px_rgba(69,127,92,0.3),0_4px_12px_rgba(69,127,92,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-linear-to-br hover:to-[oklch(58%_0.095_152)] hover:shadow-[0_20px_40px_rgba(69,127,92,0.4),0_0_40px_rgba(88,153,115,0.3),0_4px_16px_rgba(69,127,92,0.25)]"
          >
            Voir nos produits
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-3 flex -translate-x-1/2 animate-[bounceDown_2.5s_cubic-bezier(0.68,-0.55,0.265,1.55)_infinite] items-center justify-center text-white">
        <ChevronDown className="h-7 w-7 stroke-[2.5] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
      </div>
    </section>
  )
}
