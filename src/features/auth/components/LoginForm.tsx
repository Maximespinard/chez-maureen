import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { Lock, User } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { LoginSchema } from '@/schemas/auth.schema'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError(null)

      const result = await authClient.signIn.username({
        username: value.username,
        password: value.password,
      })

      if (result.error) {
        setError(result.error.message || 'Identifiants incorrects')
        return
      }

      router.navigate({ to: '/admin' })
    },
  })

  return (
    <div className="border-border-subtle mx-auto w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-text-dark mb-2 font-[Crimson_Pro,Georgia,serif] text-3xl font-bold">
          Espace Admin
        </h1>
        <p className="text-text-body text-sm">
          Connectez-vous pour gérer votre boutique
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.Field
          name="username"
          validators={{
            onChange: LoginSchema.shape.username,
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="text-text-dark mb-2 block text-sm font-semibold"
              >
                Nom d'utilisateur
              </label>
              <div className="relative">
                <User className="text-text-light absolute top-1/2 left-3 size-5 -translate-y-1/2" />
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Entrez votre nom d'utilisateur"
                  className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-sm transition-all duration-200 focus:ring-4 focus:outline-none"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="mt-2 text-sm text-red-500">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: LoginSchema.shape.password,
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="text-text-dark mb-2 block text-sm font-semibold"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="text-text-light absolute top-1/2 left-3 size-5 -translate-y-1/2" />
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-sm transition-all duration-200 focus:ring-4 focus:outline-none"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="mt-2 text-sm text-red-500">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
