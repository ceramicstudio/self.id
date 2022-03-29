import type { EthereumAuthProvider } from '@3id/connect'
import type { StreamID } from '@ceramicnetwork/streamid'
import type { DefinitionContentType } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import type { DID } from 'dids'

import { WebClient } from './client.js'
import type { WebClientParams } from './client.js'

export type AuthenticateParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  WebClientParams<ModelTypes> & {
    /** Authentication provider. */
    authProvider: EthereumAuthProvider
  }

export type SelfIDParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  /** {@linkcode WebClient} instance to use. It must have an authenticated DID attached to it. */
  client: WebClient<ModelTypes>
}

/**
 * A SelfID instance provides a client for an authenticated DID. Beyond loading records, it also
 * allows to mutate them.
 *
 * It is exported by the {@linkcode web} module.
 *
 * ```sh
 * import { SelfID } from '@self.id/web'
 * ```
 */
export class SelfID<
  ModelTypes extends ModelTypeAliases = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> {
  /** Create a SelfID instance by authenticating using the given provider. */
  static async authenticate<ModelTypes extends ModelTypeAliases = CoreModelTypes>(
    params: AuthenticateParams<ModelTypes>
  ): Promise<SelfID<ModelTypes>> {
    const { authProvider, ...clientParams } = params
    const client = new WebClient(clientParams)
    await client.authenticate(authProvider, true)
    return new SelfID({ client })
  }

  #client: WebClient<ModelTypes>

  constructor(params: SelfIDParams<ModelTypes>) {
    if (!params.client.ceramic.did?.authenticated) {
      throw new Error(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )
    }
    this.#client = params.client
  }

  /** WebClient instance used internally. */
  get client(): WebClient<ModelTypes> {
    return this.#client
  }

  /** DID instance used internally. */
  get did(): DID {
    const did = this.#client.ceramic.did
    if (did == null || !did.authenticated) {
      throw new Error('Expected authenticated DID instance to be attached to Ceramic')
    }
    return did
  }

  /** DID string associated to the SelfID instance. */
  get id(): string {
    return this.did.id
  }

  // Definitions interactions

  /** Load the record contents for a given definition alias. */
  async get<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key
  ): Promise<ContentType | null> {
    return await this.#client.dataStore.get(key as any, this.did.id)
  }

  /**
   * Set the record contents for a given definition alias.
   *
   * ⚠️ Using this method will **replace any existing content**. If you only want to write some
   * fields and leave existing ones unchanged, you can use the {@linkcode merge} method instead.
   */
  async set<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key,
    content: ContentType
  ): Promise<StreamID> {
    return await this.#client.dataStore.set(key as any, content)
  }

  /**
   * Merge the record contents for a given definition alias. If no content exists, the record will
   * be created.
   *
   * ⚠️ This method only performs a shallow (one level) merge using {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign Object.assign}.
   * For a deep merge or a specific merging strategy, you will need to implement custom logic.
   */
  async merge<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key,
    content: ContentType
  ): Promise<StreamID> {
    return await this.#client.dataStore.merge(key as any, content)
  }
}
