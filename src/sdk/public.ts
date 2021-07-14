import type { Core } from './core'
import type { Identifyable } from './types'

export class PublicID implements Identifyable {
  _core: Core
  _id: string

  constructor(core: Core, id: string) {
    this._core = core
    this._id = id
  }

  get id() {
    return this._id
  }

  async getAlsoKnownAs() {
    return await this._core.getAlsoKnownAs(this._id)
  }

  async getSocialAccounts() {
    const aka = await this.getAlsoKnownAs()
    return aka?.accounts ?? []
  }

  async getProfile() {
    return await this._core.getProfile(this._id)
  }
}
