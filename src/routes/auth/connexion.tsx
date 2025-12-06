import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/connexion')({
  component: LoginPage,
})

function LoginPage() {
  return <div>Login Page - TODO (Better Auth)</div>
}
