import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/logout')({
  component: LogoutPage,
})

function LogoutPage() {
  // TODO: Implement logout with Better Auth
  return <div>Logging out...</div>
}
