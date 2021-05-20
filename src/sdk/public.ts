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

  async getProfile() {
    return await this._core.getProfile(this._id)
  }
}
