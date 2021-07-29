import type { Core } from './core'
import type { AlsoKnownAs, AlsoKnownAsAccount, BasicProfile, Identifyable } from './types'

export class PublicID implements Identifyable {
  #core: Core
  #id: string

  constructor(core: Core, id: string) {
    this.#core = core
    this.#id = id
  }

  get id(): string {
    return this.#id
  }

  async getAlsoKnownAs(): Promise<AlsoKnownAs | null> {
    return await this.#core.getAlsoKnownAs(this.#id)
  }

  async getSocialAccounts(): Promise<Array<AlsoKnownAsAccount>> {
    const aka = await this.getAlsoKnownAs()
    return aka?.accounts ?? []
  }

  async getProfile(): Promise<BasicProfile | null> {
    return await this.#core.getProfile(this.#id)
  }
}
