import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import type { EthereumAuthProvider, SelfID } from '@self.id/web'
import type { DehydratedState } from 'react-query'

import type { Abortable } from './utils'

export type ViewerConnectionState<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  | { status: 'idle' }
  | {
      status: 'connecting'
      provider: EthereumAuthProvider
      promise: Abortable<SelfID<ModelTypes> | null>
    }
  | { status: 'connected'; selfID: SelfID<ModelTypes> }
  | { status: 'failed'; error: Error }

export type RequestState = {
  hydrate?: DehydratedState
  viewerID?: string | null
}
