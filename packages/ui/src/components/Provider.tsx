import { Grommet } from 'grommet'
import type { GrommetExtendedProps } from 'grommet'
import React from 'react'

import { theme } from '../theme'

export type ProviderProps = GrommetExtendedProps

export function Provider(props: ProviderProps): JSX.Element {
  return <Grommet theme={theme} {...props} />
}
