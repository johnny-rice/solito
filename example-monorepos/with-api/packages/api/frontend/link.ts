import { RPCLink } from '@orpc/client/fetch'
import { getAuthToken } from 'api/frontend/getAuthToken'

export const link = new RPCLink({
  url: process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000',
  headers: async () => {
    const token = await getAuthToken()
    return { Authorization: `Bearer ${token}` }
  },
})
