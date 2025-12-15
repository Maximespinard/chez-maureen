import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import type { Category } from '@/schemas/category.schema'

import { Button } from '@/components/ui/button'
import { FieldErrors } from '@/components/ui/field-errors'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/ui/loading-button'
import { useCategoryMutations } from '@/features/categories/hooks/useCategories'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { formatZodError } from '@/lib/errors'
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
  const scrollToTop = useScrollToTop()
  const isEditMode = !!category
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: category?.name ?? '',
      slug: category?.slug ?? '',
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
        setError(formatZodError(err))
      } finally {
        scrollToTop()
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
      <FormError message={error} />

      <form.Field
        name="name"
        validators={{
          onChange: CategoryCreateSchema.shape.name,
        }}
      >
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
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field
        name="slug"
        validators={{
          onChange: CategoryCreateSchema.shape.slug,
        }}
      >
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
            <FieldErrors errors={field.state.meta.errors} />
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
            <LoadingButton
              type="submit"
              disabled={!canSubmit}
              loading={isSubmitting}
              className="flex-1"
            >
              {isEditMode ? 'Mettre à jour' : 'Créer'}
            </LoadingButton>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
