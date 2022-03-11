import type { DefinitionContentType } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'

import type { ModelTypes as CoreModelTypes } from './__generated__/model.js'
import type { Core } from './core.js'

export type PublicIDParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  /** {@linkcode Core} instance to use. */
  core: Core<ModelTypes>
  /** DID string. */
  id: string
}

/**
 * A PublicID instance provides a client associated to a specific DID.
 *
 * It is exported by the {@linkcode core} module.
 *
 * ```sh
 * import { PublicID } from '@self.id/core'
 * ```
 */
export class PublicID<
  ModelTypes extends ModelTypeAliases = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> {
  #core: Core<ModelTypes, Alias>
  #id: string

  constructor(params: PublicIDParams<ModelTypes>) {
    this.#core = params.core
    this.#id = params.id
  }

  /** DID string associated to the PublicID instance. */
  get id(): string {
    return this.#id
  }

  /** Load the record contents for a given definition alias. */
  async get<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key
  ): Promise<ContentType | null> {
    return await this.#core.dataStore.get(key, this.#id)
  }
}
