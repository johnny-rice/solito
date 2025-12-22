import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { api } from 'api/frontend/link'

export const query = createTanstackQueryUtils(api)
