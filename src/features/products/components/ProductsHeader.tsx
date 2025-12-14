export function ProductsHeader() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[oklch(96.5%_0.012_152)] via-white to-white py-20">
      {/* Decorative element */}
      <div className="pointer-events-none absolute -top-20 right-10 z-0 h-[300px] w-[300px] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] bg-[radial-gradient(circle_at_30%_60%,var(--primeur-green),transparent_70%)] opacity-[0.08] blur-2xl" />

      <div className="relative z-1 mx-auto max-w-4xl px-6 text-center md:px-8">
        <span className="bg-primeur-green/10 text-primeur-green mb-6 inline-block rounded-full px-5 py-2 text-sm font-semibold tracking-wide">
          Catalogue
        </span>
        <h1 className="text-text-dark mb-5 font-[Crimson_Pro,Georgia,serif] text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Nos produits
        </h1>
        <p className="text-text-body mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
          Découvrez tous nos fruits & légumes du moment
        </p>
      </div>
    </section>
  )
}
