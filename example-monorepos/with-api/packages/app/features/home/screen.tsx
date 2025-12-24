'use client'

import { Link } from 'solito/link'
import { Text, TextStyle, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { query } from 'api/frontend/react-query'

export function HomeScreen() {
  const { data } = useQuery(
    query.user.list.queryOptions({ input: { limit: 10 } })
  )

  return (
    <View
      style={{
        padding: 16,
        gap: 32,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={{ gap: 16 }}>
        <P>Solito API Example</P>
        {data?.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <P style={{ textDecorationLine: 'underline' }}>{user.name}</P>
          </Link>
        ))}
      </View>
    </View>
  )
}

function P({
  children,
  style,
}: {
  children: React.ReactNode
  style?: TextStyle
}) {
  return (
    <Text style={[{ fontSize: 15, fontWeight: 'bold' }, style]}>
      {children}
    </Text>
  )
}
