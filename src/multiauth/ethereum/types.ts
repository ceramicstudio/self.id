import type { AbstractConnector } from '@web3-react/abstract-connector'
import type { InjectedConnector } from '@web3-react/injected-connector'
import type { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import type { EthereumProvider } from '3id-connect'
import type { ChainID, ChainIDParams } from 'caip'

export type ConnectorStateParams = {
  account?: string
  chainID?: ChainID | ChainIDParams | string | number
}

export type ConnectorState<Provider = EthereumProvider> = {
  account: string | null
  chainID: ChainID
  provider: Provider
}

export type ConnectedState<Provider = EthereumProvider> = ConnectorState<Provider> & {
  account: string
}

export type ConnectionState<
  Connector extends AbstractConnector = AbstractConnector,
  Provider = EthereumProvider
> =
  | { status: 'PENDING' }
  | { status: 'DISCONNECTED' }
  | { status: 'CONNECTED'; connector: Connector; connected: ConnectedState<Provider> }
  | {
      status: 'CONNECTING'
      connector: Connector
      promise: Promise<ConnectedState<Provider> | null>
    }
  | { status: 'FAILED'; connector: Connector; error?: Error }

export type ConnectorConfig<Connector extends AbstractConnector> = {
  connector: Connector
  label: string
}

export type ConnectorsConfig = {
  injected?: ConnectorConfig<InjectedConnector>
  walletConnect?: ConnectorConfig<WalletConnectConnector>
}

export type ProviderConfig = {
  connectors: ConnectorsConfig
}

export type ConnectionProvider<
  Connector extends AbstractConnector = AbstractConnector,
  Provider = EthereumProvider
> = {
  method: ConnectorConfig<Connector>
  state: ConnectedState<Provider>
}
