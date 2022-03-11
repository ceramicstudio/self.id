import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import type { EthereumAuthProvider, SelfID } from '@self.id/web'
import type { DehydratedState } from 'react-query'

import type { Abortable } from './utils.js'

/**
 * The viewer connection can be in one of the following states, identified by `status`:
 *
 * - `idle`: no connection has been attempted.
 * - `connecting`: attempting to connect using the attached `provider`. The attached `promise` can
 * be used to track the connection attempt.
 * - `connected`: successfully connected with the attached {@linkcode web.SelfID selfID}.
 * - `failed`: connection attempted failed with the attached `error`.
 */
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
  /** Serialized records to hydrate. */
  hydrate?: DehydratedState
  /** Viewer ID extracted from cookie value. */
  viewerID?: string | null
}
