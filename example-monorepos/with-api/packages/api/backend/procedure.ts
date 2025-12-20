import { os, ORPCError } from '@orpc/server'

export const unauthorized = os.$context<{ headers: Headers }>()

const authMiddleware = unauthorized.middleware(async ({ context, next }) => {
  const jwt = context.headers.get('Authorization')?.split(' ')[1]
  if (jwt) {
    const user = { name: 'Fernando Rojo' } // here you can parse the jwt and get the user
    return next({ context: { user } })
  }

  throw new ORPCError('UNAUTHORIZED')
})

export const authorized = unauthorized.use(authMiddleware)
