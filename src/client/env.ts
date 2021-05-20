import { EthereumAuthProvider } from '@3id/connect'
import type { EthereumProvider } from '@3id/connect'
import type { BasicProfile } from '@ceramicstudio/idx-constants'
import type { AccountIDParams } from 'caip'

import { WebClient } from '../sdk/clients'
import { SelfID } from '../sdk/self'

export type KnownDID = { accounts: Array<AccountIDParams> }
export type KnownDIDs = Record<string, KnownDID>

export type KnownDIDData = KnownDID & { profile: BasicProfile | null }
export type KnownDIDsData = Record<string, KnownDIDData>

export async function authenticate(
  client: WebClient,
  provider: EthereumProvider,
  address: string
): Promise<SelfID> {
  const authProvider = new EthereumAuthProvider(provider, address)
  const did = await client.authenticate(authProvider)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await client.ceramic.setDID(did)
  return new SelfID(client, did)
}

export async function loadKnownDIDsData(
  client: WebClient,
  knownDIDs: KnownDIDs
): Promise<KnownDIDsData> {
  const dids = Object.keys(knownDIDs)
  const profiles = await Promise.all(dids.map((id) => client.getProfile(id)))
  return dids.reduce((acc, did, i) => {
    acc[did] = { accounts: knownDIDs[did].accounts, profile: profiles[i] ?? null }
    return acc
  }, {} as KnownDIDsData)
}

export async function editProfile(
  self: SelfID,
  knownDIDs: KnownDIDsData,
  profile: BasicProfile
): Promise<KnownDIDsData> {
  const id = self.id

  const accounts = knownDIDs[id]?.accounts
  if (accounts == null) {
    throw new Error(`No associated data for DID ${id}`)
  }

  await self.setProfile(profile)
  return { [id]: { accounts, profile } }
}
