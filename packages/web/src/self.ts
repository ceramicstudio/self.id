import type { EthereumAuthProvider } from '@3id/connect'
import { GITHUB_HOST, TWITTER_HOST } from '@self.id/core'
import type { AlsoKnownAsAccount, AppNetwork, BasicProfile, Identifyable } from '@self.id/core'
import { DID } from 'dids'

import { WebClient } from './clients'
import {
  IdentityLink,
  createGitHub,
  createTwitter,
  findGitHub,
  findGitHubIndex,
  findTwitter,
  findTwitterIndex,
} from './identity-link'

export class SelfID implements Identifyable {
  static async authenticate(
    network: AppNetwork,
    authProvider: EthereumAuthProvider
  ): Promise<SelfID> {
    const client = new WebClient(network)
    const did = await client.authenticate(authProvider, true)
    return new SelfID(client, did)
  }

  #client: WebClient
  #did: DID
  #identityLink: IdentityLink

  constructor(client: WebClient, did: DID) {
    if (!did.authenticated) {
      throw new Error(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )
    }
    if (client.config.verificationsServer == null) {
      throw new Error('Missing verifications server URL in config')
    }

    this.#client = client
    this.#did = did
    this.#identityLink = new IdentityLink(client.config.verificationsServer)
  }

  get client(): WebClient {
    return this.#client
  }

  get id() {
    return this.#did.id
  }

  // Definitions interactions

  async getAlsoKnownAs() {
    return await this.#client.getAlsoKnownAs(this.#did.id)
  }

  async getSocialAccounts(): Promise<Array<AlsoKnownAsAccount>> {
    const aka = await this.getAlsoKnownAs()
    return aka?.accounts ?? []
  }

  async setAlsoKnownAsAccounts(accounts: Array<AlsoKnownAsAccount>): Promise<void> {
    await this.#client.dataStore.set('alsoKnownAs', { accounts })
  }

  async getProfile() {
    return await this.#client.getProfile(this.#did.id)
  }

  async setProfile(profile: BasicProfile): Promise<void> {
    await this.#client.dataStore.set('basicProfile', profile)
  }

  // Social accounts verifications

  async getGitHubChallenge(username: string): Promise<string> {
    return await this.#identityLink.requestGitHub(this.#did.id, username)
  }

  async confirmGitHubChallenge(challengeCode: string): Promise<string> {
    const jws = await this.#did.createJWS({ challengeCode })
    return await this.#identityLink.confirmGitHub(jws)
  }

  async addGitHubAttestation(
    username: string,
    challengeCode: string
  ): Promise<Array<AlsoKnownAsAccount>> {
    const [attestation, accounts] = await Promise.all([
      this.confirmGitHubChallenge(challengeCode),
      this.getSocialAccounts(),
    ])
    const existing = findGitHub(accounts, username)
    if (existing == null) {
      accounts.push(createGitHub(username, attestation))
    } else {
      existing.attestations = existing.attestations ?? []
      existing.attestations.push({ 'did-jwt-vc': attestation })
    }
    await this.setAlsoKnownAsAccounts(accounts)
    return accounts
  }

  async removeGitHubAccount(username: string): Promise<Array<AlsoKnownAsAccount>> {
    const accounts = await this.getSocialAccounts()
    const index = findGitHubIndex(accounts, username)
    if (index !== -1) {
      accounts.splice(index, 1)
      await this.setAlsoKnownAsAccounts(accounts)
    }
    return accounts
  }

  async getTwitterChallenge(username: string): Promise<string> {
    return await this.#identityLink.requestTwitter(this.#did.id, username)
  }

  async confirmTwitterChallenge(challengeCode: string): Promise<string> {
    const jws = await this.#did.createJWS({ challengeCode })
    return await this.#identityLink.confirmTwitter(jws)
  }

  async addTwitterAttestation(
    username: string,
    challengeCode: string
  ): Promise<Array<AlsoKnownAsAccount>> {
    const [attestation, accounts] = await Promise.all([
      this.confirmTwitterChallenge(challengeCode),
      this.getSocialAccounts(),
    ])
    const existing = findTwitter(accounts, username)
    if (existing == null) {
      accounts.push(createTwitter(username, attestation))
    } else {
      existing.attestations = existing.attestations ?? []
      existing.attestations.push({ 'did-jwt-vc': attestation })
    }
    await this.setAlsoKnownAsAccounts(accounts)
    return accounts
  }

  async removeTwitterAccount(username: string): Promise<Array<AlsoKnownAsAccount>> {
    const accounts = await this.getSocialAccounts()
    const index = findTwitterIndex(accounts, username)
    if (index !== -1) {
      accounts.splice(index, 1)
      await this.setAlsoKnownAsAccounts(accounts)
    }
    return accounts
  }

  async removeSocialAccount(
    host: string | undefined,
    id: string
  ): Promise<Array<AlsoKnownAsAccount>> {
    switch (host) {
      case GITHUB_HOST:
        return await this.removeGitHubAccount(id)
      case TWITTER_HOST:
        return await this.removeTwitterAccount(id)
      default:
        throw new Error(`Unsupported host: ${host ?? 'undefined'}`)
    }
  }
}
