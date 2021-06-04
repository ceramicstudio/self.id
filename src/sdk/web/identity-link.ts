import type { AlsoKnownAsAccount } from '@ceramicstudio/idx-constants'

import { IDENTITYLINK_URL } from '../constants'

export const GITHUB_HOST = 'github.com'
export const TWITTER_HOST = 'twitter.com'

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

export type AttestationResponse = {
  status: string
  data: {
    attestation: string
  }
}

export type ChallengeResponse = {
  status: string
  data: {
    challenge: string
  }
}

export class IdentityLink {
  _url: string

  constructor(url = IDENTITYLINK_URL) {
    this._url = url
  }

  async _post<Res = Record<string, any>, Data = Record<string, any>>(
    endpoint: string,
    data: Data
  ): Promise<Res> {
    const res = await fetch(`${this._url}${endpoint}`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (res.ok) {
      return (await res.json()) as Res
    }
    throw new Error('Request failed')
  }

  async requestGitHub(did: string, username: string): Promise<string> {
    const res = await this._post<ChallengeResponse>('/api/v0/request-github', { did, username })
    return res.data.challenge
  }

  async confirmGitHub(jws: string): Promise<string> {
    const res = await this._post<AttestationResponse>('/api/v0/confirm-github', { jws })
    return res.data.attestation
  }

  async requestTwitter(did: string, username: string): Promise<string> {
    const res = await this._post<ChallengeResponse>('/api/v0/request-twitter', { did, username })
    return res.data.challenge
  }

  async confirmTwitter(jws: string): Promise<string> {
    const res = await this._post<AttestationResponse>('/api/v0/confirm-twitter', { jws })
    return res.data.attestation
  }
}
