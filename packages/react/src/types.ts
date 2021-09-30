import type { EthereumAuthProvider, SelfID } from '@self.id/web'

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
