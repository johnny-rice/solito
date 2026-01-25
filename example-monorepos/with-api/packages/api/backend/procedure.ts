import { os, ORPCError } from '@orpc/server'

export const unauthorized = os.$context<{
  headers: Headers
}>()

// TODO: implement your own auth logic here
const authMiddleware = unauthorized.middleware(async ({ context, next }) => {
  const jwt = context.headers.get('Authorization')?.split(' ')[1]
  if (jwt) {
    const user = { name: 'Fernando Rojo', id: 1 }
    return next({ context: { user } })
  }

  throw new ORPCError('UNAUTHORIZED')
})

export const authorized = unauthorized.use(authMiddleware)
