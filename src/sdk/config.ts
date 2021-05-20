export type ConfigURLs = {
  ceramic: string
  connect: string
  management: string
}

const NETWORK_CONFIGS = {
  clay: {
    ceramic: 'https://ceramic-private-clay.3boxlabs.com',
    connect: 'https://app-clay.3idconnect.org',
    management: 'https://app-clay.3idconnect.org/management/index.html',
  },
  dev: {
    ceramic: 'https://ceramic-private-dev.3boxlabs.com',
    connect: 'https://app-dev.3idconnect.org',
    management: 'https://app-dev.3idconnect.org/management/index.html',
  },
  local: {
    ceramic: 'http://localhost:7007',
    connect: 'http://localhost:30001/index.html',
    management: 'http://localhost:30001/management/index.html',
  },
  main: {
    ceramic: 'https://ceramic-private.3boxlabs.com',
    connect: 'https://app.3idconnect.org',
    management: 'https://app.3idconnect.org/management/index.html',
  },
}

export type CeramicNetwork = keyof typeof NETWORK_CONFIGS

export function getConfig(network: CeramicNetwork): ConfigURLs {
  const exists = NETWORK_CONFIGS[network]
  if (exists == null) {
    throw new Error(`Unsupported Ceramic network: ${network}`)
  }
  return exists
}
