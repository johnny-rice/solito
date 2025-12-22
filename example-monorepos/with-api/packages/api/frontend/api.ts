import { createORPCClient } from '@orpc/client'
import { link } from 'api/frontend/link'
import type { router } from 'api/backend/router'
import type { RouterClient } from '@orpc/server'

export const api: RouterClient<typeof router> = createORPCClient(link)
