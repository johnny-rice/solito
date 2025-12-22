import { RPCLink } from '@orpc/client/fetch'
import { getAuthToken } from 'api/frontend/getAuthToken'

export const link = new RPCLink({
  url: process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:3000',
  headers: async () => {
    const token = await getAuthToken()
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
