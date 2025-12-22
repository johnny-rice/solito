import { os, ORPCError } from '@orpc/server'

export const unauthorized = os.$context<{
  headers: Headers
  cookies: Record<'get', (name: string) => unknown>
}>()

// make sure you implement your own auth logic here
const authMiddleware = unauthorized.middleware(async ({ context, next }) => {
  // first, check cookies
  const session = context.cookies?.get('session')
  if (session) {
    const user = { name: 'Fernando Rojo' } // here you can parse the session and get the user
    return next({ context: { user } })
  }

  const jwt = context.headers.get('Authorization')?.split(' ')[1]
  if (jwt) {
    const user = { name: 'Fernando Rojo' } // here you can parse the jwt and get the user
    return next({ context: { user } })
  }

  throw new ORPCError('UNAUTHORIZED')
})

export const authorized = unauthorized.use(authMiddleware)
