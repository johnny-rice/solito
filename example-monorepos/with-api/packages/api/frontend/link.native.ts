import { RPCLink } from '@orpc/client/fetch'
import { getAuthTokenClient } from 'api/frontend/get-auth-token-client'
import { ORPC_PATHNAME } from 'api/shared/constants'

let url = new URL(
  ORPC_PATHNAME,
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
)

export const link = new RPCLink({
  url,
  headers: async () => {
    const token = await getAuthTokenClient()
    return { Authorization: `Bearer ${token}` }
  },
  async fetch(request, init) {
    const { fetch } = await import('expo/fetch')

    const resp = await fetch(request.url, {
      body: await request.blob(),
      headers: request.headers,
      method: request.method,
      signal: request.signal,
      ...init,
    })

    return resp
  },
})
