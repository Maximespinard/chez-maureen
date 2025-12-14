import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteCategoryDialogProps {
  category: { id: string; name: string; _count?: { products: number } } | null
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function DeleteCategoryDialog({
  category,
  onConfirm,
  onOpenChange,
  open,
}: DeleteCategoryDialogProps) {
  if (!category) return null

  const productCount = category._count?.products ?? 0
  const canDelete = productCount === 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer la catégorie</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer la catégorie &quot;
            {category.name}&quot; ?
          </DialogDescription>
        </DialogHeader>

        {!canDelete && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="size-5 shrink-0 text-amber-600" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold">
                Impossible de supprimer cette catégorie
              </p>
              <p className="mt-1">
                Cette catégorie contient {productCount} produit
                {productCount > 1 ? 's' : ''}. Veuillez d'abord retirer tous les
                produits de cette catégorie.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            disabled={!canDelete}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
