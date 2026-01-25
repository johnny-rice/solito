import { createRouterClient } from '@orpc/server'
import { router } from 'api/backend/router'
import { headers } from 'next/headers'

export const rsc = createRouterClient(router, {
  context: async () => ({
    headers: await headers(),
  }),
})
