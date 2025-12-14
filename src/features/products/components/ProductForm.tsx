import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import type { MultiSelectOption } from '@/components/ui/multi-select'
import type { ProductWithRelations } from '@/types/product'
import { Button } from '@/components/ui/button'
import { FieldErrors } from '@/components/ui/field-errors'
import { FormError } from '@/components/ui/form-error'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/ui/loading-button'
import { MultiSelect } from '@/components/ui/multi-select'
import { NativeSelect } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { useBadges } from '@/features/badges/hooks/useBadges'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { useProductMutations } from '@/features/products/hooks/useProductMutations'
import { formatZodError } from '@/lib/errors'
import {
  PRODUCT_UNITS,
  ProductCreateSchema,
  ProductUpdateSchema,
} from '@/schemas/product.schema'

interface ProductFormProps {
  onSuccess?: () => void
  product?: ProductWithRelations
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const { create, update } = useProductMutations()
  const { data: categories } = useCategories()
  const { data: badges } = useBadges()
  const isEditMode = !!product
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      badgeIds: product?.badges.map((b) => b.badge.id) ?? [],
      categoryIds: product?.categories.map((c) => c.category.id) ?? [],
      description: product?.description ?? '',
      discountAmount: product?.discountAmount ?? null,
      discountPercent: product?.discountPercent ?? null,
      featuredOrder: product?.featuredOrder ?? undefined,
      image: product?.image ?? '',
      imageKey: product?.imageKey ?? '',
      isActive: product?.isActive ?? true,
      isFeatured: product?.isFeatured ?? false,
      name: product?.name ?? '',
      origin: product?.origin ?? '',
      price: product?.price ?? 0,
      slug: product?.slug ?? '',
      unit: product?.unit ?? 'kg',
    },
    onSubmit: async ({ value }) => {
      setError(null)

      try {
        if (isEditMode) {
          const validatedData = ProductUpdateSchema.parse({
            id: product.id,
            ...value,
          })
          await update.mutateAsync(validatedData)
        } else {
          const validatedData = ProductCreateSchema.parse(value)
          await create.mutateAsync(validatedData)
        }

        window.scrollTo({ top: 0, behavior: 'smooth' })
        onSuccess?.()
      } catch (err) {
        setError(formatZodError(err))
      }
    },
  })

  // Category options for MultiSelect
  const categoryOptions: Array<MultiSelectOption> =
    categories?.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) ?? []

  // Badge options for MultiSelect with colors
  const badgeOptions: Array<MultiSelectOption> =
    badges?.map((badge) => ({
      color: badge.color,
      label: badge.name,
      value: badge.id,
    })) ?? []

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

      {/* Name */}
      <form.Field
        name="name"
        validators={{ onChange: ProductCreateSchema.shape.name }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Nom du produit *</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value)
                // Auto-generate slug on name change (only in create mode)
                if (!isEditMode && e.target.value) {
                  form.setFieldValue('slug', generateSlug(e.target.value))
                }
              }}
              placeholder="Ex: Tomates grappe"
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Slug */}
      <form.Field
        name="slug"
        validators={{ onChange: ProductCreateSchema.shape.slug }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Slug *</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Ex: tomates-grappe"
              disabled={isEditMode}
            />
            <FieldErrors errors={field.state.meta.errors} />
            {isEditMode && (
              <p className="text-text-muted mt-1 text-xs">
                Le slug ne peut pas être modifié
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Description */}
      <form.Field name="description">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Description</Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Description du produit..."
              rows={4}
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Price & Unit */}
      <div className="grid gap-4 md:grid-cols-2">
        <form.Field
          name="price"
          validators={{ onChange: ProductCreateSchema.shape.price }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Prix *</Label>
              <Input
                id={field.name}
                type="number"
                step="0.01"
                min="0"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                placeholder="0.00"
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="unit">
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Unité *</Label>
              <NativeSelect
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {PRODUCT_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </NativeSelect>
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>

      {/* Origin */}
      <form.Field name="origin">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Origine</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Ex: France, Espagne..."
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Image Upload */}
      <form.Field name="image">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Image</Label>
            <ImageUpload
              value={field.state.value}
              imageKey={form.getFieldValue('imageKey')}
              onChange={(url, key) => {
                field.handleChange(url)
                form.setFieldValue('imageKey', key ?? '')
              }}
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Categories */}
      <form.Field
        name="categoryIds"
        validators={{ onChange: ProductCreateSchema.shape.categoryIds }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Catégories *</Label>
            <MultiSelect
              options={categoryOptions}
              selected={field.state.value}
              onChange={field.handleChange}
              placeholder="Sélectionner des catégories..."
              emptyMessage="Aucune catégorie disponible"
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Badges */}
      <form.Field name="badgeIds">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Labels (optionnel)</Label>
            <MultiSelect
              options={badgeOptions}
              selected={field.state.value}
              onChange={field.handleChange}
              placeholder="Sélectionner des labels..."
              emptyMessage="Aucun label disponible"
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Promotion */}
      <div className="space-y-4 rounded-lg border border-gray-200 p-4">
        <h3 className="text-text-dark text-sm font-medium">
          Promotion (optionnel)
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Discount Percent */}
          <form.Field
            name="discountPercent"
            validators={{ onChange: ProductCreateSchema.shape.discountPercent }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Réduction en %</Label>
                <Input
                  id={field.name}
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const val = e.target.value
                    field.handleChange(val === '' ? null : parseFloat(val))
                    // Clear the other field
                    if (val !== '') {
                      form.setFieldValue('discountAmount', null)
                    }
                  }}
                  placeholder="Ex: 20"
                />
                <FieldErrors errors={field.state.meta.errors} />
                <p className="text-text-muted mt-1 text-xs">
                  Réduction en pourcentage (0-100%)
                </p>
              </div>
            )}
          </form.Field>

          {/* Discount Amount */}
          <form.Field
            name="discountAmount"
            validators={{ onChange: ProductCreateSchema.shape.discountAmount }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Réduction en €</Label>
                <Input
                  id={field.name}
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const val = e.target.value
                    field.handleChange(val === '' ? null : parseFloat(val))
                    // Clear the other field
                    if (val !== '') {
                      form.setFieldValue('discountPercent', null)
                    }
                  }}
                  placeholder="Ex: 2"
                />
                <FieldErrors errors={field.state.meta.errors} />
                <p className="text-text-muted mt-1 text-xs">
                  Montant fixe de la réduction en euros
                </p>
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Status Toggles */}
      <div className="space-y-4 rounded-lg border border-gray-200 p-4">
        <h3 className="text-text-dark text-sm font-medium">Statut</h3>

        <form.Field name="isActive">
          {(field) => (
            <div className="flex items-center gap-2">
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="size-4 rounded border-gray-300"
              />
              <Label htmlFor={field.name} className="cursor-pointer">
                Produit actif
              </Label>
            </div>
          )}
        </form.Field>

        <form.Field name="isFeatured">
          {(field) => (
            <div className="flex items-center gap-2">
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="size-4 rounded border-gray-300"
              />
              <Label htmlFor={field.name} className="cursor-pointer">
                Produit vedette
              </Label>
            </div>
          )}
        </form.Field>

        {/* Featured Order (conditional) */}
        <form.Subscribe selector={(state) => state.values.isFeatured}>
          {(isFeatured) =>
            isFeatured ? (
              <form.Field
                name="featuredOrder"
                validators={{
                  onChange: ProductCreateSchema.shape.featuredOrder,
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Ordre d'affichage</Label>
                    <Input
                      id={field.name}
                      type="number"
                      min="0"
                      value={field.state.value ?? ''}
                      onChange={(e) => {
                        const val = e.target.value
                        field.handleChange(
                          val === '' ? undefined : parseInt(val),
                        )
                      }}
                      placeholder="0"
                    />
                    <FieldErrors errors={field.state.meta.errors} />
                    <p className="text-text-muted mt-1 text-xs">
                      Les produits vedettes seront triés par cet ordre
                    </p>
                  </div>
                )}
              </form.Field>
            ) : null
          }
        </form.Subscribe>
      </div>

      {/* Submit Buttons */}
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
              {isEditMode ? 'Mettre à jour' : 'Créer le produit'}
            </LoadingButton>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
