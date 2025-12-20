import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { api } from 'api/frontend/link'

export const rpc = createTanstackQueryUtils(api)
