import { RPCHandler } from '@orpc/server/fetch'
import { onError } from '@orpc/server'
import { router } from './router'

const handler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

export const getRequestHandler = (prefix: `/${string}`) => {
  return async (request: Request) => {
    const { response } = await handler.handle(request, {
      prefix,
      context: {
        headers: request.headers,
      },
    })

    return response ?? new Response('Not found', { status: 404 })
  }
}
