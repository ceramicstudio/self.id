import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import { Provider as MultiAuthProvider } from '@self.id/multiauth'
import type { MultiAuthProviderConfig } from '@self.id/multiauth'
import { Provider as ReactProvider } from '@self.id/react'
import type { ProviderProps as ReactProviderProps } from '@self.id/react'
import { Provider as UIProvider } from '@self.id/ui'
import type { ProviderProps as UIProviderProps } from '@self.id/ui'
import React from 'react'

export type ProviderProps<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  ReactProviderProps<ModelTypes> & {
    auth?: MultiAuthProviderConfig
    ui?: UIProviderProps
  }

export function Provider<ModelTypes extends ModelTypeAliases = CoreModelTypes>(
  props: ProviderProps<ModelTypes>
): JSX.Element {
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
