import { RPCLink } from '@orpc/client/fetch'
import { ORPC_PATHNAME } from 'api/shared/constants'

let url = new URL(
  ORPC_PATHNAME,
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
)

if (typeof window !== 'undefined') {
  url.host = window.location.host
}

export const link = new RPCLink({
  url,
  headers: async () => {
    if (typeof window !== 'undefined') {
      const { getAuthTokenClient } = await import(
        'api/frontend/get-auth-token-client'
      )
      const token = await getAuthTokenClient()
      return { Authorization: `Bearer ${token}` }
    }

    const { headers } = await import('next/headers')
    return await headers()
  },
})
