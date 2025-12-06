import { Clock, MapPin, Navigation, Phone } from 'lucide-react'

export function StoreInfoSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-primeur-warm-white via-[oklch(96.5%_0.012_152)] to-primeur-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute w-[450px] h-[450px] opacity-[0.06] pointer-events-none z-0 bg-[radial-gradient(circle_at_30%_60%,var(--primeur-green),transparent_70%)] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] -top-[100px] -right-[150px] blur-[40px]" />
      <div className="absolute w-[350px] h-[350px] opacity-[0.06] pointer-events-none z-0 bg-[radial-gradient(circle_at_70%_40%,var(--primeur-terracotta),transparent_70%)] rounded-[30%_70%_40%_60%/60%_30%_70%_40%] -bottom-[80px] -left-[120px] blur-[50px]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-stretch relative z-[1] mb-12">
          {/* Left: Main Info Card */}
          <div className="bg-white rounded-[28px] p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[oklch(95%_0.01_72)] flex flex-col gap-8 transition-all duration-[400ms] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1">
            {/* Header */}
            <div className="flex items-start gap-5 pb-8 border-b border-[oklch(95%_0.01_72)]">
              <div className="w-[52px] h-[52px] flex items-center justify-center bg-gradient-to-br from-primeur-green to-[oklch(60%_0.08_152)] rounded-[18px] text-white flex-shrink-0 shadow-[0_4px_12px_rgba(69,127,92,0.2)]">
                <MapPin className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-dark mb-1 font-[Crimson_Pro,Georgia,serif] -tracking-[0.4px]">
                  Visite-nous au marché
                </h2>
                <p className="text-sm text-text-light font-normal m-0">
                  Découvrez nos produits frais en direct
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className="bg-[oklch(98%_0.01_72)] rounded-[18px] p-6 flex gap-4 items-start transition-all duration-300 border border-[oklch(95%_0.01_72)] hover:bg-[oklch(99%_0.002_72)] hover:border-primeur-green hover:shadow-[0_2px_8px_rgba(69,127,92,0.1)] hover:-translate-y-0.5">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primeur-green to-[oklch(62%_0.08_152)] rounded-xl text-white flex-shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-text-dark mb-2 uppercase tracking-wide">
                    Adresse
                  </h3>
                  <p className="text-sm text-text-medium leading-[1.6] m-0">
                    Rue du Marché 12
                    <br />
                    1000 Ville, Suisse
                  </p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-[oklch(98%_0.01_72)] rounded-[18px] p-6 flex gap-4 items-start transition-all duration-300 border border-[oklch(95%_0.01_72)] hover:bg-[oklch(99%_0.002_72)] hover:border-primeur-green hover:shadow-[0_2px_8px_rgba(69,127,92,0.1)] hover:-translate-y-0.5">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primeur-green to-[oklch(62%_0.08_152)] rounded-xl text-white flex-shrink-0">
                  <Phone className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-text-dark mb-2 uppercase tracking-wide">
                    Téléphone
                  </h3>
                  <a
                    href="tel:+33468816411"
                    className="inline-block text-sm text-primeur-green no-underline font-semibold transition-all duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primeur-green after:transition-all after:duration-300 hover:after:w-full"
                  >
                    04 68 81 64 11
                  </a>
                  <a
                    href="mailto:maureenfruitsetlegumes@gmail.com"
                    className="block mt-2 text-sm text-primeur-green no-underline font-medium transition-all duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primeur-green after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Email nous
                  </a>
                </div>
              </div>
            </div>

            {/* Footer avec status et CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto pt-8 border-t border-[oklch(95%_0.01_72)]">
              <a
                href="https://maps.google.com/?q=Rue+du+Marché+12,+1000+Ville,+Suisse"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-primeur-green to-[oklch(60%_0.09_152)] text-white rounded-[18px] font-semibold text-sm no-underline transition-all duration-300 cursor-pointer border border-[oklch(70%_0.08_152/0.3)] shadow-[0_4px_12px_rgba(69,127,92,0.2)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(69,127,92,0.3)]"
              >
                <Navigation className="w-[18px] h-[18px] stroke-2" />
                Obtenir l'itinéraire
              </a>
            </div>
          </div>

          {/* Right: Hours Card */}
          <div className="bg-gradient-to-br from-[oklch(58%_0.10_152)] to-[oklch(52%_0.11_162)] rounded-[28px] p-12 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(69,127,92,0.25)] border border-[oklch(70%_0.08_152/0.3)]">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(65%_0.08_152/0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,oklch(48%_0.12_172/0.15)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(99%_0.005_72/0.08)_1.5px,transparent_1.5px)] bg-[length:40px_40px] pointer-events-none" />

            <div className="relative z-[1] flex flex-col gap-8">
              {/* Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/20">
                <Clock className="w-7 h-7 stroke-[1.5] flex-shrink-0" />
                <h3 className="text-2xl font-bold m-0 -tracking-[0.3px] text-white font-[Crimson_Pro,Georgia,serif]">
                  Horaires d'ouverture
                </h3>
              </div>

              {/* Hours Grid */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-[auto_1fr] gap-4 items-center py-3 border-b border-white/15">
                  <span className="font-bold text-sm whitespace-nowrap text-white">Lundi</span>
                  <span className="text-sm font-medium opacity-70 italic text-white">Fermé</span>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-4 items-center py-3 border-b border-white/15">
                  <span className="font-bold text-sm whitespace-nowrap text-white">
                    Mardi – Samedi
                  </span>
                  <span className="text-sm font-bold text-[oklch(100%_0.005_72)]">
                    7h – 12h30 · 16h – 19h
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-4 items-center py-3 pb-0">
                  <span className="font-bold text-sm whitespace-nowrap text-white">Dimanche</span>
                  <span className="text-sm font-bold text-[oklch(100%_0.005_72)]">8h – 13h</span>
                </div>
              </div>

              {/* Note */}
              <div className="text-xs text-white/75 italic pt-4 border-t border-white/15 opacity-90">
                Vérifiez avant de visiter en période de congés
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 relative z-[1]">
          <div className="w-full h-[400px] md:h-[450px] bg-gradient-to-br from-[oklch(96%_0.015_152)] to-[oklch(95%_0.02_160)] overflow-hidden rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[oklch(92%_0.01_72)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.4698784160347!2d8.227381!3d47.360078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a1499999999%3A0x0!2sRue%20du%20March%C3%A9%202C%2C%201000%20Lausanne!5e0!3m2!1sfr!2sch!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'inherit' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-[400ms] hover:saturate-[0.65] hover:hue-rotate-[10deg] hover:brightness-[1.1] hover:contrast-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
