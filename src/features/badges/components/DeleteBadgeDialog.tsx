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

interface DeleteBadgeDialogProps {
  badge: { _count?: { products: number }; id: string; name: string } | null
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function DeleteBadgeDialog({
  badge,
  onConfirm,
  onOpenChange,
  open,
}: DeleteBadgeDialogProps) {
  if (!badge) return null

  const productCount = badge._count?.products ?? 0
  const hasProducts = productCount > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le badge</DialogTitle>
          <DialogDescription>
            Etes-vous sur de vouloir supprimer le badge &quot;{badge.name}&quot; ?
          </DialogDescription>
        </DialogHeader>

        {hasProducts && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="size-5 shrink-0 text-amber-600" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold">Attention</p>
              <p className="mt-1">
                Ce badge est utilise par {productCount} produit
                {productCount > 1 ? 's' : ''}. La suppression retirera le badge de tous
                ces produits.
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
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
