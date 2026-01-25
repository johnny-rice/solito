import {
  dehydrate,
  type FetchQueryOptions,
  HydrationBoundary,
} from '@tanstack/react-query'
import { getQueryClient } from 'app/provider/query/query-client'
import type { ReactNode } from 'react'

export function PrefetchBoundary({
  children,
  client,
}: {
  children: ReactNode
  client: ReturnType<typeof getQueryClient>
}) {
  return (
    <HydrationBoundary state={dehydrate(client)}>{children}</HydrationBoundary>
  )
}

export function prefetchQuery(props: FetchQueryOptions) {
  const queryClient = getQueryClient()
  const prefetchPromise = queryClient.prefetchQuery(props)

  return { queryClient, prefetchPromise }
}
