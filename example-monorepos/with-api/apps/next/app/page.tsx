import { HomeScreen } from 'app/features/home/screen'
import { PrefetchBoundary } from 'app/provider/query/prefetch'
import { getQueryClient } from 'app/provider/query/query-client'
import { rpc } from 'api/frontend/react-query'
import { link } from 'api/frontend/link'

export default function Home() {
  const client = getQueryClient()

  client.prefetchQuery(rpc.user.list({ limit: 10 }))

  return (
    <PrefetchBoundary client={client}>
      <HomeScreen />
    </PrefetchBoundary>
  )
}
