import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { rpc } from 'api/frontend/rpc'

export const query = createTanstackQueryUtils(rpc)
