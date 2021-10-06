import type {
  ConnectorConfig,
  ConnectorConfigDefaults,
  ConnectorKey,
  EthereumProvider,
  PartialConnectorConfig,
  ProviderKey,
} from './types'

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

/** @internal */
export const connectorsDefaults: Record<string, ConnectorConfigDefaults> = {
  fortmatic: {
    label: 'Fortmatic',
    logo: new URL('../assets/fortmatic.png', import.meta.url).href,
    getProvider() {
      return Promise.reject(new Error('Not implemented'))
    },
    isSupported() {
      return false
    },
  },
  injected: {
    label: 'MetaMask',
    logo: new URL('../assets/metamask.png', import.meta.url).href,
    getProvider() {
      return window.ethereum == null
        ? Promise.reject(new Error('No injected provider'))
        : Promise.resolve(window.ethereum)
    },
    isSupported() {
      return window.ethereum != null
    },
  },
  portis: {
    label: 'Portis',
    logo: new URL('../assets/portis.png', import.meta.url).href,
    getProvider() {
      return Promise.reject(new Error('Not implemented'))
    },
    isSupported() {
      return false
    },
  },
  torus: {
    label: 'Torus',
    logo: new URL('../assets/torus.png', import.meta.url).href,
    getProvider() {
      return Promise.reject(new Error('Not implemented'))
    },
    isSupported() {
      return false
    },
  },
  walletConnect: {
    label: 'WalletConnect',
    logo: new URL('../assets/walletconnect.png', import.meta.url).href,
    getProvider() {
      return Promise.reject(new Error('Not implemented'))
    },
    isSupported() {
      return false
    },
  },
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
    if (provider == null || config.isSupported(provider)) {
      configs.push(config)
    }
  }
  return configs
}
