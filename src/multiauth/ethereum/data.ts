import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import type { AbstractConnector } from '@web3-react/abstract-connector'
import { AccountID } from 'caip'

import type { AccountStatus, KnownAccount } from '../types'

import type { ConnectorState, ConnectorStateParams } from './types'
import { toChainID } from './utils'

export async function getConnectorState<Provider = any>(
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

export function getKnowAccountFromConnectorState<Provider = any>(
  { account, chainID, provider }: ConnectorState<Provider>,
  status: AccountStatus = 'unknown'
): KnownAccount {
  if (account == null) {
    throw new Error('No account')
  }
  return {
    accountID: new AccountID({ address: account, chainId: chainID }),
    authProvider: new EthereumAuthProvider(provider, account),
    status,
  }
}

export async function getKnowAccountFromConnector(
  connector: AbstractConnector,
  params?: ConnectorStateParams
): Promise<KnownAccount> {
  const state = await getConnectorState(connector, params)
  return getKnowAccountFromConnectorState(state, 'active')
}
