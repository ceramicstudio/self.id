import type { ProviderType } from '../providers/types'

import type { ConnectorConfigDefaults } from '../types'

export type PortisParams = {
  dAppId: string
  network: string
}

/** @internal */
export const portis: ConnectorConfigDefaults = {
  label: 'Portis',
  logo: new URL('../images/portis.png', import.meta.url).href,
  getNetworkProvider(key, params?: PortisParams) {
    return key === 'ethereum' && params != null && params.dAppId != null && params.network != null
      ? 'web3'
      : null
  },
  async getProvider(key, params?: PortisParams) {
    if (key !== 'web3') {
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
    return portis.provider as ProviderType<typeof key>
  },
}
