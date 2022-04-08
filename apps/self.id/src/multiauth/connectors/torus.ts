import type { NetworkInterface } from '@toruslabs/torus-embed'

import type { ProviderType } from '../providers/types'

import type { ConnectorConfigDefaults } from '../types'

export type TorusParams = {
  network: NetworkInterface
  showTorusButton?: boolean
}

/** @internal */
export const torus: ConnectorConfigDefaults = {
  label: 'Torus',
  logo: new URL('../images/torus.png', import.meta.url).href,
  getNetworkProvider(key, params?: TorusParams) {
    return key === 'ethereum' && params?.network != null ? 'eip1193' : null
  },
  async getProvider(key, params?: TorusParams) {
    if (key !== 'eip1193') {
      throw new Error(`Unsupported provider: ${key}`)
    }
    if (params?.network == null) {
      throw new Error('Missing network parameter for Torus connector')
    }

    const { default: Torus } = await import('@toruslabs/torus-embed')
    const torus = new Torus()
    await torus.init({ showTorusButton: false, ...params })
    await torus.login()
    return torus.provider as unknown as ProviderType<typeof key>
  },
}
