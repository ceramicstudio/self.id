import { ThreeIdConnect } from '@3id/connect'
import type { EthereumAuthProvider } from '@3id/connect'
import type { AppNetwork } from '@self.id/universal'
import { Core } from '@self.id/universal'
import { DID } from 'dids'

export class WebClient extends Core {
  #threeId: ThreeIdConnect

  constructor(network: AppNetwork) {
    super(network)
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
