import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { useSettings } from '@/features/settings/hooks/useSettings'
import { getCompactedHours } from '@/lib/hours'
import { cn } from '@/lib/utils'

export function StoreInfo() {
  const { data: settings, isLoading } = useSettings()

  if (isLoading || !settings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body">Chargement...</div>
      </div>
    )
  }

  const compactedHours = getCompactedHours(settings.hours)
  const phoneLink = settings.contact.phone.replace(/\s/g, '')

  return (
    <div className="flex flex-col gap-6">
      {/* Combined Info Card */}
      <div className="rounded-3xl border border-[oklch(92%_0.01_72)] bg-white p-8 shadow-md">
        <div className="space-y-6">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="from-primeur-green flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(62%_0.08_152)] text-white shadow-sm">
              <MapPin className="size-5 stroke-[1.5]" />
            </div>
            <div className="flex-1">
              <h3 className="text-text-dark mb-2 text-sm font-bold tracking-wide uppercase">
                Adresse
              </h3>
              <p className="text-text-medium text-sm leading-relaxed">
                {settings.location.address}
                <br />
                {settings.location.postalCode} {settings.location.city}, {settings.location.country}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[oklch(92%_0.01_72)]" />

          {/* Phone */}
          {settings.contact.phone && (
            <>
              <div className="flex items-start gap-4">
                <div className="from-primeur-green flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(62%_0.08_152)] text-white shadow-sm">
                  <Phone className="size-5 stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-text-dark mb-2 text-sm font-bold tracking-wide uppercase">
                    Téléphone
                  </h3>
                  <a
                    href={`tel:+${phoneLink}`}
                    className="text-primeur-green after:bg-primeur-green relative inline-block text-sm font-semibold no-underline transition-all duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {settings.contact.phone}
                  </a>
                </div>
              </div>
              <div className="border-t border-[oklch(92%_0.01_72)]" />
            </>
          )}

          {/* Email */}
          {settings.contact.email && (
            <div className="flex items-start gap-4">
              <div className="from-primeur-green flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(62%_0.08_152)] text-white shadow-sm">
                <Mail className="size-5 stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <h3 className="text-text-dark mb-2 text-sm font-bold tracking-wide uppercase">
                  Email
                </h3>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="text-primeur-green after:bg-primeur-green relative inline-block text-sm font-medium no-underline transition-all duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {settings.contact.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hours Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[oklch(70%_0.08_152/0.3)] bg-linear-to-br from-[oklch(58%_0.10_152)] to-[oklch(52%_0.11_162)] p-8 text-white shadow-lg">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(65%_0.08_152/0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,oklch(48%_0.12_172/0.15)_0%,transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,oklch(99%_0.005_72/0.08)_1.5px,transparent_1.5px)] bg-size-[40px_40px]" />

        <div className="relative z-1 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/20 pb-5">
            <Clock className="size-6 shrink-0 stroke-[1.5]" />
            <h3 className="m-0 font-[Crimson_Pro,Georgia,serif] text-xl font-bold tracking-tight text-white md:text-2xl">
              Horaires d'ouverture
            </h3>
          </div>

          {/* Hours List */}
          <div className="flex flex-col gap-3">
            {compactedHours.map(({ label, hours, isClosed }, index) => {
              const isLast = index === compactedHours.length - 1

              return (
                <div
                  key={label}
                  className={cn(
                    'grid grid-cols-[auto_1fr] items-center gap-4 py-2.5',
                    !isLast && 'border-b border-white/15',
                  )}
                >
                  <span className="text-sm font-bold whitespace-nowrap text-white">{label}</span>
                  <span className={cn('text-sm font-medium text-white', isClosed ? 'italic opacity-70' : 'font-bold')}>
                    {hours}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
