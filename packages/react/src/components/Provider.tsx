import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import type { WebClientParams } from '@self.id/web'
import { Provider as StateProvider } from 'jotai'
import React from 'react'
import type { ReactNode } from 'react'
import { Hydrate, QueryClient, QueryClientProvider, type QueryObserverOptions } from 'react-query'

import { ReactClient } from '../client.js'
import { DEFAULT_CLIENT_CONFIG, clientAtom, requestViewerIDAtom, stateScope } from '../state.js'
import type { RequestState } from '../types.js'

/** @internal */
const DEFAULT_QUERY_OPTIONS: QueryObserverOptions = {
  staleTime: Infinity,
  refetchOnWindowFocus: false,
}

export type ProviderProps<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  children: ReactNode
  /**
   * An instance of {@linkcode ReactClient} or
   * {@linkcode web.WebClientParams client configuration parameters}.
   */
  client?: ReactClient<ModelTypes> | WebClientParams<ModelTypes>
  /**
   * Custom options for the internal
   * {@link https://react-query.tanstack.com/ react-query} configuration.
   */
  queryOptions?: QueryObserverOptions
  /** {@linkcode RequestState} emitted by a {@linkcode RequestClient} instance. */
  state?: RequestState
}

/** Top-level provider component for using Self.ID's React APIs. */
export function Provider<ModelTypes extends ModelTypeAliases = CoreModelTypes>(
  props: ProviderProps<ModelTypes>
): JSX.Element {
  const { children, client, queryOptions, state } = props

  const reactClient =
    client instanceof ReactClient ? client : new ReactClient(client ?? DEFAULT_CLIENT_CONFIG)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: queryOptions ? { ...DEFAULT_QUERY_OPTIONS, ...queryOptions } : DEFAULT_QUERY_OPTIONS,
    },
  })

  return (
    <StateProvider
      initialValues={[
        [clientAtom, reactClient],
        [requestViewerIDAtom, state?.viewerID ?? null],
      ]}
      scope={stateScope}>
      {/* @ts-ignore typedef missing children prop */}
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore typedef missing children prop */}
        <Hydrate state={state?.hydrate}>{children}</Hydrate>
      </QueryClientProvider>
    </StateProvider>
  )
}
