import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import type { Badge } from '@/schemas/badge.schema'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { FieldErrors } from '@/components/ui/field-errors'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/ui/loading-button'
import { useBadgeMutations } from '@/features/badges/hooks/useBadges'
import { formatZodError } from '@/lib/errors'
import { BadgeCreateSchema, BadgeUpdateSchema } from '@/schemas/badge.schema'

interface BadgeFormProps {
  badge?: Badge
  onSuccess?: () => void
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function BadgeForm({ badge, onSuccess }: BadgeFormProps) {
  const router = useRouter()
  const { create, update } = useBadgeMutations()
  const isEditMode = !!badge
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      color: badge?.color ?? '#22c55e', // Default green color
      name: badge?.name ?? '',
      slug: badge?.slug ?? '',
    },
    onSubmit: async ({ value }) => {
      setError(null)

      try {
        if (isEditMode) {
          const validatedData = BadgeUpdateSchema.parse({
            id: badge.id,
            ...value,
          })
          await update.mutateAsync(validatedData)
        } else {
          const validatedData = BadgeCreateSchema.parse(value)
          await create.mutateAsync(validatedData)
        }

        window.scrollTo({ top: 0, behavior: 'smooth' })
        onSuccess?.()
      } catch (err) {
        setError(formatZodError(err))
      }
    },
  })

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FormError message={error} />

      <form.Field
        name="name"
        validators={{
          onChange: BadgeCreateSchema.shape.name,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Nom du badge</Label>
            <Input
              id={field.name}
              name={field.name}
              placeholder="Ex: Bio"
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value)
                if (!isEditMode && e.target.value) {
                  form.setFieldValue('slug', generateSlug(e.target.value))
                }
              }}
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field
        name="slug"
        validators={{
          onChange: BadgeCreateSchema.shape.slug,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Slug</Label>
            <Input
              disabled={isEditMode}
              id={field.name}
              name={field.name}
              placeholder="Ex: bio"
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <p className="text-text-body mt-1 text-xs">
              Identifiant unique. Lettres minuscules, chiffres et tirets uniquement.
            </p>
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field
        name="color"
        validators={{
          onChange: BadgeCreateSchema.shape.color,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Couleur</Label>
            <ColorPicker
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(color) => field.handleChange(color)}
            />
            <p className="text-text-body mt-1 text-xs">
              Couleur d'affichage du badge sur les produits.
            </p>
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <div className="flex gap-3">
            <Button
              className="flex-1"
              type="button"
              variant="outline"
              onClick={() => router.history.back()}
            >
              Annuler
            </Button>
            <LoadingButton className="flex-1" disabled={!canSubmit} loading={isSubmitting} type="submit">
              {isEditMode ? 'Mettre à jour' : 'Créer'}
            </LoadingButton>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
