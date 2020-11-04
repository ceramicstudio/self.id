import { definitions } from '@ceramicstudio/idx-constants'
import { IDXWeb } from '@ceramicstudio/idx-web'
import { EthereumAuthProvider } from '3id-connect'

import { CERAMIC_URL, CONNECT_URL } from '../constants'

import { web3modal } from './web3modal'

interface EthProvider {
  enable(): Promise<Array<string>>
}

function createIDX(): IDXWeb {
  return new IDXWeb({
    ceramic: CERAMIC_URL,
    connect: CONNECT_URL,
    definitions,
  })
}

export let idx = createIDX()

export async function connectEthProvider(clearCachedProvider = false): Promise<EthProvider | null> {
  if (clearCachedProvider) {
    web3modal.clearCachedProvider()
  }

  try {
    const provider = (await web3modal.connect()) as EthProvider
    // TODO: listen to disconnect, account and chain changed event to trigger logout
    // this should probably be part of React tree (atoms?) so it can be tracked
    return provider
  } catch (message) {
    if (message === 'Modal closed by user') {
      return null
    }
    throw new Error(message)
  }
}

export async function getEthereumAuthProvider(
  ethProvider: EthProvider
): Promise<EthereumAuthProvider> {
  // TODO: replace by ethProvider.send('eth_requestAccounts')
  // https://eips.ethereum.org/EIPS/eip-1102
  const addresses = await ethProvider.enable()
  return new EthereumAuthProvider(ethProvider, addresses[0])
}

// TODO: keep track of multiple in-flight auth calls
// Ideally it should merge the paths and clearCachedProvider options to merge multiple calls into a single one

export async function authenticate(
  paths?: Array<string>,
  clearCachedProvider?: boolean
): Promise<boolean> {
  const ethProvider = await connectEthProvider(clearCachedProvider)
  if (ethProvider == null) {
    return false
  }
  const authProvider = await getEthereumAuthProvider(ethProvider)
  await idx.authenticate({ authProvider, paths })
  return true
}

export function reset() {
  idx = createIDX()
  web3modal.clearCachedProvider()
}
