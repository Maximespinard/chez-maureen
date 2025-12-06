import { Link } from '@tanstack/react-router'

export function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[oklch(60%_0.08_152)] to-[oklch(55%_0.09_162)] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(65%_0.08_152/0.3)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,oklch(60%_0.10_142/0.3)_0%,transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,oklch(99%_0.005_72/0.6)_1px,transparent_1px),radial-gradient(circle,oklch(99%_0.005_72/0.4)_1.5px,transparent_1.5px)] bg-[length:120px_120px,200px_200px] bg-[position:0_0,40px_60px] pointer-events-none opacity-30 animate-[slideBg_20s_linear_infinite]"
        style={{
          animation: 'slideBg 20s linear infinite',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[700px] mx-auto relative z-[1]">
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-[Crimson_Pro,Georgia,serif] font-bold">
            Une question sur nos produits ?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Notre équipe se fera un plaisir de vous répondre
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-primeur-terracotta text-white text-base font-semibold no-underline rounded-[18px] cursor-pointer border-none text-center min-w-[180px] shadow-md transition-all duration-300 hover:bg-primeur-terracotta-hover hover:shadow-lg hover:-translate-y-0.5"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideBg {
          0% { background-position: 0 0, 40px 60px; }
          100% { background-position: 120px 0, 160px 60px; }
        }
      `}</style>
    </section>
  )
}
