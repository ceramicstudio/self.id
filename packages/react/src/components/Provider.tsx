import type { WebClientParams } from '@self.id/web'
import { Provider as StateProvider } from 'jotai'
import React, { useState } from 'react'
import type { ReactNode } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import type { QueryObserverOptions } from 'react-query'

import { DEFAULT_CLIENT_CONFIG, clientConfigAtom, requestViewerIDAtom, stateScope } from '../state'
import type { RequestState } from '../types'

/** @internal */
const DEFAULT_QUERY_OPTIONS: QueryObserverOptions = {
  staleTime: Infinity,
  refetchOnWindowFocus: false,
}

export type ProviderConfig = {
  client?: WebClientParams
  queryOptions?: QueryObserverOptions
  state?: RequestState
}

export type ProviderProps = ProviderConfig & { children: ReactNode }

export function Provider({ children, client, queryOptions, state }: ProviderProps): JSX.Element {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: queryOptions
          ? { ...DEFAULT_QUERY_OPTIONS, ...queryOptions }
          : DEFAULT_QUERY_OPTIONS,
      },
    })
  })

  return (
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
  )
}
