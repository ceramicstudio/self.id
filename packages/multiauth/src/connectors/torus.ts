import type { ConnectorConfigDefaults, EthereumProvider } from '../types'

/** @internal */
export const torus: ConnectorConfigDefaults = {
  label: 'Torus',
  logo: new URL('../assets/torus.png', import.meta.url).href,
  async getProvider(key) {
    if (key !== 'ethereum') {
      throw new Error(`Unsupported provider: ${key}`)
    }

    const { default: Torus } = await import('@toruslabs/torus-embed')
    const torus = new Torus()
    await torus.init({ showTorusButton: false })
    return torus.provider as unknown as EthereumProvider
  },
  supportsProvider(key) {
    return key === 'ethereum'
  },
}
