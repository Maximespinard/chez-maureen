import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/components/LoginForm'

export const Route = createFileRoute('/connexion/')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="from-surface-warm flex min-h-screen items-center justify-center bg-linear-to-b to-white px-4 py-12">
      <LoginForm />
    </div>
  )
}
