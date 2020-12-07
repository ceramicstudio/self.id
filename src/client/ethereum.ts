// import Portis from '@portis/web3'
// import WalletConnectProvider from '@walletconnect/web3-provider'
// import Authereum from 'authereum'
// import Fortmatic from 'fortmatic'
import type { EthereumProvider } from '3id-connect'
import Web3Modal from 'web3modal'

export interface ConnectedEthereumProvider {
  accounts: Array<string>
  chainId: string
  provider: EthereumProvider
}

const CHAIN_IDS: Record<string, string> = {
  // Mainnet
  '0x01': '1',
  '0x1': '1',
  // Ropsten
  '0x03': '3',
  '0x3': '3',
  // Rinkeby
  '0x04': '4',
  '0x4': '4',
  // Goerli
  '0x05': '5',
  '0x5': '5',
  // Kovan
  '0x2a': '42',
}

export function normalizeChainId(id: string): string {
  return CHAIN_IDS[id] || id
}

const providerOptions = {
  // portis: {
  //   package: Portis,
  //   options: {
  //     id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff',
  //   },
  // },
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7',
  //   },
  // },
  // fortmatic: {
  //   package: Fortmatic,
  //   options: {
  //     key: 'pk_live_EC842EEAC7F08995',
  //   },
  // },
  // authereum: {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   package: Authereum,
  //   options: {},
  // },
}

export const web3modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
})

export async function connectEthereumProvider(
  clearCachedProvider = false
): Promise<ConnectedEthereumProvider | null> {
  if (clearCachedProvider) {
    web3modal.clearCachedProvider()
  }

  try {
    const provider = (await web3modal.connect()) as EthereumProvider
    const [accounts, chainId] = (await Promise.all([
      provider.request({ method: 'eth_requestAccounts' }),
      provider.request({ method: 'eth_chainId' }),
    ])) as [Array<string>, string]
    return { accounts, chainId: normalizeChainId(chainId), provider }
  } catch (message) {
    if (message === 'Modal closed by user') {
      return null
    }
    throw new Error(message)
  }
}
