import { ThreeIdConnect } from '@3id/connect'
import type { EthereumAuthProvider } from '@3id/connect'
import { DID } from 'dids'

import type { AppNetwork } from '../config'
import { Core } from '../core'

export class WebClient extends Core {
  _threeId: ThreeIdConnect

  constructor(network: AppNetwork) {
    super(network)
    this._threeId = new ThreeIdConnect(this._config.connectNetwork)
  }

  get threeId(): ThreeIdConnect {
    return this._threeId
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
    await this._threeId.connect(authProvider)
    return new DID({ provider: this._threeId.getDidProvider(), resolver: this.resolver })
  }
}
