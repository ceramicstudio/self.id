import { Grommet } from 'grommet'
import type { GrommetExtendedProps } from 'grommet'

import { theme } from '../theme.js'

export type ProviderProps = GrommetExtendedProps

export function Provider(props: ProviderProps): JSX.Element {
  return <Grommet theme={theme} {...props} />
}
