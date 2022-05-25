import type { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { Core } from '@self.id/core'
import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import { DID } from 'dids'
import { DIDSession } from '@glazed/did-session'

/**
 * Extends {@linkcode core.Core}
 *
 * ```sh
 * import { WebClientSession } from '@self.id/web'
 * ```
 */

export class WebClientSession<
  ModelTypes extends ModelTypeAliases = CoreModelTypes
> extends Core<ModelTypes> {
  #session?: DIDSession

  async authenticate(authProvider: EthereumAuthProvider, attachToCeramic = true): Promise<DID> {
    this.#session = new DIDSession({ authProvider })
    const did = await this.#session.authorize()
    if (attachToCeramic) {
      this.ceramic.did = did
    }
    return did
  }
}
