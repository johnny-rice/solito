import { query } from 'api/frontend/react-query'
import { HomeScreen } from 'app/features/home/screen'
import { PrefetchBoundary } from 'app/provider/query/prefetch'
import { getQueryClient } from 'app/provider/query/query-client'

export default function Home() {
  const client = getQueryClient()

  client.prefetchQuery(query.user.list.queryOptions({ input: { limit: 10 } }))

  return (
    <PrefetchBoundary client={client}>
      <HomeScreen />
    </PrefetchBoundary>
  )
}
