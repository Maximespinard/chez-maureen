import { Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/images/hero-bg.png)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,28,28,0.45)] via-[rgba(28,28,28,0.55)] to-[rgba(28,28,28,0.65)] backdrop-blur-0 z-[1]" />

      {/* Container */}
      <div className="relative z-[2] w-full max-w-[900px] mx-auto flex flex-col items-center justify-center gap-16">
        {/* Content */}
        <div className="text-center flex flex-col items-center gap-10 mt-10">
          {/* Micro Label */}
          <div className="flex items-center justify-center gap-2 text-[13px] font-semibold tracking-wide text-white/85 uppercase mb-6 mt-2 animate-[slideInDown_0.6s_ease-out]">
            <span className="text-base inline-block">🌱</span>
            <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Fraîcheur garantie · Producteurs locaux
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-[Crimson_Pro,Georgia,serif] m-0 mb-4 text-white leading-[1.1] font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] animate-[slideInUp_0.7s_ease-out_0.1s_both]">
              Chez Maureen fruits <br /> et légumes
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-white/92 max-w-[600px] m-0 leading-[1.7] font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)] animate-[slideInUp_0.7s_ease-out_0.2s_both]">
            Du champ à vos paniers, soutenez le local, consommez l'exceptionnel
          </p>

          {/* CTA Button */}
          <Link
            to="/produits"
            className="inline-block px-10 py-4 mt-4 text-base font-semibold text-white no-underline rounded-[18px] cursor-pointer border-none text-center min-w-[180px] bg-gradient-to-br from-primeur-green to-[oklch(60%_0.09_152)] shadow-[0_12px_24px_rgba(69,127,92,0.3),0_4px_12px_rgba(69,127,92,0.2)] border border-[oklch(70%_0.06_152/0.5)] relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-br hover:from-primeur-green-hover hover:to-[oklch(58%_0.095_152)] hover:shadow-[0_20px_40px_rgba(69,127,92,0.4),0_0_40px_rgba(88,153,115,0.3),0_4px_16px_rgba(69,127,92,0.25)] hover:-translate-y-1 animate-[slideInUp_0.7s_ease-out_0.3s_both]"
          >
            Voir nos produits
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center z-[3] text-white animate-[bounceDown_2.5s_cubic-bezier(0.68,-0.55,0.265,1.55)_infinite]">
        <ChevronDown className="w-7 h-7 text-white/90 stroke-[2.5] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
      </div>
    </section>
  )
}
