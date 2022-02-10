import type { CeramicClient } from '@ceramicnetwork/http-client'
import type { DIDDataStore } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'
import { Core, type CoreModelTypes } from '@self.id/core'
import type { EthereumAuthProvider, SelfID, WebClientParams } from '@self.id/web'

export class ReactClient<
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
  #params: WebClientParams<ModelTypes>

  constructor(params: WebClientParams<ModelTypes>) {
    super(params)
    this.#params = params
  }

  async authenticate(authProvider: EthereumAuthProvider): Promise<SelfID<ModelTypes>> {
    const { SelfID } = await import('@self.id/web')
    const selfID = await SelfID.authenticate<ModelTypes>({ ...this.#params, authProvider })
    // We need to attach the authenticated DID to the client instance to ensure streams can be updated
    this.ceramic.did = selfID.did
    return selfID
  }
}
