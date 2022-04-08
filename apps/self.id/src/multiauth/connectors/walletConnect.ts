import type { ProviderType } from '../providers/types'

import type { ConnectorConfigDefaults } from '../types'

export type WalletConnectParams = {
  infuraId?: string
  rpc?: Record<string | number, string>
}

/** @internal */
export const walletConnect: ConnectorConfigDefaults = {
  label: 'WalletConnect',
  logo: new URL('../images/walletconnect.png', import.meta.url).href,
  getNetworkProvider(key, params?: WalletConnectParams) {
    return key === 'ethereum' && params != null && (params.infuraId != null || params.rpc != null)
      ? 'eip1193'
      : null
  },
  async getProvider(key, params?: WalletConnectParams) {
    if (key !== 'eip1193') {
      throw new Error(`Unsupported provider: ${key}`)
    }
    if (params == null || (params.infuraId == null && params.rpc == null)) {
      throw new Error('Missing infuraId or rpc parameter for WalletConnect connector')
    }

    const { default: Provider } = await import('@walletconnect/ethereum-provider')
    return new Provider(params) as unknown as ProviderType<typeof key>
  },
}
