import { Provider as BaseProvider } from '@self.id/react'
import type { ProviderProps as BaseProviderProps } from '@self.id/react'
import { Grommet } from 'grommet'
import type { GrommetExtendedProps } from 'grommet'
import React from 'react'

import { theme } from '../theme'

export type ProviderProps = BaseProviderProps & { ui?: GrommetExtendedProps }

export function Provider({ children, ui, ...props }: ProviderProps): JSX.Element {
  const uiProps = ui ?? {}

  return (
    <Grommet theme={theme} {...uiProps}>
      <BaseProvider {...props}>{children}</BaseProvider>
    </Grommet>
  )
}
