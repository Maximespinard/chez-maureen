import { Link } from '@tanstack/react-router'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[oklch(60%_0.08_152)] to-[oklch(55%_0.09_162)] py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(65%_0.08_152/0.3)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,oklch(60%_0.10_142/0.3)_0%,transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 animate-[slideBg_20s_linear_infinite] bg-[radial-gradient(circle,oklch(99%_0.005_72/0.6)_1px,transparent_1px),radial-gradient(circle,oklch(99%_0.005_72/0.4)_1.5px,transparent_1.5px)] bg-[length:120px_120px,200px_200px] bg-[position:0_0,40px_60px] opacity-30"
        style={{
          animation: 'slideBg 20s linear infinite',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative z-1 mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-[Crimson_Pro,Georgia,serif] text-4xl font-bold text-white md:text-5xl">
            Une question sur nos produits ?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Notre équipe se fera un plaisir de vous répondre
          </p>
          <Link
            to="/contact"
            className="bg-primeur-terracotta hover:bg-primeur-terracotta-hover inline-block min-w-[180px] cursor-pointer rounded-xl border-none px-8 py-4 text-center text-base font-semibold text-white no-underline shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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
