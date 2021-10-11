import type { ConnectorConfigDefaults, EthereumProvider } from '../types'

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

/** @internal */
export const injected: ConnectorConfigDefaults = {
  label: 'MetaMask',
  logo: new URL('../assets/metamask.png', import.meta.url).href,
  getProvider(key) {
    if (key !== 'ethereum') {
      return Promise.reject(new Error(`Unsupported provider: ${key}`))
    }

    return typeof window === 'undefined' || window.ethereum == null
      ? Promise.reject(new Error('No injected provider'))
      : Promise.resolve(window.ethereum)
  },
  supportsProvider(key) {
    return key === 'ethereum' && typeof window !== 'undefined' && window.ethereum != null
  },
}
