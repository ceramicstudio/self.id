import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import Ceramic from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import { Resolver } from 'did-resolver'
import KeyDidResolver from 'key-did-resolver'

import { model } from './__generated__/model'
import type { ModelTypes } from './__generated__/model'
import { getConfig } from './config'
import type { AppNetwork, ConfigURLs } from './config'
import type { AlsoKnownAs, BasicProfile } from './types'
import { isCAIP10string } from './utils'

export class Core {
  #ceramic: Ceramic
  #config: ConfigURLs
  #dataModel: DataModel<ModelTypes>
  #dataStore: DIDDataStore<ModelTypes>
  #resolver: Resolver

  constructor(network: AppNetwork) {
    this.#config = Object.freeze(getConfig(network))
    this.#ceramic = new Ceramic(this.#config.ceramic)
    this.#dataModel = new DataModel<ModelTypes>({ autopin: true, ceramic: this.#ceramic, model })
    this.#dataStore = new DIDDataStore({
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

  async getAlsoKnownAs(id: string): Promise<AlsoKnownAs | null> {
    try {
      const did = await this.toDID(id)
      return await this.#dataStore.get('alsoKnownAs', did)
    } catch (err) {
      console.warn('Failed to load AKA accounts', id, err)
      return null
    }
  }

  async getProfile(id: string): Promise<BasicProfile | null> {
    try {
      const did = await this.toDID(id)
      return await this.#dataStore.get('basicProfile', did)
    } catch (err) {
      console.warn('Failed to load profile', id, err)
      return null
    }
  }
}
