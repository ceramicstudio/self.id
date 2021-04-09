import type { ChainID, ChainIDParams } from 'caip'

export type ConnectorState<Provider = any> = {
  account: string | null
  chainID: ChainID
  provider: Provider
}

export type ConnectorStateParams = {
  account?: string
  chainID?: ChainID | ChainIDParams | string | number
}
