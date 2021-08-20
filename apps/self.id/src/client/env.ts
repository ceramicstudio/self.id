import { EthereumAuthProvider } from '@3id/connect'
import type { EthereumProvider } from '@3id/connect'
import type { Account as AlsoKnownAsAccount } from '@datamodels/identity-accounts-web'
import type { BasicProfile } from '@datamodels/identity-profile-basic'
import { PublicID } from '@self.id/core'
import { WebClient } from '@self.id/web'
import type { AccountIDParams } from 'caip'

import { SelfID } from './self'

export type DIDData = {
  profile: BasicProfile | null
  socialAccounts: Array<AlsoKnownAsAccount>
}

export type KnownDID = { accounts: Array<AccountIDParams> }
export type KnownDIDs = Record<string, KnownDID>

export type KnownDIDData = KnownDID & DIDData
export type KnownDIDsData = Record<string, KnownDIDData>

export async function authenticate(
  client: WebClient,
  provider: EthereumProvider,
  address: string
): Promise<SelfID> {
  const authProvider = new EthereumAuthProvider(provider, address)
  const did = await client.authenticate(authProvider, true)
  return new SelfID(client, did)
}

export async function loadDIDData(id: PublicID): Promise<DIDData> {
  const [profile, aka] = await Promise.all([id.get('basicProfile'), id.get('alsoKnownAs')])
  return { profile, socialAccounts: aka?.accounts ?? [] }
}

export async function loadKnownDIDsData(
  client: WebClient,
  knownDIDs: KnownDIDs
): Promise<KnownDIDsData> {
  const dids = Object.keys(knownDIDs)
  const results = await Promise.all(
    dids.map(async (id) => await loadDIDData(new PublicID({ core: client, id })))
  )
  return dids.reduce((acc, did, i) => {
    acc[did] = { ...results[i], accounts: knownDIDs[did].accounts }
    return acc
  }, {} as KnownDIDsData)
}

export async function editProfile(
  self: SelfID,
  knownDIDs: KnownDIDsData,
  profile: BasicProfile
): Promise<KnownDIDsData> {
  const id = self.id

  const existing = knownDIDs[id]
  if (existing == null) {
    throw new Error(`No associated data for DID ${id}`)
  }

  await self.setProfile(profile)
  return { [id]: { ...existing, profile } }
}
