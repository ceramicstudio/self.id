import { getConnectorsConfig } from './connectors'
import { getEthereumProviderState } from './networks/ethereum'
import type {
  NetworkKey,
  NetworkConfig,
  NetworkConfigDefaults,
  PartialNetworkConfig,
} from './types'

export const networksDefaults: Record<NetworkKey, NetworkConfigDefaults> = {
  ethereum: {
    label: 'Ethereum',
    logo: new URL('images/ethereum.png', import.meta.url).href,
    connectors: ['injected'],
    getState: getEthereumProviderState,
  },
}

export function getDefaultNetworkConfig<Key extends NetworkKey>(key: Key): NetworkConfig<Key> {
  const config = networksDefaults[key]
  if (config == null) {
    throw new Error(`No default config for network: ${key}`)
  }

  const connectors = getConnectorsConfig(key, config.connectors)
  return { ...config, connectors, key }
}

export function getNetworkConfig<Key extends NetworkKey>(
  network: PartialNetworkConfig<Key>
): NetworkConfig<Key> {
  if (typeof network === 'string') {
    return getDefaultNetworkConfig(network)
  }

  const defaults = networksDefaults[network.key]
  if (defaults == null) {
    throw new Error(`No default config for network: ${network.key}`)
  }

  const connectors = getConnectorsConfig(network.key, network.connectors ?? defaults.connectors)
  return { ...defaults, ...network, connectors }
}

export function getNetworksConfig(providers: Array<PartialNetworkConfig>): Array<NetworkConfig> {
  return providers.map(getNetworkConfig)
}
