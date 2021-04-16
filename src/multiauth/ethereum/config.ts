import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import type { ProviderConfig } from './types'

const RPC_URL_3 = 'https://ropsten.infura.io/v3/75268dd2c30045c899f4c03e53c4c892'

export const injectedConnector = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export const walletConnectConnector = new WalletConnectConnector({
  rpc: {
    '3': RPC_URL_3,
  },
})

export const defaultConfig: ProviderConfig = {
  connectors: {
    injected: {
      label: 'Injected (such as MetaMask)',
      connector: injectedConnector,
    },
    walletConnect: {
      label: 'WalletConnect',
      connector: walletConnectConnector,
    },
  },
}
