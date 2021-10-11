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
  ProviderKey,
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
  key: Key
): ConnectorConfig<Key> {
  const config = connectorsDefaults[key]
  if (config == null) {
    throw new Error(`No default config for connector: ${key}`)
  }
  return { ...config, key }
}

export function getConnectorConfig<Key extends ConnectorKey>(
  connector: PartialConnectorConfig<Key>
): ConnectorConfig<Key> {
  return typeof connector === 'string'
    ? getDefaultConnectorConfig(connector)
    : { ...getDefaultConnectorConfig(connector.key), ...connector }
}

export function getConnectorsConfig(
  connectors: Array<PartialConnectorConfig>,
  provider?: ProviderKey
): Array<ConnectorConfig> {
  const configs = []
  for (const connector of connectors) {
    const config = getConnectorConfig(connector)
    if (provider == null || config.supportsProvider(provider, config.params)) {
      configs.push(config)
    }
  }
  return configs
}
