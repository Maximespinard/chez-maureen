import { createFileRoute, redirect } from '@tanstack/react-router'
import { getServerSession } from '@/lib/auth.server'
import { LoginForm } from '@/features/auth/components/LoginForm'

export const Route = createFileRoute('/auth/connexion')({
  beforeLoad: async () => {
    // Rediriger vers /admin si déjà connecté
    const session = await getServerSession()

    if (session) {
      throw redirect({ to: '/admin' })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="from-surface-warm flex min-h-screen items-center justify-center bg-linear-to-b to-white px-4 py-12">
      <LoginForm />
    </div>
  )
}
