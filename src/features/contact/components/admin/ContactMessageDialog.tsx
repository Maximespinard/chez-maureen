import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Mail, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DeleteMessageDialog } from './DeleteMessageDialog'
import type { ContactMessageModel } from '@/generated/prisma/models'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useContactMessageMutations } from '@/features/contact/hooks/useContactMessages'

interface ContactMessageDialogProps {
  message: ContactMessageModel | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function ContactMessageDialog({
  message,
  open,
  onOpenChange,
}: ContactMessageDialogProps) {
  const { toggleRead } = useContactMessageMutations()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Auto-marquer comme lu quand on ouvre le dialog si le message est non-lu
  useEffect(() => {
    if (open && message && !message.isRead) {
      toggleRead.mutate(message.id)
    }
  }, [open, message])

  if (!message) return null

  const formattedDate = format(
    new Date(message.createdAt),
    "d MMMM yyyy 'à' HH:mm",
    {
      locale: fr,
    },
  )

  const handleMailto = () => {
    const subject = encodeURIComponent(
      `Re: Message de contact - ${message.name}`,
    )
    const body = encodeURIComponent(
      `\n\n---\nMessage original de ${message.name} (${formattedDate}) :\n${message.message}`,
    )
    window.location.href = `mailto:${message.email}?subject=${subject}&body=${body}`
  }

  const handleDelete = () => {
    setShowDeleteDialog(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message de contact</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Infos expéditeur */}
            <div className="border-border-subtle space-y-2 rounded-lg border bg-white p-4">
              <div>
                <span className="text-text-light text-sm">De :</span>
                <p className="text-text-dark font-semibold">{message.name}</p>
              </div>
              <div>
                <span className="text-text-light text-sm">Email :</span>
                <p className="text-text-body">{message.email}</p>
              </div>
              {message.phone && (
                <div>
                  <span className="text-text-light text-sm">Téléphone :</span>
                  <p className="text-text-body">{message.phone}</p>
                </div>
              )}
              <div>
                <span className="text-text-light text-sm">Reçu le :</span>
                <p className="text-text-body">{formattedDate}</p>
              </div>
            </div>

            {/* Message */}
            <div className="border-border-subtle rounded-lg border bg-white p-4">
              <h3 className="text-text-dark mb-2 text-sm font-semibold">
                Message
              </h3>
              <p className="text-text-body text-sm break-all whitespace-pre-wrap">
                {message.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="default"
                onClick={handleMailto}
                className="flex-1"
              >
                <Mail className="mr-2 size-4" />
                Répondre
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-error hover:bg-error-light flex-1"
              >
                <Trash2 className="mr-2 size-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog confirmation suppression */}
      <DeleteMessageDialog
        message={message}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          setShowDeleteDialog(false)
          onOpenChange(false)
        }}
      />
    </>
  )
}
