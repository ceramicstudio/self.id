import type { EthereumProvider } from '3id-connect'

import { injected } from '../multiauth/ethereum/connectors'
import { getConnectorState } from '../multiauth/ethereum/data'
import type { ConnectorState } from '../multiauth/ethereum/types'

export type ConnectedEthereumProvider = ConnectorState<EthereumProvider> & { account: string }

export async function connectEthereumProvider(): Promise<ConnectedEthereumProvider | null> {
  const state = await getConnectorState<EthereumProvider>(injected)
  return state.account == null ? null : (state as ConnectedEthereumProvider)
}
