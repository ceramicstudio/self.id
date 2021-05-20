import { ThreeIdConnect } from '@3id/connect'
import type { EthereumAuthProvider } from '@3id/connect'
import { DID } from 'dids'

import type { CeramicNetwork } from './config'
import { Core } from './core'

export class WebClient extends Core {
  _threeId: ThreeIdConnect

  constructor(network: CeramicNetwork) {
    super(network)
    this._threeId = new ThreeIdConnect(this._config.connect, this._config.management)
  }

  get threeId(): ThreeIdConnect {
    return this._threeId
  }

  async authenticate(authProvider: EthereumAuthProvider): Promise<DID> {
    const did = await this.connect(authProvider)
    await did.authenticate()
    return did
  }

  async connect(authProvider: EthereumAuthProvider): Promise<DID> {
    await this._threeId.connect(authProvider)
    return new DID({ provider: this._threeId.getDidProvider(), resolver: this.resolver })
  }
}
