import { getRequest } from '@tanstack/react-start/server'
import { auth } from '@/lib/auth'

export async function getServerSession() {
  'use server'
  const request = getRequest()
  return await auth.api.getSession({
    headers: request.headers,
  })
}

export async function signOutServer() {
  'use server'
  const request = getRequest()
  return await auth.api.signOut({
    headers: request.headers,
  })
}
