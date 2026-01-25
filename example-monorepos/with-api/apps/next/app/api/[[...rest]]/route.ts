import { getRequestHandler } from 'api/backend/handle-nextjs-request'
import { ORPC_PATHNAME } from 'api/shared/constants'

const handler = getRequestHandler({ prefix: ORPC_PATHNAME })

export const GET = handler
export const HEAD = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
