import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import Ceramic from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import type { DefinitionContentType } from '@glazed/did-datastore'
import { Resolver } from 'did-resolver'
import KeyDidResolver from 'key-did-resolver'

import { model as coreModel } from './__generated__/model'
import { getConfig } from './config'
import type { AppNetwork, ConfigURLs, CoreModelTypes } from './types'
import { isCAIP10string } from './utils'

export type CoreParams<ModelTypes extends CoreModelTypes = CoreModelTypes> = {
  network: AppNetwork
  model?: ModelTypes
}

export class Core<
  ModelTypes extends CoreModelTypes = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> {
  #ceramic: Ceramic
  #config: ConfigURLs
  #dataModel: DataModel<ModelTypes>
  #dataStore: DIDDataStore<ModelTypes>
  #resolver: Resolver

  constructor(params: CoreParams<ModelTypes>) {
    this.#config = Object.freeze(getConfig(params.network))
    this.#ceramic = new Ceramic(this.#config.ceramic)
    this.#dataModel = new DataModel<ModelTypes>({
      autopin: true,
      ceramic: this.#ceramic,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore model type
      model: params.model ?? coreModel,
    })
    this.#dataStore = new DIDDataStore<ModelTypes>({
      autopin: true,
      ceramic: this.#ceramic,
      model: this.#dataModel,
    })
    this.#resolver = new Resolver({
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(this.#ceramic),
    })
  }

  get ceramic(): Ceramic {
    return this.#ceramic
  }

  get config(): ConfigURLs {
    return this.#config
  }

  get dataModel(): DataModel<ModelTypes> {
    return this.#dataModel
  }

  get dataStore(): DIDDataStore<ModelTypes> {
    return this.#dataStore
  }

  get resolver(): Resolver {
    return this.#resolver
  }

  async getAccountDID(account: string): Promise<string> {
    const link = await Caip10Link.fromAccount(this.#ceramic, account)
    if (link.did == null) {
      throw new Error(`No DID found for ${account}`)
    }
    return link.did
  }

  async toDID(accountOrDID: string): Promise<string> {
    return isCAIP10string(accountOrDID) ? await this.getAccountDID(accountOrDID) : accountOrDID
  }

  async get<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    id: string,
    key: Key
  ): Promise<ContentType | null> {
    const did = await this.toDID(id)
    return await this.#dataStore.get(key, did)
  }
}
