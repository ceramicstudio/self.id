import type { AppProps as NextAppProps } from 'next/app'
import React from 'react'

import { Provider } from './Provider'
import type { ProviderConfig, RequestState } from './Provider'

export type AppProps = NextAppProps & ProviderConfig

export function App({ Component, pageProps, ...config }: AppProps): JSX.Element {
  // State can be injected by page props rather than config
  const state = ((pageProps as Record<string, unknown>).state as RequestState) ?? config.state

  return (
    <Provider {...config} state={state}>
      <Component {...pageProps} />
    </Provider>
  )
}
