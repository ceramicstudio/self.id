import type { WebClientParams } from '@self.id/web'
import { Grommet } from 'grommet'
import type { GrommetExtendedProps } from 'grommet'
import { Provider as StateProvider } from 'jotai'
import React from 'react'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { clientConfigAtom } from '../state'
import { theme } from '../theme'

const queryClient = new QueryClient()

export type RootProviderConfig = {
  client?: WebClientParams
  ui?: GrommetExtendedProps
}

export type RootProviderProps = RootProviderConfig & { children: ReactNode }

export function RootProvider({ children, client, ui }: RootProviderProps): JSX.Element {
  const uiProps = ui ?? {}
  return (
    <Grommet theme={theme} {...uiProps}>
      <StateProvider initialValues={[[clientConfigAtom, client]]}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </StateProvider>
    </Grommet>
  )
}
