type CeramicNetwork = 'clay' | 'dev' | 'local' | 'mainnet'

type AppURLs = {
  ceramic: string
  connect: string
  management: string
}

const CeramicEnvs: Record<CeramicNetwork, AppURLs> = {
  clay: {
    ceramic: 'https://ceramic-clay-private.3boxlabs.com',
    connect: 'https://app-clay.3idconnect.org',
    management: 'https://app-clay.3idconnect.org/management/index.html',
  },
  dev: {
    ceramic: 'https://ceramic-dev-private.3boxlabs.com',
    connect: 'https://app-dev.3idconnect.org',
    management: 'https://app-dev.3idconnect.org/management/index.html',
  },
  local: {
    ceramic: 'http://localhost:7007',
    connect: 'http://localhost:30001/index.html',
    management: 'http://localhost:30001/management/index.html',
  },
  mainnet: {
    ceramic: 'https://ceramic-private.3boxlabs.com',
    connect: 'https://app.3idconnect.org',
    management: 'https://app.3idconnect.org/management/index.html',
  },
}

const EnvURLs =
  CeramicEnvs[process.env.NEXT_PUBLIC_CERAMIC_NETWORK as CeramicNetwork] ?? CeramicEnvs.clay

export const CERAMIC_URL = EnvURLs.ceramic
export const CONNECT_URL = EnvURLs.connect
export const CONNECT_MANAGEMENT_URL = EnvURLs.management

export const IPFS_API_URL = 'https://ipfs.infura.io:5001/api/v0'
export const IPFS_URL = 'https://ipfs.infura.io/ipfs/'
export const IPFS_PREFIX = 'ipfs://'

export const PROFILE_URL = 'https://ipfs.3box.io/profile'
