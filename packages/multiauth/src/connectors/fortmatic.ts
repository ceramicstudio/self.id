import type { ConnectorConfigDefaults, EthereumProvider } from '../types'

export type FortmaticParams = {
  apiKey: string
}

/** @internal */
export const fortmatic: ConnectorConfigDefaults = {
  label: 'Fortmatic',
  logo: new URL('../assets/fortmatic.png', import.meta.url).href,
  async getProvider(key, params?: FortmaticParams) {
    if (key !== 'ethereum') {
      throw new Error(`Unsupported provider: ${key}`)
    }
    if (params?.apiKey == null) {
      throw new Error('Missing apiKey parameter for Fortmatic connector')
    }

    const { default: Fortmatic } = await import('fortmatic')
    const fortmatic = new Fortmatic(params.apiKey)
    return fortmatic.getProvider() as unknown as EthereumProvider
  },
  supportsProvider(key, params?: FortmaticParams) {
    return key === 'ethereum' && params?.apiKey != null
  },
}
