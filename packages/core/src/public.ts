import type { DefinitionContentType } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'

import type { ModelTypes as CoreModelTypes } from './__generated__/model'
import type { Core } from './core'

export type PublicIDParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  core: Core<ModelTypes>
  id: string
}

/**
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

  get id(): string {
    return this.#id
  }

  async get<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key
  ): Promise<ContentType | null> {
    return await this.#core.dataStore.get(key, this.#id)
  }
}
