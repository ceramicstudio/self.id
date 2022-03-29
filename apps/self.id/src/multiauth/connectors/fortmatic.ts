import type { ProviderType } from '../providers/types'

import type { ConnectorConfigDefaults } from '../types'

export type FortmaticParams = {
  apiKey: string
}

/** @internal */
export const fortmatic: ConnectorConfigDefaults = {
  label: 'Fortmatic',
  logo: new URL('../images/fortmatic.png', import.meta.url).href,
  getNetworkProvider(key, params?: FortmaticParams) {
    return key === 'ethereum' && params?.apiKey != null ? 'web3' : null
  },
  async getProvider(key, params?: FortmaticParams) {
    if (key !== 'web3') {
      throw new Error(`Unsupported provider: ${key}`)
    }
    if (params?.apiKey == null) {
      throw new Error('Missing apiKey parameter for Fortmatic connector')
    }

    const { default: Fortmatic } = await import('fortmatic')
    const fortmatic = new Fortmatic(params.apiKey)
    return fortmatic.getProvider() as unknown as ProviderType<typeof key>
  },
}
