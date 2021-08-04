import { ThreeIdConnect } from '@3id/connect'
import type { EthereumAuthProvider } from '@3id/connect'
import { Core } from '@self.id/core'
import type { CoreModelTypes, CoreParams } from '@self.id/core'
import { DID } from 'dids'

export class WebClient<ModelTypes extends CoreModelTypes = CoreModelTypes> extends Core<ModelTypes> {
  #threeId: ThreeIdConnect

  constructor(params: CoreParams<ModelTypes>) {
    super(params)
    this.#threeId = new ThreeIdConnect(this.config.connectNetwork)
  }

  get threeId(): ThreeIdConnect {
    return this.#threeId
  }

  async authenticate(authProvider: EthereumAuthProvider, attachToCeramic = false): Promise<DID> {
    const did = await this.connect(authProvider)
    await did.authenticate()
    if (attachToCeramic) {
      this.ceramic.did = did
    }
    return did
  }

  async connect(authProvider: EthereumAuthProvider): Promise<DID> {
    await this.#threeId.connect(authProvider)
    return new DID({
      provider: this.#threeId.getDidProvider(),
      resolver: this.resolver,
    })
  }
}
