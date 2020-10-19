import { definitions } from '@ceramicstudio/idx-constants'
import { IDXWeb } from '@ceramicstudio/idx-web'
import { EthereumAuthProvider } from '3id-connect'

import { CERAMIC_URL, CONNECT_URL } from '../constants'
import type { IDXBasicProfile } from '../types'

import { web3modal } from './web3modal'

export const idx = new IDXWeb({
  ceramic: CERAMIC_URL,
  connect: CONNECT_URL,
  definitions,
})

export async function authenticateIDX(paths?: Array<string>): Promise<IDXWeb> {
  const ethProvider = await web3modal.connect()
  const addresses = await ethProvider.enable()
  const authProvider = new EthereumAuthProvider(ethProvider, addresses[0])
  await idx.authenticate({ authProvider, paths })
  return idx
}

export async function loadProfile(): Promise<IDXBasicProfile> {
  return (await idx.get('basicProfile')) ?? {}
}
