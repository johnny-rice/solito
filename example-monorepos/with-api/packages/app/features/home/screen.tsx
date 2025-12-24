'use client'

import { Link } from 'solito/link'
import { Text, View } from 'react-native'
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
      }}
    >
      <View style={{ gap: 16 }}>
        {data?.map((user) => (
          <Link
            href={`/users/${user.id}`}
            key={user.id}
            style={{ flexDirection: 'row', gap: 16 }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                {user.name}
              </Text>
            </View>
          </Link>
        ))}
      </View>
    </View>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <Text style={{ fontWeight: '800', fontSize: 24 }}>{children}</Text>
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <Text style={{ textAlign: 'center' }}>{children}</Text>
}
