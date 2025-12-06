import { useForm } from '@tanstack/react-form'
import type { ContactCreate } from '@/schemas/contact.schema'

export function useContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    } as ContactCreate,
    onSubmit: async ({ value }) => {
      // Pour l'instant, on log les données (backend plus tard)
      console.log('📩 Formulaire de contact soumis :', value)

      // TODO: Ajouter l'appel API quand le backend sera prêt
      // await sendContactMessage(value)

      // Simuler un délai
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Message de succès (à remplacer par un toast/notification plus tard)
      alert('Message envoyé avec succès ! Nous vous répondrons rapidement.')

      // Réinitialiser le formulaire
      form.reset()
    },
  })

  return form
}
