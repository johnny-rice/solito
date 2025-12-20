import { getRequestHandler } from 'api/backend/handle-request'

const handler = getRequestHandler('/rpc')

export const HEAD = handler
export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
