import type { EthereumAuthProvider, SelfID } from '@self.id/web'
import type { DehydratedState } from 'react-query'

import type { Abortable } from './utils'

export type ViewerConnectionState =
  | { status: 'idle' }
  | {
      status: 'connecting'
      provider: EthereumAuthProvider
      promise: Abortable<SelfID | null>
    }
  | { status: 'connected'; selfID: SelfID }
  | { status: 'failed'; error: Error }

export type RequestState = {
  hydrate?: DehydratedState
  viewerID?: string | null
}
