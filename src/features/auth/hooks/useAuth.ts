import { useRouter } from '@tanstack/react-router'
import { signOut, useSession } from '@/lib/auth-client'

export function useAuth() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({ to: '/' })
        },
      },
    })
  }

  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    logout,
  }
}
