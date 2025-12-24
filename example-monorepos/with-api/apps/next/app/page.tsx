import { query } from 'api/frontend/react-query'
import { HomeScreen } from 'app/features/home/screen'
import { PrefetchBoundary } from 'app/provider/query/prefetch'
import { getQueryClient } from 'app/provider/query/query-client'

export default async function Home() {
  const client = getQueryClient()

  // kick off the request on the server
  // without awaiting it!
  await client.prefetchQuery(
    query.user.list.queryOptions({ input: { limit: 10 } })
  )

  return (
    // PrefetchBoundary streams the response to the client
    <PrefetchBoundary client={client}>
      <HomeScreen />
    </PrefetchBoundary>
  )
}
