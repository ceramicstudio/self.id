import type { AlsoKnownAsAccount } from '@self.id/framework'
import type { DagJWS, DID } from 'dids'

import { APP_NETWORK } from './constants'

export const GITHUB_HOST = 'github.com'
export const TWITTER_HOST = 'twitter.com'

export const SERVER_URL =
  APP_NETWORK === 'mainnet'
    ? 'https://verifications.3boxlabs.com'
    : 'https://verifications-clay.3boxlabs.com'

export function createGitHub(username: string, attestation: string): AlsoKnownAsAccount {
  return {
    protocol: 'https',
    host: GITHUB_HOST,
    id: username,
    attestations: [{ 'did-jwt-vc': attestation }],
  }
}

export function findGitHub(
  accounts: Array<AlsoKnownAsAccount>,
  username: string
): AlsoKnownAsAccount | undefined {
  return accounts.find((a) => a.host === GITHUB_HOST && a.id === username)
}
export function findGitHubIndex(accounts: Array<AlsoKnownAsAccount>, username: string): number {
  return accounts.findIndex((a) => a.host === GITHUB_HOST && a.id === username)
}

export function createTwitter(username: string, attestation: string): AlsoKnownAsAccount {
  return {
    protocol: 'https',
    host: TWITTER_HOST,
    id: username,
    attestations: [{ 'did-jwt-vc': attestation }],
  }
}

export function findTwitter(
  accounts: Array<AlsoKnownAsAccount>,
  username: string
): AlsoKnownAsAccount | undefined {
  return accounts.find((a) => a.host === TWITTER_HOST && a.id === username)
}
export function findTwitterIndex(accounts: Array<AlsoKnownAsAccount>, username: string): number {
  return accounts.findIndex((a) => a.host === TWITTER_HOST && a.id === username)
}

export function removeGitHubAccount(
  accounts: Array<AlsoKnownAsAccount>,
  username: string
): Array<AlsoKnownAsAccount> {
  const index = findGitHubIndex(accounts, username)
  if (index !== -1) {
    const cloned = [...accounts]
    cloned.splice(index, 1)
    return cloned
  }
  return accounts
}

export function removeTwitterAccount(
  accounts: Array<AlsoKnownAsAccount>,
  username: string
): Array<AlsoKnownAsAccount> {
  const index = findTwitterIndex(accounts, username)
  if (index !== -1) {
    const cloned = [...accounts]
    cloned.splice(index, 1)
    return cloned
  }
  return accounts
}

export function removeSocialAccount(
  accounts: Array<AlsoKnownAsAccount>,
  host: string | undefined,
  id: string
): Array<AlsoKnownAsAccount> {
  switch (host) {
    case GITHUB_HOST:
      return removeGitHubAccount(accounts, id)
    case TWITTER_HOST:
      return removeTwitterAccount(accounts, id)
    default:
      throw new Error(`Unsupported host: ${host ?? 'undefined'}`)
  }
}

export type AttestationResponse = {
  status: string
  data: {
    attestation: string
  }
}

export type ChallengeResponse = {
  status: string
  data: {
    challengeCode: string
  }
}

export class IdentityLink {
  _url: string

  constructor(url: string = SERVER_URL) {
    this._url = url
  }

  async _post<Data = Record<string, any>, Body = Record<string, any>>(
    endpoint: string,
    body: Body
  ): Promise<Data> {
    const res = await fetch(`${this._url}${endpoint}`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = (await res.json()) as unknown
    if (res.ok) {
      return data as Data
    }
    throw new Error((data as Record<string, any>).message ?? 'Request failed')
  }

  async requestGitHub(did: string, username: string): Promise<string> {
    const res = await this._post<ChallengeResponse>('/api/v0/request-github', {
      did,
      username,
    })
    return res.data.challengeCode
  }

  async confirmGitHub(jws: DagJWS): Promise<string> {
    const res = await this._post<AttestationResponse>('/api/v0/confirm-github', { jws })
    return res.data.attestation
  }

  async confirmGitHubChallenge(did: DID, challengeCode: string): Promise<string> {
    const jws = await did.createJWS({ challengeCode })
    return await this.confirmGitHub(jws)
  }

  async requestTwitter(did: string, username: string): Promise<string> {
    const res = await this._post<ChallengeResponse>('/api/v0/request-twitter', {
      did,
      username,
    })
    return res.data.challengeCode
  }

  async confirmTwitter(jws: DagJWS): Promise<string> {
    const res = await this._post<AttestationResponse>('/api/v0/confirm-twitter', { jws })
    return res.data.attestation
  }

  async confirmTwitterChallenge(did: DID, challengeCode: string): Promise<string> {
    const jws = await did.createJWS({ challengeCode })
    return await this.confirmTwitter(jws)
  }
}
