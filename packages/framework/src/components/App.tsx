import type { AppProps as NextAppProps } from 'next/app'
import React from 'react'

import { RootProvider } from './RootProvider'
import type { RootProviderConfig } from './RootProvider'

export type AppProps = NextAppProps & RootProviderConfig

export function App({ Component, pageProps, ...config }: AppProps): JSX.Element {
  return (
    <RootProvider {...config}>
      <Component {...pageProps} />
    </RootProvider>
  )
}
