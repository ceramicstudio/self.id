import { definitions } from '@ceramicstudio/idx-constants'
import { IDXWeb } from '@ceramicstudio/idx-web'
import { EthereumAuthProvider } from '3id-connect'

import { CERAMIC_URL, CONNECT_URL } from '../constants'

import { web3modal } from './web3modal'

interface EthProvider {
  enable(): Promise<Array<string>>
}

export const idx = new IDXWeb({
  ceramic: CERAMIC_URL,
  connect: CONNECT_URL,
  definitions,
})

export async function connectEthProvider(clearCachedProvider = false): Promise<EthProvider> {
  if (clearCachedProvider) {
    web3modal.clearCachedProvider()
  }
  return (await web3modal.connect()) as EthProvider
}

export async function getEthereumAuthProvider(
  ethProvider: EthProvider
): Promise<EthereumAuthProvider> {
  const addresses = await ethProvider.enable()
  return new EthereumAuthProvider(ethProvider, addresses[0])
}

export async function authenticateIDX(
  paths?: Array<string>,
  clearCachedProvider?: boolean
): Promise<IDXWeb> {
  const ethProvider = await connectEthProvider(clearCachedProvider)
  const authProvider = await getEthereumAuthProvider(ethProvider)
  await idx.authenticate({ authProvider, paths })
  return idx
}
