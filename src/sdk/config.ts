export type ConnectNetwork = 'local' | 'dev-unstable' | 'testnet-clay' | 'mainnet'

export type AppNetwork = ConnectNetwork | 'local-clay'

export type ConfigURLs = {
  ceramic: string
  connectNetwork: ConnectNetwork
  verificationsServer?: string
}

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
    verificationsServer: 'https://verifications-clay.3boxlabs.com',
  },
  'testnet-clay': {
    ceramic: 'https://ceramic-private-clay.3boxlabs.com',
    connectNetwork: 'testnet-clay',
    verificationsServer: 'https://verifications-clay.3boxlabs.com',
  },
  mainnet: {
    ceramic: 'https://ceramic-private.3boxlabs.com',
    connectNetwork: 'mainnet',
    verificationsServer: 'https://verifications.3boxlabs.com',
  },
}

export function getConfig(network: AppNetwork): ConfigURLs {
  const exists = NETWORK_CONFIGS[network]
  if (exists == null) {
    throw new Error(`Unsupported Ceramic network: ${network}`)
  }
  return exists
}
