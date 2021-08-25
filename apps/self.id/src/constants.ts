type ConnectNetwork = 'dev-unstable' | 'local' | 'mainnet' | 'testnet-clay'

export type AppNetwork = ConnectNetwork | 'local-clay'

type NetworkConfig = {
  ceramicURL: string
  connectNetwork: ConnectNetwork
}

const NETWORK_CONFIGS: Record<AppNetwork, NetworkConfig> = {
  'dev-unstable': {
    ceramicURL: 'https://ceramic-private-dev.3boxlabs.com',
    connectNetwork: 'dev-unstable',
  },
  local: {
    ceramicURL: 'http://localhost:7007',
    connectNetwork: 'local',
  },
  'local-clay': {
    ceramicURL: 'http://localhost:7007',
    connectNetwork: 'testnet-clay',
  },
  'testnet-clay': {
    ceramicURL: 'https://ceramic-private-clay.3boxlabs.com',
    connectNetwork: 'testnet-clay',
  },
  mainnet: {
    ceramicURL: 'https://ceramic-private.3boxlabs.com',
    connectNetwork: 'mainnet',
  },
}

export const APP_NETWORK: AppNetwork =
  (process.env.NEXT_PUBLIC_APP_NETWORK as AppNetwork | undefined) ?? ('testnet-clay' as AppNetwork)

export const CERAMIC_URL = NETWORK_CONFIGS[APP_NETWORK].ceramicURL
export const CONNECT_NETWORK =  NETWORK_CONFIGS[APP_NETWORK].connectNetwork

export const PROFILE_URL = 'https://ipfs.3box.io/profile'

export const IPFS_API_URL = 'https://ipfs.infura.io:5001/api/v0'
export const IPFS_URL = 'https://ipfs.infura.io/ipfs/'
