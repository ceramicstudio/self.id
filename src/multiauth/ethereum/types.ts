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

export type ConnectionState<Provider = EthereumProvider> =
  | { status: 'PENDING' }
  | { status: 'DISCONNECTED' }
  | ({ status: 'CONNECTED' } & ConnectedState<Provider>)
  | { status: 'CONNECTING'; promise: Promise<ConnectedState<Provider> | null> }
  | { status: 'FAILED'; error?: Error }
