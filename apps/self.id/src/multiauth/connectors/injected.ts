import type { EIP1193Provider, ProviderType } from '../providers/types'

import type { ConnectorConfigDefaults } from '../types'

declare global {
  interface Window {
    ethereum?: EIP1193Provider
  }
}

/** @internal */
export const injected: ConnectorConfigDefaults = {
  label: 'MetaMask',
  logo: new URL('../images/metamask.png', import.meta.url).href,
  getNetworkProvider(key) {
    return key === 'ethereum' && typeof window !== 'undefined' && window.ethereum != null
      ? 'eip1193'
      : null
  },
  getProvider(key) {
    if (key !== 'eip1193') {
      return Promise.reject(new Error(`Unsupported provider: ${key}`))
    }

    return typeof window === 'undefined' || window.ethereum == null
      ? Promise.reject(new Error('No injected provider'))
      : Promise.resolve(window.ethereum as ProviderType<typeof key>)
  },
}
