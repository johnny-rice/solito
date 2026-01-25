import { SafeArea } from 'app/provider/safe-area'
import { NavigationProvider } from './navigation'
import { QueryProvider } from './query/provider'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <NavigationProvider>
        <QueryProvider>{children}</QueryProvider>
      </NavigationProvider>
    </SafeArea>
  )
}
