import { Trash2 } from 'lucide-react'

import type { ContactMessageModel } from '@/lib/schema'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useContactMessageMutations } from '@/features/contact/hooks/useContactMessages'

interface DeleteMessageDialogProps {
  message: ContactMessageModel | null
  onConfirm?: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function DeleteMessageDialog({
  message,
  open,
  onOpenChange,
  onConfirm,
}: DeleteMessageDialogProps) {
  const { remove } = useContactMessageMutations()

  const handleConfirm = () => {
    if (!message) return

    remove.mutate(message.id, {
      onSuccess: () => {
        onConfirm?.()
      },
    })
  }

  if (!message) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="text-error size-5" />
            Supprimer le message
          </AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer le message de{' '}
            <strong>{message.name}</strong> ? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
