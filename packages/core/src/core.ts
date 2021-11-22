import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import type { DefinitionContentType } from '@glazed/did-datastore'
import { TileLoader } from '@glazed/tile-loader'
import type { TileCache } from '@glazed/tile-loader'
import type { ModelTypeAliases, ModelTypesToAliases } from '@glazed/types'
import { Resolver } from 'did-resolver'
import { getResolver as getKeyResolver } from 'key-did-resolver'

import { model as coreModel } from './__generated__/model'
import type { CeramicNetwork, CoreModelTypes } from './types'
import { isCAIP10string } from './utils'

export const CERAMIC_URLS: Record<CeramicNetwork, string> = {
  local: 'http://localhost:7007',
  'mainnet-gateway': 'https://gateway.ceramic.network',
  'testnet-clay': 'https://ceramic-clay.3boxlabs.com',
  'testnet-clay-gateway': 'https://gateway-clay.ceramic.network',
}

export type CoreParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  cache?: TileCache | boolean
  ceramic: CeramicNetwork | string
  loader?: TileLoader
  model?: ModelTypesToAliases<ModelTypes>
}

/**
 * ```sh
 * import { Core } from '@self.id/core'
 * ```
 */
export class Core<
  ModelTypes extends ModelTypeAliases = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> {
  #ceramic: CeramicClient
  #dataModel: DataModel<ModelTypes>
  #dataStore: DIDDataStore<ModelTypes>
  #resolver: Resolver
  #tileLoader: TileLoader

  constructor(params: CoreParams<ModelTypes>) {
    const ceramic = new CeramicClient(
      CERAMIC_URLS[params.ceramic as CeramicNetwork] ?? params.ceramic
    )
    const loader = params.loader ?? new TileLoader({ ceramic, cache: params.cache })

    this.#ceramic = ceramic
    this.#dataModel = new DataModel<ModelTypes>({
      autopin: true,
      loader,
      model: params.model ?? (coreModel as ModelTypesToAliases<ModelTypes>),
    })
    this.#dataStore = new DIDDataStore<ModelTypes>({
      autopin: true,
      ceramic,
      loader,
      model: this.#dataModel,
    })
    this.#resolver = new Resolver({ ...getKeyResolver(), ...get3IDResolver(this.#ceramic) })
    this.#tileLoader = loader
  }

  get ceramic(): CeramicClient {
    return this.#ceramic
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

  get tileLoader(): TileLoader {
    return this.#tileLoader
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
    key: Key,
    id: string
  ): Promise<ContentType | null> {
    const did = await this.toDID(id)
    return await this.#dataStore.get(key, did)
  }
}
