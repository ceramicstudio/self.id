import type { EthereumAuthProvider, SelfID } from '@self.id/web'

import type { CancellablePromise } from './utils'

export type AuthenticationState =
  | { status: 'pending' }
  | {
      status: 'authenticating'
      provider: EthereumAuthProvider
      promise: CancellablePromise<SelfID | null>
    }
  | { status: 'authenticated'; selfID: SelfID }
  | { status: 'error'; error: Error }
