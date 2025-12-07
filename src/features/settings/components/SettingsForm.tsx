import { useForm } from '@tanstack/react-form'
import { useEffect, useState } from 'react'

import { FieldErrors } from '@/components/ui/field-errors'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/ui/loading-button'
import { Textarea } from '@/components/ui/textarea'
import {
  useSettings,
  useSettingsMutation,
} from '@/features/settings/hooks/useSettings'
import { formatZodError } from '@/lib/errors'
import { DAYS } from '@/lib/hours'
import {
  BusinessInfoSchema,
  ContactInfoSchema,
  DayHoursSchema,
  LocationSchema,
  SocialLinksSchema,
  StoreSettingsUpdateSchema,
} from '@/schemas/settings.schema'

export function SettingsForm() {
  const { data: settings, isLoading } = useSettings()
  const { update } = useSettingsMutation()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm({
    defaultValues: settings || {
      business: { storeName: '', tagline: '', description: '' },
      contact: { phone: '', email: '', whatsapp: '' },
      location: {
        address: '',
        city: '',
        postalCode: '',
        country: 'Suisse',
        mapsEmbedUrl: '',
      },
      hours: {
        monday: { isClosed: true },
        tuesday: { isClosed: false, openTime: '08:00', closeTime: '19:00' },
        wednesday: { isClosed: false, openTime: '08:00', closeTime: '19:00' },
        thursday: { isClosed: false, openTime: '08:00', closeTime: '19:00' },
        friday: { isClosed: false, openTime: '08:00', closeTime: '19:00' },
        saturday: { isClosed: false, openTime: '08:00', closeTime: '19:00' },
        sunday: { isClosed: false, openTime: '08:00', closeTime: '12:00' },
      },
      social: { facebook: '', instagram: '' },
    },
    onSubmit: async ({ value }) => {
      setError(null)
      setSuccess(false)
      try {
        const validatedData = StoreSettingsUpdateSchema.parse(value)
        await update.mutateAsync(validatedData)
        setSuccess(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => setSuccess(false), 3000)
      } catch (err) {
        setError(formatZodError(err))
      }
    },
  })

  // Reset form when settings load
  useEffect(() => {
    if (settings) {
      form.reset(settings)
    }
  }, [settings])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body">Chargement des paramètres...</div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-8"
    >
      <FormError message={error} />
      {success && (
        <div className="border-primeur-green bg-primeur-green/10 text-primeur-green rounded-md border p-4 text-sm">
          ✓ Paramètres enregistrés avec succès
        </div>
      )}

      {/* Section: Business Info */}
      <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-text-dark mb-6 text-lg font-semibold">
          Informations du commerce
        </h2>
        <div className="space-y-4">
          <form.Field
            name="business.storeName"
            validators={{ onChange: BusinessInfoSchema.shape.storeName }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Nom du commerce *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Chez Maureen"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="business.tagline"
            validators={{ onChange: BusinessInfoSchema.shape.tagline }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Slogan</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Fruits & légumes frais du marché"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="business.description"
            validators={{ onChange: BusinessInfoSchema.shape.description }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Description de votre commerce..."
                  rows={4}
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Section: Contact */}
      <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-text-dark mb-6 text-lg font-semibold">Contact</h2>
        <div className="space-y-4">
          <form.Field
            name="contact.phone"
            validators={{ onChange: ContactInfoSchema.shape.phone }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Téléphone</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="04 68 81 64 11"
                  type="tel"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="contact.email"
            validators={{ onChange: ContactInfoSchema.shape.email }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="contact@example.com"
                  type="email"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="contact.whatsapp"
            validators={{ onChange: ContactInfoSchema.shape.whatsapp }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>WhatsApp</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="33468816411"
                />
                <p className="text-text-body mt-1 text-xs">
                  Format international sans le + (ex: 33468816411)
                </p>
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Section: Location */}
      <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-text-dark mb-6 text-lg font-semibold">Adresse</h2>
        <div className="space-y-4">
          <form.Field
            name="location.address"
            validators={{ onChange: LocationSchema.shape.address }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Rue</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Rue du Marché 12"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="location.postalCode"
              validators={{ onChange: LocationSchema.shape.postalCode }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Code postal</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="1000"
                  />
                  <FieldErrors errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="location.city"
              validators={{ onChange: LocationSchema.shape.city }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Ville</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Lausanne"
                  />
                  <FieldErrors errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field
            name="location.country"
            validators={{ onChange: LocationSchema.shape.country }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Pays</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Suisse"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="location.mapsEmbedUrl"
            validators={{ onChange: LocationSchema.shape.mapsEmbedUrl }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>
                  URL d'intégration Google Maps
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
                <p className="text-text-body mt-1 text-xs">
                  Obtenez l'URL sur Google Maps → Partager → Intégrer une carte
                </p>
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Section: Hours */}
      <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-text-dark mb-6 text-lg font-semibold">
          Horaires d'ouverture
        </h2>
        <div className="space-y-3">
          {DAYS.map(({ key, label }) => (
            <div
              key={key}
              className="grid grid-cols-[120px_100px_1fr_1fr] items-center gap-4"
            >
              <span className="text-text-dark text-sm font-medium">
                {label}
              </span>

              <form.Field
                name={`hours.${key}.isClosed` as const}
                validators={{ onChange: DayHoursSchema.shape.isClosed }}
              >
                {(field) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="text-primeur-green focus:ring-primeur-green size-4 rounded border-gray-300"
                    />
                    <span className="text-text-body text-sm">Fermé</span>
                  </label>
                )}
              </form.Field>

              <form.Field
                name={`hours.${key}.openTime` as const}
                validators={{ onChange: DayHoursSchema.shape.openTime }}
              >
                {(field) => (
                  <div>
                    <Input
                      type="time"
                      value={field.state.value || ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.getFieldValue(
                        `hours.${key}.isClosed` as const,
                      )}
                      placeholder="08:00"
                    />
                    <FieldErrors errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field
                name={`hours.${key}.closeTime` as const}
                validators={{ onChange: DayHoursSchema.shape.closeTime }}
              >
                {(field) => (
                  <div>
                    <Input
                      type="time"
                      value={field.state.value || ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.getFieldValue(
                        `hours.${key}.isClosed` as const,
                      )}
                      placeholder="19:00"
                    />
                    <FieldErrors errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Social Links */}
      <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-text-dark mb-6 text-lg font-semibold">
          Réseaux sociaux
        </h2>
        <div className="space-y-4">
          <form.Field
            name="social.facebook"
            validators={{ onChange: SocialLinksSchema.shape.facebook }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Facebook</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://facebook.com/votrecommerce"
                  type="url"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field
            name="social.instagram"
            validators={{ onChange: SocialLinksSchema.shape.instagram }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Instagram</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://instagram.com/votrecommerce"
                  type="url"
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <LoadingButton
          type="submit"
          loading={update.isPending}
          className="min-w-[200px]"
        >
          Enregistrer les modifications
        </LoadingButton>
      </div>
    </form>
  )
}
