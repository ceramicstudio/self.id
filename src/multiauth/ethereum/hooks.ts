import type { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'

import { NAMESPACE } from '../constants'

import { getConnectorState } from './data'
import type { ConnectedState } from './types'

export function useConnection(): [
  (connector: AbstractConnector) => Promise<ConnectedState | null>,
  () => void
] {
  const { activate, deactivate } = useWeb3React(process.browser ? NAMESPACE : undefined)

  const connect = useCallback(
    async (connector: AbstractConnector): Promise<ConnectedState | null> => {
      await activate(connector, undefined, true)
      const state = await getConnectorState(connector)
      return state.account == null ? null : (state as ConnectedState)
    },
    [activate]
  )

  const disconnect = useCallback(() => {
    deactivate()
  }, [deactivate])

  return [connect, disconnect]
}
