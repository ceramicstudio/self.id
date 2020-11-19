import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { definitions } from '@ceramicstudio/idx-constants'
import { IDXWeb } from '@ceramicstudio/idx-web'
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect'
import { AccountID } from 'caip'
import type { AccountIDParams } from 'caip'

import { CERAMIC_URL, CONNECT_URL } from '../constants'

import type { EthereumProvider } from './ethereum'

export type IDXEnv = {
  ceramic: Ceramic
  connect: ThreeIdConnect
  idx: IDXWeb
}

export type KnownDID = { accounts: Array<AccountIDParams> }
export type KnownDIDs = Record<string, KnownDID>

export function createIDXEnv(existing?: IDXEnv): IDXEnv {
  if (existing != null) {
    void existing.ceramic.close()
  }
  const ceramic = new Ceramic(CERAMIC_URL)
  const connect = new ThreeIdConnect(CONNECT_URL)
  // @ts-ignore ceramic instance type
  const idx = new IDXWeb({ ceramic, connect, definitions })
  return { ceramic, connect, idx }
}

export async function authenticate(
  env: IDXEnv,
  provider: EthereumProvider,
  address: string,
  paths?: Array<string>
): Promise<KnownDIDs> {
  const authProvider = new EthereumAuthProvider(provider, address)
  await env.idx.authenticate({ authProvider, paths })
  // @ts-ignore
  const accounts = await env.connect.accounts()
  return Object.entries(accounts).reduce((acc, [did, accounts]) => {
    acc[did] = { accounts: accounts.map((id) => AccountID.parse(id)) }
    return acc
  }, {} as KnownDIDs)
}
