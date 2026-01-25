import { UserDetailScreen } from 'app/features/user/detail-screen'
import { cacheTag } from 'next/cache'
import { headers } from 'next/headers'
import { router } from 'api/backend/router'
import { Suspense } from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const headersList = await headers()
  const token = headersList.get('Authorization')
  const { userId } = await params

  const user = await getUser({ userId, token })

  return (
    <Suspense>
      <UserDetailScreen initialData={{ user }} />
    </Suspense>
  )
}

async function getUser({
  userId,
  token,
}: {
  userId: string
  token: string | null
}) {
  'use cache'
  cacheTag('users', userId)
  const headers = new Headers()
  headers.set('Authorization', `Bearer ${token}`)
  return router.user.find.callable({
    context: { headers },
  })({ id: userId })
}
