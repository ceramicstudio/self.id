export type { ModelTypes as CoreModelTypes } from './__generated__/model'

export type ConnectNetwork = 'local' | 'dev-unstable' | 'testnet-clay' | 'mainnet'

export type AppNetwork = ConnectNetwork | 'local-clay'

export type ConfigURLs = {
  ceramic: string
  connectNetwork: ConnectNetwork
}
