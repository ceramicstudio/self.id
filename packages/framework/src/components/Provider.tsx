import { Provider as MultiAuthProvider } from '@self.id/multiauth'
import type { MultiAuthProviderConfig } from '@self.id/multiauth'
import { Provider as ReactProvider } from '@self.id/react'
import type { ProviderProps as ReactProviderProps } from '@self.id/react'
import { Provider as UIProvider } from '@self.id/ui'
import type { ProviderProps as UIProviderProps } from '@self.id/ui'
import React from 'react'

export type ProviderProps = ReactProviderProps & {
  auth?: MultiAuthProviderConfig
  ui?: UIProviderProps
}

export function Provider(props: ProviderProps): JSX.Element {
  const { auth, children, ui, ...reactProps } = props
  const authProps = auth ?? {}
  const uiProps = ui ?? {}

  return (
    <UIProvider {...uiProps}>
      <ReactProvider {...reactProps}>
        <MultiAuthProvider {...authProps}>{children}</MultiAuthProvider>
      </ReactProvider>
    </UIProvider>
  )
}
