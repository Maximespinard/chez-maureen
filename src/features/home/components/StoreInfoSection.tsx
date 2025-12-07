import { Clock, MapPin, Navigation, Phone } from 'lucide-react'

import type { DayHours } from '@/schemas/settings.schema'
import { useSettings } from '@/features/settings/hooks/useSettings'

export function StoreInfoSection() {
  const { data: settings, isLoading } = useSettings()

  if (isLoading || !settings) {
    return (
      <section className="from-primeur-warm-white to-primeur-cream relative overflow-hidden bg-linear-to-b via-[oklch(96.5%_0.012_152)] py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-text-body">Chargement...</div>
          </div>
        </div>
      </section>
    )
  }

  const fullAddress = `${settings.location.address}, ${settings.location.postalCode} ${settings.location.city}, ${settings.location.country}`
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`

  const formatHours = (day: DayHours) => {
    if (day.isClosed) return 'Fermé'
    return `${day.openTime} – ${day.closeTime}`
  }

  const phoneLink = settings.contact.phone.replace(/\s/g, '')

  return (
    <section className="from-primeur-warm-white to-primeur-cream relative overflow-hidden bg-linear-to-b via-[oklch(96.5%_0.012_152)] py-24">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -top-25 right-[-150px] z-0 h-[450px] w-[450px] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] bg-[radial-gradient(circle_at_30%_60%,var(--primeur-green),transparent_70%)] opacity-[0.06] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-30 z-0 h-[350px] w-[350px] rounded-[30%_70%_40%_60%/60%_30%_70%_40%] bg-[radial-gradient(circle_at_70%_40%,var(--primeur-terracotta),transparent_70%)] opacity-[0.06] blur-[50px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Main Layout */}
        <div className="relative z-1 mb-12 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Left: Main Info Card */}
          <div className="border-border-subtle flex flex-col gap-8 rounded-3xl border bg-white p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            {/* Header */}
            <div className="border-border-subtle flex items-start gap-5 border-b pb-8">
              <div className="from-primeur-green flex size-13 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(60%_0.08_152)] text-white shadow-[0_4px_12px_rgba(69,127,92,0.2)]">
                <MapPin className="h-6 w-6 stroke-[1.8]" />
              </div>
              <div className="flex-1">
                <h2 className="text-text-dark mb-1 font-[Crimson_Pro,Georgia,serif] text-2xl font-bold tracking-[-0.4px]">
                  Visite-nous au marché
                </h2>
                <p className="text-text-light m-0 text-sm font-normal">
                  Découvrez nos produits frais en direct
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Address Card */}
              <div className="hover:border-primeur-green border-border-subtle bg-surface-card hover:bg-surface-card-hover flex items-start gap-4 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(69,127,92,0.1)]">
                <div className="from-primeur-green flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(62%_0.08_152)] text-white">
                  <MapPin className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-text-dark mb-2 text-sm font-semibold tracking-wide uppercase">
                    Adresse
                  </h3>
                  <p className="text-text-medium m-0 text-sm leading-[1.6]">
                    {settings.location.address}
                    <br />
                    {settings.location.postalCode} {settings.location.city}, {settings.location.country}
                  </p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="hover:border-primeur-green border-border-subtle bg-surface-card hover:bg-surface-card-hover flex items-start gap-4 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(69,127,92,0.1)]">
                <div className="from-primeur-green flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(62%_0.08_152)] text-white">
                  <Phone className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-text-dark mb-2 text-sm font-semibold tracking-wide uppercase">
                    Téléphone
                  </h3>
                  {settings.contact.phone && (
                    <a
                      href={`tel:+${phoneLink}`}
                      className="text-primeur-green after:bg-primeur-green relative inline-block text-sm font-semibold no-underline transition-all duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {settings.contact.phone}
                    </a>
                  )}
                  {settings.contact.email && (
                    <a
                      href={`mailto:${settings.contact.email}`}
                      className="text-primeur-green after:bg-primeur-green relative mt-2 block text-sm font-medium no-underline transition-all duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Email nous
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Footer avec status et CTA */}
            <div className="border-border-subtle mt-auto flex flex-col items-center justify-between gap-3 border-t pt-8 sm:flex-row">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="from-primeur-green flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[oklch(70%_0.08_152/0.3)] bg-linear-to-br to-[oklch(60%_0.09_152)] px-6 py-3 text-sm font-semibold text-white no-underline shadow-[0_4px_12px_rgba(69,127,92,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(69,127,92,0.3)]"
              >
                <Navigation className="size-4.5 stroke-2" />
                Obtenir l'itinéraire
              </a>
            </div>
          </div>

          {/* Right: Hours Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[oklch(70%_0.08_152/0.3)] bg-linear-to-br from-[oklch(58%_0.10_152)] to-[oklch(52%_0.11_162)] p-12 text-white shadow-[0_8px_32px_rgba(69,127,92,0.25)]">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(65%_0.08_152/0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,oklch(48%_0.12_172/0.15)_0%,transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,oklch(99%_0.005_72/0.08)_1.5px,transparent_1.5px)] bg-size-[40px_40px]" />

            <div className="relative z-1 flex flex-col gap-8">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/20 pb-6">
                <Clock className="h-7 w-7 shrink-0 stroke-[1.5]" />
                <h3 className="m-0 font-[Crimson_Pro,Georgia,serif] text-2xl font-bold tracking-[-0.3px] text-white">
                  Horaires d'ouverture
                </h3>
              </div>

              {/* Hours Grid */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/15 py-3">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Lundi</span>
                  <span className={`text-sm font-medium ${settings.hours.monday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.monday)}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/15 py-3">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Mardi</span>
                  <span className={`text-sm font-medium ${settings.hours.tuesday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.tuesday)}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/15 py-3">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Mercredi</span>
                  <span className={`text-sm font-medium ${settings.hours.wednesday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.wednesday)}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/15 py-3">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Jeudi</span>
                  <span className={`text-sm font-medium ${settings.hours.thursday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.thursday)}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/15 py-3">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Vendredi</span>
                  <span className={`text-sm font-medium ${settings.hours.friday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.friday)}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/15 py-3">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Samedi</span>
                  <span className={`text-sm font-medium ${settings.hours.saturday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.saturday)}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4 py-3 pb-0">
                  <span className="text-sm font-bold whitespace-nowrap text-white">Dimanche</span>
                  <span className={`text-sm font-medium ${settings.hours.sunday.isClosed ? 'italic opacity-70' : 'text-text-hours font-bold'} text-white`}>
                    {formatHours(settings.hours.sunday)}
                  </span>
                </div>
              </div>

              {/* Note */}
              <div className="border-t border-white/15 pt-4 text-xs text-white/75 italic opacity-90">
                Vérifiez avant de visiter en période de congés
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        {settings.location.mapsEmbedUrl && (
          <div className="relative z-1 mt-12">
            <div className="h-[400px] w-full overflow-hidden rounded-3xl border border-[oklch(92%_0.01_72)] bg-linear-to-br from-[oklch(96%_0.015_152)] to-[oklch(95%_0.02_160)] shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:h-[450px]">
              <iframe
                src={settings.location.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'inherit' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-400 hover:brightness-[1.1] hover:contrast-100 hover:hue-rotate-10 hover:saturate-[0.65]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
