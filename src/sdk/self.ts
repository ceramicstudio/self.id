import type { EthereumAuthProvider } from '@3id/connect'
import type { BasicProfile } from '@ceramicstudio/idx-constants'
import { DID } from 'dids'

import { WebClient } from './clients'
import type { CeramicNetwork } from './config'
import type { Identifyable } from './types'

export class SelfID implements Identifyable {
  static async authenticate(
    network: CeramicNetwork,
    authProvider: EthereumAuthProvider
  ): Promise<SelfID> {
    const client = new WebClient(network)
    const did = await client.authenticate(authProvider)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await client.ceramic.setDID(did)
    return new SelfID(client, did)
  }

  _client: WebClient
  _did: DID

  constructor(client: WebClient, did: DID) {
    if (!did.authenticated) {
      throw new Error(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )
    }

    this._client = client
    this._did = did
  }

  get client(): WebClient {
    return this._client
  }

  get id() {
    return this._did.id
  }

  async getProfile() {
    return await this._client.getProfile(this._did.id)
  }

  async setProfile(profile: BasicProfile): Promise<void> {
    await this._client.idx.set('basicProfile', profile)
  }
}
