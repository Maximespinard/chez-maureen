import { Turnstile } from '@marsidev/react-turnstile'
import { Send } from 'lucide-react'
import { useState } from 'react'

import { FieldErrors } from '@/components/ui/field-errors'
import { useContactForm } from '@/features/contact/hooks/useContactForm'
import { ContactCreateSchema } from '@/schemas/contact.schema'

export function ContactForm() {
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const { form } = useContactForm(turnstileToken)

  return (
    <div className="rounded-3xl border border-[oklch(92%_0.01_72)] bg-white p-8 shadow-md md:p-10">
      {/* Form Header */}
      <div className="mb-8 border-b border-[oklch(92%_0.01_72)] pb-6">
        <h2 className="text-text-dark mb-2 font-[Crimson_Pro,Georgia,serif] text-2xl font-bold md:text-3xl">
          Envoyez-nous un message
        </h2>
        <p className="text-text-body text-sm md:text-base">
          Nous vous répondrons dans les plus brefs délais
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        {/* Name Field */}
        <form.Field
          name="name"
          validators={{
            onChange: ContactCreateSchema.shape.name,
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="text-text-dark mb-2 block text-sm font-semibold"
              >
                Nom complet <span className="text-badge-promo">*</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Votre nom"
                className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 focus:ring-4 focus:outline-none"
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onChange: ContactCreateSchema.shape.email,
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="text-text-dark mb-2 block text-sm font-semibold"
              >
                Email <span className="text-badge-promo">*</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="votre@email.com"
                className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 focus:ring-4 focus:outline-none"
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Phone Field */}
        <form.Field name="phone">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="text-text-dark mb-2 block text-sm font-semibold"
              >
                Téléphone{' '}
                <span className="text-text-light font-normal italic">
                  (optionnel)
                </span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type="tel"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="+41 XX XXX XX XX"
                className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 focus:ring-4 focus:outline-none"
              />
            </div>
          )}
        </form.Field>

        {/* Message Field */}
        <form.Field
          name="message"
          validators={{
            onChange: ContactCreateSchema.shape.message,
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="text-text-dark mb-2 block text-sm font-semibold"
              >
                Message <span className="text-badge-promo">*</span>
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Votre message..."
                rows={6}
                className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 focus:ring-4 focus:outline-none"
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Turnstile Widget (invisible) */}
        <div className="flex justify-center">
          <Turnstile
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || 'test-key'}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken('')}
            onExpire={() => setTurnstileToken('')}
            options={{
              theme: 'light',
              size: 'normal',
            }}
          />
        </div>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || !turnstileToken}
              className="from-primeur-green to-primeur-green-hover hover:shadow-primeur-green/30 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </span>
              {!isSubmitting && <Send className="size-4.5 stroke-2" />}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
