import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import type { Category } from '@/schemas/category.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconPicker } from '@/features/categories/components/IconPicker'
import { useCategoryMutations } from '@/features/categories/hooks/useCategories'
import {
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from '@/schemas/category.schema'

interface CategoryFormProps {
  category?: Category
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

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const router = useRouter()
  const { create, update } = useCategoryMutations()
  const isEditMode = !!category
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: category?.name ?? '',
      slug: category?.slug ?? '',
      icon: category?.icon ?? '',
    },
    onSubmit: async ({ value }) => {
      setError(null)

      try {
        if (isEditMode) {
          const validatedData = CategoryUpdateSchema.parse({
            id: category.id,
            ...value,
          })
          await update.mutateAsync(validatedData)
        } else {
          const validatedData = CategoryCreateSchema.parse(value)
          await create.mutateAsync(validatedData)
        }

        onSuccess?.()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form.Field name="name">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Nom de la catégorie</Label>
            <Input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value)
                if (!isEditMode && e.target.value) {
                  form.setFieldValue('slug', generateSlug(e.target.value))
                }
              }}
              placeholder="Ex: Fruits"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-badge-promo mt-1 text-xs">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="slug">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Slug</Label>
            <Input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Ex: fruits"
              disabled={isEditMode}
            />
            <p className="text-text-body mt-1 text-xs">
              Utilisé dans l'URL. Lettres minuscules, chiffres et tirets
              uniquement.
            </p>
            {field.state.meta.errors.length > 0 && (
              <p className="text-badge-promo mt-1 text-xs">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="icon">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Icône (optionnel)</Label>
            <IconPicker
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.history.back()}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? isEditMode
                  ? 'Mise à jour...'
                  : 'Création...'
                : isEditMode
                  ? 'Mettre à jour'
                  : 'Créer'}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
