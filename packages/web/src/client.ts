import { ThreeIdConnect } from '@3id/connect'
import type { EthereumAuthProvider } from '@3id/connect'
import type { CeramicClient } from '@ceramicnetwork/http-client'
import type { DIDDataStore } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'
import { Core } from '@self.id/core'
import type { CoreModelTypes, CoreParams } from '@self.id/core'
import { DID } from 'dids'

export type ConnectNetwork = 'dev-unstable' | 'mainnet' | 'testnet-clay'

export type WebClientParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  CoreParams<ModelTypes> & { connectNetwork?: ConnectNetwork }

/**
 * Extends {@linkcode core.Core}
 *
 * ```sh
 * import { WebClient } from '@self.id/web'
 * ```
 */
export class WebClient<
  ModelTypes extends ModelTypeAliases = CoreModelTypes
> extends Core<ModelTypes> {
  // Internal properties from parent class need to be copied over here an marked as internal
  // to prevent from being displayed in docs
  /** @internal */
  // @ts-ignore initialization in parent class
  _ceramic: CeramicClient
  /** @internal */
  // @ts-ignore initialization in parent class
  _dataStore: DIDDataStore<ModelTypes>
  // Make internal ThreeIdConnect instance writable for tests
  /** @internal */
  _threeId: ThreeIdConnect

  constructor(params: WebClientParams<ModelTypes>) {
    super(params)
    this._threeId = new ThreeIdConnect(params.connectNetwork ?? params.ceramic)
  }

  get threeId(): ThreeIdConnect {
    return this._threeId
  }

  async authenticate(authProvider: EthereumAuthProvider, attachToCeramic = true): Promise<DID> {
    const did = await this.connect(authProvider)
    await did.authenticate()
    if (attachToCeramic) {
      this.ceramic.did = did
    }
    return did
  }

  async connect(authProvider: EthereumAuthProvider): Promise<DID> {
    await this._threeId.connect(authProvider)
    return new DID({
      provider: this._threeId.getDidProvider(),
      resolver: this.resolver,
    })
  }
}
