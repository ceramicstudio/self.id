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

import { aliases as coreAliases } from './__generated__/model.js'
import type { CeramicNetwork, CoreModelTypes } from './types.js'
import { isCAIP10string, isDIDstring } from './utils.js'

/** @internal */
export const CERAMIC_URLS: Record<CeramicNetwork, string> = {
  local: 'http://localhost:7007',
  'mainnet-gateway': 'https://gateway.ceramic.network',
  'testnet-clay': 'https://ceramic-clay.3boxlabs.com',
  'testnet-clay-gateway': 'https://gateway-clay.ceramic.network',
}

export type CoreParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> = {
  aliases?: ModelTypesToAliases<ModelTypes>
  cache?: TileCache | boolean
  ceramic: CeramicNetwork | string
  loader?: TileLoader
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
  // Make internal CeramicClient instance writable for tests
  _ceramic: CeramicClient
  #dataModel: DataModel<ModelTypes>
  // Make internal DIDDataStore instance writable for tests
  _dataStore: DIDDataStore<ModelTypes>
  #resolver: Resolver
  #tileLoader: TileLoader

  constructor(params: CoreParams<ModelTypes>) {
    const ceramic = new CeramicClient(
      CERAMIC_URLS[params.ceramic as CeramicNetwork] ?? params.ceramic
    )
    const loader = params.loader ?? new TileLoader({ ceramic, cache: params.cache })

    this._ceramic = ceramic
    this.#dataModel = new DataModel<ModelTypes>({
      loader,
      aliases: params.aliases ?? (coreAliases as ModelTypesToAliases<ModelTypes>),
    })
    this._dataStore = new DIDDataStore<ModelTypes>({
      ceramic,
      loader,
      model: this.#dataModel,
    })
    this.#resolver = new Resolver({ ...getKeyResolver(), ...get3IDResolver(this._ceramic) })
    this.#tileLoader = loader
  }

  get ceramic(): CeramicClient {
    return this._ceramic
  }

  get dataModel(): DataModel<ModelTypes> {
    return this.#dataModel
  }

  get dataStore(): DIDDataStore<ModelTypes> {
    return this._dataStore
  }

  get resolver(): Resolver {
    return this.#resolver
  }

  get tileLoader(): TileLoader {
    return this.#tileLoader
  }

  async getAccountDID(account: string): Promise<string> {
    const link = await Caip10Link.fromAccount(this._ceramic, account)
    if (link.did == null) {
      throw new Error(`No DID found for ${account}`)
    }
    return link.did
  }

  async toDID(accountOrDID: string): Promise<string> {
    if (isDIDstring(accountOrDID)) {
      return accountOrDID
    }
    return isCAIP10string(accountOrDID) ? await this.getAccountDID(accountOrDID) : accountOrDID
  }

  async get<Key extends Alias, ContentType = DefinitionContentType<ModelTypes, Key>>(
    key: Key,
    id: string
  ): Promise<ContentType | null> {
    const did = await this.toDID(id)
    return await this._dataStore.get(key, did)
  }
}
