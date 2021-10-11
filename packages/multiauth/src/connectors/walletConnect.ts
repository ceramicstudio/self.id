import type { ConnectorConfigDefaults, EthereumProvider } from '../types'

export type WalletConnectParams = {
  infuraId?: string
  rpc?: Record<string | number, string>
}

/** @internal */
export const walletConnect: ConnectorConfigDefaults = {
  label: 'WalletConnect',
  logo: new URL('../assets/walletconnect.png', import.meta.url).href,
  async getProvider(key, params?: WalletConnectParams) {
    if (key !== 'ethereum') {
      throw new Error(`Unsupported provider: ${key}`)
    }
    if (params == null || (params.infuraId == null && params.rpc == null)) {
      throw new Error('Missing infuraId or rpc parameter for WalletConnect connector')
    }

    const { default: Provider } = await import('@walletconnect/ethereum-provider')
    return new Provider(params) as unknown as EthereumProvider
  },
  supportsProvider(key, params?: WalletConnectParams) {
    return key === 'ethereum' && params != null && (params.infuraId != null || params.rpc != null)
  },
}
