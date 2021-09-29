import type { WebClientParams } from '@self.id/web'
import { Grommet } from 'grommet'
import type { GrommetExtendedProps } from 'grommet'
import { Provider as StateProvider } from 'jotai'
import React, { useState } from 'react'
import type { ReactNode } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import type { DehydratedState } from 'react-query'

import { DEFAULT_CLIENT_CONFIG, clientConfigAtom, requestViewerIDAtom, stateScope } from '../state'
import { theme } from '../theme'

const QUERY_CLIENT_OPTIONS = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}

export type RequestState = {
  hydrate?: DehydratedState
  viewerID?: string | null
}

export type ProviderConfig = {
  client?: WebClientParams
  ui?: GrommetExtendedProps
  state?: RequestState
}

export type ProviderProps = ProviderConfig & { children: ReactNode }

export function Provider({ children, client, state, ui }: ProviderProps): JSX.Element {
  const uiProps = ui ?? {}
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_OPTIONS))

  return (
    <Grommet theme={theme} {...uiProps}>
      <StateProvider
        initialValues={[
          [clientConfigAtom, client ?? DEFAULT_CLIENT_CONFIG],
          [requestViewerIDAtom, state?.viewerID ?? null],
        ]}
        scope={stateScope}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={state?.hydrate}>{children}</Hydrate>
        </QueryClientProvider>
      </StateProvider>
    </Grommet>
  )
}
