import type { AccountId, ChainId, ChainIdParams } from 'caip'

import type { ProviderKey, ProviderType, ProviderTypes } from './providers/types'
import type { Deferred } from './utils'

export type DisplayDefaults = {
  label: string
  logo: string
}

export type Networks = {
  ethereum: 'eip1193' | 'web3'
}

export type NetworkKey = keyof Networks

export type NetworkProvider<Key extends NetworkKey> = Networks[Key]

export type ConnectorKey = 'fortmatic' | 'injected' | 'portis' | 'torus' | 'walletConnect'

export type ConnectorConfigDefaults = DisplayDefaults & {
  getNetworkProvider<Key extends NetworkKey>(
    network: Key,
    params?: unknown
  ): NetworkProvider<Key> | null
  getProvider<Key extends ProviderKey>(key: Key, params?: unknown): Promise<ProviderTypes[Key]>
  params?: unknown
}

export type PartialConnectorConfig<Key extends ConnectorKey = ConnectorKey> =
  | Key
  | (Partial<ConnectorConfigDefaults> & { key: Key })

export type ConnectorConfig<Key extends ConnectorKey = ConnectorKey> = ConnectorConfigDefaults & {
  key: Key
  providerKey: ProviderKey
}

export type GetNetworkState<Key extends ProviderKey = ProviderKey> = (
  providerKey: Key,
  provider: ProviderType<Key>,
  params?: NetworkStateParams
) => Promise<NetworkState<Key>>

export type NetworkConfigDefaults = DisplayDefaults & {
  connectors: Array<ConnectorKey>
  getState: GetNetworkState<ProviderKey>
}

export type PartialNetworkConfig<Key extends NetworkKey = NetworkKey> =
  | Key
  | (Partial<DisplayDefaults> & { key: Key; connectors?: Array<PartialConnectorConfig> })

export type NetworkConfig<Key extends NetworkKey = NetworkKey> = DisplayDefaults & {
  key: Key
  connectors: Array<ConnectorConfig>
  getState: GetNetworkState<NetworkProvider<Key>>
}

export type Config = {
  networks: Array<NetworkConfig>
}

export type PartialConfig = {
  networks?: Array<PartialNetworkConfig>
}

export type NetworkStateParams = {
  account?: string
  chainID?: ChainId | ChainIdParams | string | number
}

export type NetworkState<Key extends ProviderKey> = {
  account: string | null
  chainID: ChainId
  providerKey: Key
  provider: ProviderType<Key>
}

export type AuthenticatedState<Key extends ProviderKey = ProviderKey> = NetworkState<Key> & {
  account: string
}

export type AuthMethod<Key extends NetworkKey = NetworkKey> = {
  key: Key
  connector: ConnectorConfig
}

export type AuthAccount<Key extends ProviderKey = ProviderKey> = {
  accountID: AccountId
  method: AuthMethod
  state: AuthenticatedState<Key>
}

export type AuthState<
  Key extends NetworkKey = NetworkKey,
  Provider extends NetworkProvider<Key> = NetworkProvider<Key>
> =
  | { status: 'idle' }
  | {
      status: 'authenticating'
      promise: Deferred<AuthAccount<Provider> | null>
      modal: boolean
      method?: AuthMethod<Key>
    }
  | { status: 'authenticated'; auth: AuthAccount<Provider> }
  | { status: 'failed'; error?: Error }
