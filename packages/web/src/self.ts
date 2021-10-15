import type { EthereumAuthProvider } from '@3id/connect'
import type { StreamID } from '@ceramicnetwork/streamid'
import type { DefinitionContentType } from '@glazed/did-datastore'
import type { CoreModelTypes } from '@self.id/core'
import type { DID } from 'dids'

import { WebClient } from './client'
import type { WebClientParams } from './client'

export type AuthenticateParams<ModelTypes extends CoreModelTypes = CoreModelTypes> =
  WebClientParams<ModelTypes> & { authProvider: EthereumAuthProvider }

export type SelfIDParams = {
  client: WebClient
}

/**
 * ```sh
 * import { SelfID } from '@self.id/web'
 * ```
 */
export class SelfID<
  ModelTypes extends CoreModelTypes = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> {
  static async authenticate<ModelTypes extends CoreModelTypes = CoreModelTypes>(
    params: AuthenticateParams<ModelTypes>
  ): Promise<SelfID> {
    const { authProvider, ...clientParams } = params
    const client = new WebClient<ModelTypes>(clientParams)
    await client.authenticate(authProvider, true)
    return new SelfID({ client })
  }

  #client: WebClient

  constructor(params: SelfIDParams) {
    if (!params.client.ceramic.did?.authenticated) {
      throw new Error(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )
    }
    this.#client = params.client
  }

  get client(): WebClient {
    return this.#client
  }

  get did(): DID {
    const did = this.#client.ceramic.did
    if (did == null || !did.authenticated) {
      throw new Error('Expected authenticated DID instance to be attached to Ceramic')
    }
    return did
  }

  get id(): string {
    return this.did.id
  }

  // Definitions interactions

  async get<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key
  ): Promise<ContentType | null> {
    return await this.#client.dataStore.get(key as any, this.did.id)
  }

  async set<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key,
    content: ContentType
  ): Promise<StreamID> {
    return await this.#client.dataStore.set(key as any, content)
  }
}
