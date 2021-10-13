import { fortmatic } from './connectors/fortmatic'
import { injected } from './connectors/injected'
import { portis } from './connectors/portis'
import { torus } from './connectors/torus'
import { walletConnect } from './connectors/walletConnect'

import type {
  ConnectorConfig,
  ConnectorConfigDefaults,
  ConnectorKey,
  PartialConnectorConfig,
  NetworkKey,
} from './types'

/** @internal */
export const connectorsDefaults: Record<string, ConnectorConfigDefaults> = {
  fortmatic,
  injected,
  portis,
  torus,
  walletConnect,
}

/** @internal */
export function getDefaultConnectorConfig<Key extends ConnectorKey>(
  network: NetworkKey,
  key: Key,
  params?: unknown
): ConnectorConfig | null {
  const config = connectorsDefaults[key]
  if (config == null) {
    throw new Error(`No default config for connector: ${key}`)
  }

  const providerKey = config.getNetworkProvider(network, params)
  return providerKey ? { ...config, key, providerKey } : null
}

export function getConnectorConfig<Key extends ConnectorKey>(
  network: NetworkKey,
  connector: PartialConnectorConfig<Key>
): ConnectorConfig<Key> {
  const config = typeof connector === 'string' ? { key: connector } : connector
  const defaults = getDefaultConnectorConfig(network, config.key, config.params)
  return defaults ? { ...defaults, ...config } : (config as ConnectorConfig<Key>)
}

export function getConnectorsConfig(
  network: NetworkKey,
  connectors: Array<PartialConnectorConfig>
): Array<ConnectorConfig> {
  const configs = []
  for (const connector of connectors) {
    const config = getConnectorConfig(network, connector)
    if (config.providerKey != null) {
      configs.push(config)
    }
  }
  return configs
}
