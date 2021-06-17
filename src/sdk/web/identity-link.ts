import type { AlsoKnownAsAccount } from '@ceramicstudio/idx-constants'
import type { DagJWS } from 'dids'

import { GITHUB_HOST, TWITTER_HOST } from '../constants'

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
    challengeCode: string
  }
}

export class IdentityLink {
  _url: string

  constructor(url: string) {
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
    const res = await this._post<ChallengeResponse>('/api/v0/request-github', { did, username })
    return res.data.challengeCode
  }

  async confirmGitHub(jws: DagJWS): Promise<string> {
    const res = await this._post<AttestationResponse>('/api/v0/confirm-github', { jws })
    return res.data.attestation
  }

  async requestTwitter(did: string, username: string): Promise<string> {
    const res = await this._post<ChallengeResponse>('/api/v0/request-twitter', { did, username })
    return res.data.challengeCode
  }

  async confirmTwitter(jws: DagJWS): Promise<string> {
    const res = await this._post<AttestationResponse>('/api/v0/confirm-twitter', { jws })
    return res.data.attestation
  }
}
