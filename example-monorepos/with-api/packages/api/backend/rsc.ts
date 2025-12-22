import { createRouterClient } from '@orpc/server'
import { router } from 'api/backend/router'
import { nextjsContext } from 'api/backend/nextjs-context'

export const rsc = createRouterClient(router, {
  context: nextjsContext,
})
