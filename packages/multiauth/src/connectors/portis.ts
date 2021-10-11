import type { ConnectorConfigDefaults, EthereumProvider } from '../types'

export type PortisParams = {
  dAppId: string
  network: string
}

/** @internal */
export const portis: ConnectorConfigDefaults = {
  label: 'Portis',
  logo: new URL('../assets/portis.png', import.meta.url).href,
  async getProvider(key, params?: PortisParams) {
    if (key !== 'ethereum') {
      throw new Error(`Unsupported provider: ${key}`)
    }
    if (params?.dAppId == null) {
      throw new Error('Missing dAppId parameter for Portis connector')
    }
    if (params?.network == null) {
      throw new Error('Missing network parameter for Portis connector')
    }

    const { default: Portis } = await import('@portis/web3')
    const portis = new Portis(params.dAppId, params.network)
    return portis.provider as EthereumProvider
  },
  supportsProvider(key, params?: PortisParams) {
    return key === 'ethereum' && params != null && params.dAppId != null && params.network != null
  },
}
