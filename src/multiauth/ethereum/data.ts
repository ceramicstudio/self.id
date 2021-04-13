import type { AbstractConnector } from '@web3-react/abstract-connector'
import type { EthereumProvider } from '3id-connect'

import type { ConnectorState, ConnectorStateParams } from './types'
import { toChainID } from './utils'

export async function getConnectorState<Provider = EthereumProvider>(
  connector: AbstractConnector,
  params: ConnectorStateParams = {}
): Promise<ConnectorState<Provider>> {
  const [provider, account, chainID] = await Promise.all([
    connector.getProvider() as Promise<Provider>,
    params.account ?? connector.getAccount(),
    params.chainID ?? connector.getChainId(),
  ])
  return { account, chainID: toChainID(chainID), provider }
}
