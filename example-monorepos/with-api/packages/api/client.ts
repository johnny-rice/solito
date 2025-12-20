import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { router } from '@api/server/router'

const link = new RPCLink({
  url: 'http://127.0.0.1:3000',
  headers: { Authorization: 'Bearer token' },
})

export const api: RouterClient<typeof router> = createORPCClient(link)
