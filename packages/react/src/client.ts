import type { ModelTypeAliases } from '@glazed/types'
import { Core, type CoreModelTypes } from '@self.id/core'
import type { EthereumAuthProvider, SelfID, WebClientParams } from '@self.id/web'

export class ReactClient<
  ModelTypes extends ModelTypeAliases = CoreModelTypes
> extends Core<ModelTypes> {
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
