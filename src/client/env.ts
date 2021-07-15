import { EthereumAuthProvider } from '@3id/connect'
import type { EthereumProvider } from '@3id/connect'
import type { AlsoKnownAsAccount, BasicProfile } from '@ceramicstudio/idx-constants'
import type { AccountIDParams } from 'caip'

import { PublicID, SelfID, WebClient } from '../sdk/web'

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
  const did = await client.authenticate(authProvider)
  client.ceramic.did = did
  return new SelfID(client, did)
}

export async function loadDIDData(id: PublicID): Promise<DIDData> {
  const [profile, socialAccounts] = await Promise.all([id.getProfile(), id.getSocialAccounts()])
  return { profile, socialAccounts }
}

export async function loadKnownDIDsData(
  client: WebClient,
  knownDIDs: KnownDIDs
): Promise<KnownDIDsData> {
  const dids = Object.keys(knownDIDs)
  const results = await Promise.all(
    dids.map(async (id) => await loadDIDData(new PublicID(client, id)))
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
