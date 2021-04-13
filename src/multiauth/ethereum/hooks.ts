import { useWeb3React } from '@web3-react/core'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'

import { injected } from './connectors'
import { WEB3_REACT_KEY } from './constants'
import { getConnectorState } from './data'
import { connectInjectedAtom } from './state'
import type { ConnectedState, ConnectionState, ConnectorState } from './types'
import { toChainID } from './utils'

export function useWeb3ReactKey() {
  return useWeb3React(process.browser ? WEB3_REACT_KEY : undefined)
}

export function useEthereum(): [
  ConnectionState,
  (useExistingPromise?: boolean) => Promise<ConnectedState | null>,
  () => void
] {
  const { activate, deactivate } = useWeb3ReactKey()
  const [connectionState, setConnectionState] = useAtom(connectInjectedAtom)

  const connect = useCallback(
    (useExistingPromise = true): Promise<ConnectedState | null> => {
      if (connectionState.status === 'CONNECTING' && useExistingPromise) {
        return connectionState.promise
      }

      const promise = activate(injected, undefined, true)
        .then(() => getConnectorState(injected))
        .then(
          (connectorState: ConnectorState) => {
            if (connectorState.account == null) {
              void setConnectionState({ status: 'DISCONNECTED' })
              return null
            } else {
              void setConnectionState({ status: 'CONNECTED', ...connectorState } as ConnectionState)
              return connectorState as ConnectedState
            }
          },
          (error: Error) => {
            void setConnectionState({ status: 'FAILED', error })
            return null
          }
        )
      void setConnectionState({ status: 'CONNECTING', promise })

      return promise
    },
    [activate, setConnectionState, connectionState.status]
  )

  const disconnect = useCallback(() => {
    deactivate()
    void setConnectionState({ status: 'DISCONNECTED' })
  }, [deactivate, setConnectionState])

  return [connectionState, connect, disconnect]
}

export function useEthereumRootConnect() {
  const setConnectionState = useAtom(connectInjectedAtom)[1]
  const [connectionState, connect] = useEthereum()

  useEffect(() => {
    // Auto-connect if authorized
    if (connectionState.status === 'PENDING') {
      const promise = injected.isAuthorized().then(
        (authorized) => {
          if (authorized) {
            return connect(false)
          }
          void setConnectionState({ status: 'DISCONNECTED' })
          return null
        },
        (_err) => {
          void setConnectionState({ status: 'DISCONNECTED' })
          return null
        }
      )
      void setConnectionState({ status: 'CONNECTING', promise })
    }
  }, [connectionState.status, connect, setConnectionState])
}

export function useEthereumRootEvents() {
  const [connectionState, setConnectionState] = useAtom(connectInjectedAtom)

  const onAccountsChanged = useCallback(
    (accounts: Array<string>) => {
      void setConnectionState((current) => {
        return current.status === 'CONNECTED' ? { ...current, account: accounts[0] } : current
      })
    },
    [setConnectionState]
  )

  const onChainChanged = useCallback(
    (chainId: string) => {
      void setConnectionState((current) => {
        return current.status === 'CONNECTED'
          ? { ...current, chainID: toChainID(chainId) }
          : current
      })
    },
    [setConnectionState]
  )

  const onDisconnect = useCallback(() => {
    void setConnectionState({ status: 'DISCONNECTED' })
  }, [setConnectionState])

  useEffect(() => {
    if (connectionState.status === 'CONNECTED') {
      const provider = connectionState.provider

      if (typeof provider.on === 'function') {
        provider.on('accountsChanged', onAccountsChanged)
        provider.on('chainChanged', onChainChanged)
        provider.on('disconnect', onDisconnect)
      }

      return () => {
        if (typeof provider.off === 'function') {
          provider.off('accountsChanged', onAccountsChanged)
          provider.off('chainChanged', onChainChanged)
          provider.off('disconnect', onDisconnect)
        }
      }
    }
  }, [connectionState.status, onAccountsChanged, onChainChanged, onDisconnect])
}
