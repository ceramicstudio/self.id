import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import type { WebClientParams } from '@self.id/web'
import { Provider as StateProvider } from 'jotai'
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

export type ProviderConfig<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  client?: ReactClient<ModelTypes> | WebClientParams<ModelTypes>
  queryOptions?: QueryObserverOptions
  state?: RequestState
}

export type ProviderProps<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  ProviderConfig<ModelTypes> & { children: ReactNode }

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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={state?.hydrate}>{children}</Hydrate>
      </QueryClientProvider>
    </StateProvider>
  )
}
