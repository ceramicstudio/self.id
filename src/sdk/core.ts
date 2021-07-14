import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import type { AlsoKnownAs, BasicProfile } from '@ceramicstudio/idx-constants'
import { Resolver } from 'did-resolver'
import KeyDidResolver from 'key-did-resolver'

import { getConfig } from './config'
import type { AppNetwork, ConfigURLs } from './config'

export class Core {
  _ceramic: Ceramic
  _config: ConfigURLs
  _idx: IDX
  _resolver: Resolver

  constructor(network: AppNetwork) {
    this._config = Object.freeze(getConfig(network))
    this._ceramic = new Ceramic(this._config.ceramic)
    this._idx = new IDX({ ceramic: this._ceramic })
    this._resolver = new Resolver({
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(this._ceramic),
    })
  }

  get ceramic(): Ceramic {
    return this._ceramic
  }

  get config(): ConfigURLs {
    return this._config
  }

  get idx(): IDX {
    return this._idx
  }

  get resolver(): Resolver {
    return this._resolver
  }

  async getAlsoKnownAs(id: string): Promise<AlsoKnownAs | null> {
    try {
      return await this._idx.get<AlsoKnownAs>('alsoKnownAs', id)
    } catch (err) {
      console.warn('Failed to load AKA accounts', id, err)
      return null
    }
  }

  async getProfile(id: string): Promise<BasicProfile | null> {
    try {
      return await this._idx.get<BasicProfile>('basicProfile', id)
    } catch (err) {
      console.warn('Failed to load profile', id, err)
      return null
    }
  }
}
