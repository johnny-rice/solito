import { cookies, headers } from 'next/headers'

export const nextjsContext = async () => {
  return {
    headers: await headers(),
    cookies: await cookies(),
  }
}
