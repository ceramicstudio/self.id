import type { AccountID, ChainID, ChainIDParams } from 'caip'

import type { Deferred } from './utils'

export type DisplayDefaults = {
  label: string
  logo: string
}

export type RequestArguments = {
  method: string
  params?: Array<unknown> | Record<string, any>
}
export interface EthereumProvider extends NodeJS.EventEmitter {
  request<Result = unknown>(req: RequestArguments): Promise<Result>
}

export type ProviderTypes = {
  ethereum: EthereumProvider
}

export type ProviderKey = keyof ProviderTypes

export type ProviderType<Key extends ProviderKey> = ProviderTypes[Key]

export type ConnectorKey = 'fortmatic' | 'injected' | 'portis' | 'torus' | 'walletConnect'

export type ConnectorConfigDefaults = DisplayDefaults & {
  getProvider<K extends ProviderKey>(key: K, params?: unknown): Promise<ProviderType<K>>
  supportsProvider<K extends ProviderKey>(key: K, params?: unknown): boolean
  params?: unknown
}

export type PartialConnectorConfig<Key extends ConnectorKey = ConnectorKey> =
  | Key
  | (Partial<ConnectorConfigDefaults> & { key: Key })

export type ConnectorConfig<Key extends ConnectorKey = ConnectorKey> = ConnectorConfigDefaults & {
  key: Key
}

export type GetProviderState<
  Key extends ProviderKey = ProviderKey,
  Provider = ProviderType<Key>
> = (provider: Provider, params?: ProviderStateParams) => Promise<ProviderState<Provider>>

export type ProviderConfigDefaults = DisplayDefaults & {
  connectors: Array<ConnectorKey>
  getState: GetProviderState<ProviderKey>
}

export type PartialProviderConfig<Key extends ProviderKey = ProviderKey> =
  | Key
  | (Partial<DisplayDefaults> & { key: Key; connectors?: Array<PartialConnectorConfig> })

export type ProviderConfig<Key extends ProviderKey = ProviderKey> = DisplayDefaults & {
  key: Key
  connectors: Array<ConnectorConfig>
  getState: GetProviderState<Key>
}

export type Config = {
  providers: Array<ProviderConfig>
}

export type PartialConfig = {
  providers?: Array<PartialProviderConfig>
}

export type ProviderStateParams = {
  account?: string
  chainID?: ChainID | ChainIDParams | string | number
}

export type ProviderState<Provider = EthereumProvider> = {
  account: string | null
  chainID: ChainID
  provider: Provider
}

export type AuthenticatedState<Provider = EthereumProvider> = ProviderState<Provider> & {
  account: string
}

export type AuthMethod<
  Key extends ProviderKey = ProviderKey,
  Connector extends ConnectorKey = ConnectorKey
> = {
  key: Key
  connector: ConnectorConfig<Connector>
}

export type AuthAccount<Key extends ProviderKey = ProviderKey> = {
  accountID: AccountID
  method: AuthMethod<Key>
  state: AuthenticatedState<ProviderType<Key>>
}

export type AuthState<
  Key extends ProviderKey = ProviderKey,
  Connector extends ConnectorKey = ConnectorKey
> =
  | { status: 'idle' }
  | {
      status: 'authenticating'
      promise: Deferred<AuthAccount<Key> | null>
      modal: boolean
      method?: AuthMethod<Key, Connector>
    }
  | { status: 'authenticated'; auth: AuthAccount<Key> }
  | { status: 'failed'; error?: Error }
