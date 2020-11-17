import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { definitions } from '@ceramicstudio/idx-constants'
import { IDXWeb } from '@ceramicstudio/idx-web'
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect'
import { AccountID } from 'caip'
import type { AccountIDParams } from 'caip'

import { CERAMIC_URL, CONNECT_URL } from '../constants'

import { web3modal } from './ethereum'
import type { EthereumProvider } from './ethereum'

export type KnownDID = { accounts: Array<AccountIDParams> }
export type KnownDIDs = Record<string, KnownDID>

const connect = new ThreeIdConnect(CONNECT_URL)
let ceramic: Ceramic | null = null

function createIDX(): IDXWeb {
  if (ceramic != null) {
    void ceramic.close()
  }
  ceramic = new Ceramic(CERAMIC_URL)
  // @ts-ignore ceramic instance type
  return new IDXWeb({ ceramic, connect, definitions })
}

export let idx = createIDX()

export async function authenticate(
  provider: EthereumProvider,
  address: string,
  paths?: Array<string>
): Promise<KnownDIDs> {
  const authProvider = new EthereumAuthProvider(provider, address)
  await idx.authenticate({ authProvider, paths })
  // @ts-ignore
  const accounts = await connect.accounts()
  return Object.entries(accounts).reduce((acc, [did, accounts]) => {
    acc[did] = { accounts: accounts.map((id) => AccountID.parse(id)) }
    return acc
  }, {} as KnownDIDs)
}

export function reset() {
  if (ceramic != null) {
    void ceramic.close()
    ceramic = null
  }
  idx = createIDX()
  web3modal.clearCachedProvider()
}
