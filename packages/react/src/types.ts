import type { EthereumAuthProvider, SelfID } from '@self.id/web'
import type { DehydratedState } from 'react-query'

import type { Abortable } from './utils'

export type AuthenticationState =
  | { status: 'pending' }
  | {
      status: 'authenticating'
      provider: EthereumAuthProvider
      promise: Abortable<SelfID | null>
    }
  | { status: 'authenticated'; selfID: SelfID }
  | { status: 'error'; error: Error }

export type RequestState = {
  hydrate?: DehydratedState
  viewerID?: string | null
}
