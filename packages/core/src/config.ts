import type { AppNetwork, ConfigURLs } from './types'

const NETWORK_CONFIGS: Record<AppNetwork, ConfigURLs> = {
  'dev-unstable': {
    ceramic: 'https://ceramic-private-dev.3boxlabs.com',
    connectNetwork: 'dev-unstable',
  },
  local: {
    ceramic: 'http://localhost:7007',
    connectNetwork: 'local',
  },
  'local-clay': {
    ceramic: 'http://localhost:7007',
    connectNetwork: 'testnet-clay',
  },
  'testnet-clay': {
    ceramic: 'https://ceramic-private-clay.3boxlabs.com',
    connectNetwork: 'testnet-clay',
  },
  mainnet: {
    ceramic: 'https://ceramic-private.3boxlabs.com',
    connectNetwork: 'mainnet',
  },
}

export function getConfig(network: AppNetwork): ConfigURLs {
  const exists = NETWORK_CONFIGS[network]
  if (exists == null) {
    throw new Error(`Unsupported Ceramic network: ${network}`)
  }
  return exists
}
