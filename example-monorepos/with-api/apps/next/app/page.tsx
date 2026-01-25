import { router } from 'api/backend/router'
import { HomeScreen } from 'app/features/home/screen'
import { cacheTag } from 'next/cache'
import { headers } from 'next/headers'
import { Suspense } from 'react'

export default async function Home() {
  const headersList = await headers()
  const token = headersList.get('Authorization')

  const users = await getUsers({ token })

  return (
    <Suspense>
      <HomeScreen initialData={{ users }} />
    </Suspense>
  )
}

async function getUsers({ token }: { token: string | null }) {
  'use cache'
  cacheTag('users')
  const headers = new Headers()
  headers.set('Authorization', `Bearer ${token}`)
  return router.user.list.callable({ context: { headers } })()
}
