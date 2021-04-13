import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import type { BasicProfile } from '@ceramicstudio/idx-constants'
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect'
import type { EthereumProvider } from '3id-connect'
import { AccountID } from 'caip'
import type { AccountIDParams } from 'caip'

import { CERAMIC_URL, CONNECT_URL } from '../constants'

export type IDXEnv = {
  ceramic: Ceramic
  idx: IDX
  threeId: ThreeIdConnect
}

export type KnownDID = { accounts: Array<AccountIDParams> }
export type KnownDIDs = Record<string, KnownDID>

export type KnownDIDData = KnownDID & { profile: BasicProfile | null }
export type KnownDIDsData = Record<string, KnownDIDData>

export function createIDXEnv(existing?: IDXEnv): IDXEnv {
  if (existing != null) {
    void existing.ceramic.close()
  }
  const ceramic = new Ceramic(CERAMIC_URL)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const idx = new IDX({ ceramic: ceramic as any })
  const threeId = new ThreeIdConnect(CONNECT_URL)
  return { ceramic, idx, threeId }
}

async function loadKnownDIDs(threeId: ThreeIdConnect): Promise<KnownDIDs> {
  const accounts = await threeId.accounts()
  return Object.entries(accounts).reduce((acc, [did, accounts]) => {
    acc[did] = { accounts: accounts.map((id) => AccountID.parse(id)) }
    return acc
  }, {} as KnownDIDs)
}

export async function authenticate(
  env: IDXEnv,
  provider: EthereumProvider,
  address: string
): Promise<KnownDIDs> {
  const authProvider = new EthereumAuthProvider(provider, address)
  await env.threeId.connect(authProvider)
  await env.ceramic.setDIDProvider(env.threeId.getDidProvider())
  return await loadKnownDIDs(env.threeId)
}

export async function linkAccount(
  { threeId }: IDXEnv,
  provider: EthereumProvider,
  did: string,
  address: string
): Promise<KnownDIDs> {
  threeId.setAuthProvider(new EthereumAuthProvider(provider, address))
  await threeId.addAuthAndLink(did)
  return await loadKnownDIDs(threeId)
}

export async function switchAccount(
  { threeId }: IDXEnv,
  provider: EthereumProvider,
  address: string
): Promise<KnownDIDs> {
  // TODO: investivate how to get new ID when changing provider, so we need to call another method?
  threeId.setAuthProvider(new EthereumAuthProvider(provider, address))
  return await loadKnownDIDs(threeId)
}

export async function createAccount(
  { threeId }: IDXEnv,
  provider: EthereumProvider,
  address: string
): Promise<KnownDIDs> {
  threeId.setAuthProvider(new EthereumAuthProvider(provider, address))
  await threeId.createAccount()
  return await loadKnownDIDs(threeId)
}

export async function loadKnownDIDsData(
  { idx }: IDXEnv,
  knownDIDs: KnownDIDs
): Promise<KnownDIDsData> {
  const dids = Object.keys(knownDIDs)
  const profiles = await Promise.all(
    dids.map(async (did) => await idx.get<BasicProfile>('basicProfile', did))
  )
  return dids.reduce((acc, did, i) => {
    acc[did] = { accounts: knownDIDs[did].accounts, profile: profiles[i] ?? null }
    return acc
  }, {} as KnownDIDsData)
}

export async function editProfile(
  { idx, threeId }: IDXEnv,
  knownDIDs: KnownDIDsData,
  profile: BasicProfile
): Promise<KnownDIDsData> {
  const id = idx.id

  let accounts = knownDIDs[id]?.accounts
  if (accounts == null) {
    const didsData = await loadKnownDIDs(threeId)
    accounts = didsData[id]?.accounts
    if (accounts == null) {
      throw new Error(`No associated data for DID ${id}`)
    }
  }

  await idx.set('basicProfile', profile)
  return { ...knownDIDs, [id]: { accounts, profile } }
}
