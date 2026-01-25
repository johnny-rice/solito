'use client'
import { useQuery } from '@tanstack/react-query'
import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'solito/navigation'
import { query } from 'api/frontend/react-query'
import { RouterOut } from 'api/backend/router'
import { useParams } from 'next/navigation'

export function UserDetailScreen({
  initialData,
  ...rest
}: {
  initialData?: { user?: RouterOut['user']['find'] }
}) {
  const router = useRouter()
  const params = useParams<{ userId: string }>()
  // @ts-ignore TODO fix useParams on native
  const id = params?.userId ?? rest.route.params.userId
  const { data } = useQuery(
    query.user.find.queryOptions({
      input: { id: id! },
      enabled: !!id,
      initialData: initialData?.user,
    })
  )

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={() => router.back()}>
        {data && <Text>👈 welcome, {data?.name}! (press me to go back!)</Text>}
      </Pressable>
    </View>
  )
}
