import type { EthereumAuthProvider } from '@3id/connect'
import type { AlsoKnownAsAccount, BasicProfile } from '@ceramicstudio/idx-constants'
import { DID } from 'dids'

import { WebClient } from './clients'
import type { CeramicNetwork } from '../config'
import {
  IdentityLink,
  createGitHub,
  createTwitter,
  findGitHub,
  findGitHubIndex,
  findTwitter,
  findTwitterIndex,
} from './identity-link'
import type { Identifyable } from '../types'

export class SelfID implements Identifyable {
  static async authenticate(
    network: CeramicNetwork,
    authProvider: EthereumAuthProvider
  ): Promise<SelfID> {
    const client = new WebClient(network)
    const did = await client.authenticate(authProvider, true)
    return new SelfID(client, did)
  }

  _client: WebClient
  _did: DID
  _identityLink: IdentityLink

  constructor(client: WebClient, did: DID) {
    if (!did.authenticated) {
      throw new Error(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )
    }

    this._client = client
    this._did = did
    this._identityLink = new IdentityLink()
  }

  get client(): WebClient {
    return this._client
  }

  get id() {
    return this._did.id
  }

  // Definitions interactions

  async getAlsoKnownAs() {
    return await this._client.getAlsoKnownAs(this._did.id)
  }

  async getSocialAccounts(): Promise<Array<AlsoKnownAsAccount>> {
    const aka = await this.getAlsoKnownAs()
    return aka?.accounts ?? []
  }

  async setAlsoKnownAsAccounts(accounts: Array<AlsoKnownAsAccount>): Promise<void> {
    await this._client.idx.set('alsoKnownAs', { accounts })
  }

  async getProfile() {
    return await this._client.getProfile(this._did.id)
  }

  async setProfile(profile: BasicProfile): Promise<void> {
    await this._client.idx.set('basicProfile', profile)
  }

  // Social accounts verifications

  async getGitHubChallenge(username: string): Promise<string> {
    return await this._identityLink.requestGitHub(this._did.id, username)
  }

  async addGitHubAttestation(username: string, jws: string): Promise<string> {
    const [attestation, accounts] = await Promise.all([
      this._identityLink.confirmGitHub(jws),
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
    return attestation
  }

  async removeGitHubAccount(username: string): Promise<boolean> {
    const accounts = await this.getSocialAccounts()
    const index = findGitHubIndex(accounts, username)
    if (index === -1) {
      return false
    }
    accounts.splice(index, 1)
    await this.setAlsoKnownAsAccounts(accounts)
    return true
  }

  async getTwitterChallenge(username: string): Promise<string> {
    return await this._identityLink.requestTwitter(this._did.id, username)
  }

  async addTwitterAttestation(username: string, jws: string): Promise<string> {
    const [attestation, accounts] = await Promise.all([
      this._identityLink.confirmTwitter(jws),
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
    return attestation
  }

  async removeTwitterAccount(username: string): Promise<boolean> {
    const accounts = await this.getSocialAccounts()
    const index = findTwitterIndex(accounts, username)
    if (index === -1) {
      return false
    }
    accounts.splice(index, 1)
    await this.setAlsoKnownAsAccounts(accounts)
    return true
  }
}
