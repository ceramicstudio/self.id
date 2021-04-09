import { useAtom } from 'jotai'
import { useCallback, useRef } from 'react'

import { injected } from '../../multiauth/ethereum/connectors'
import { useWeb3ReactKey } from '../../multiauth/ethereum/hooks'
import { toChainID } from '../../multiauth/ethereum/utils'

import { connectEthereumProvider } from '../ethereum'
import type { ConnectedEthereumProvider } from '../ethereum'
import { ethereumProviderAtom } from '../state'
import type { EthereumProviderState } from '../state'

export function useEthereum(): [
  EthereumProviderState,
  (
    selectProvider?: boolean,
    restoreConnected?: boolean
  ) => Promise<ConnectedEthereumProvider | null>,
  () => void
] {
  const { activate, deactivate } = useWeb3ReactKey()
  const [providerState, setProviderState] = useAtom(ethereumProviderAtom)
  const accountsChangedListenerRef = useRef<(addresses: Array<string>) => void>()
  const chainChangedListenerRef = useRef<(chainId: string) => void>()
  const disconnectListenerRef = useRef<() => void>()

  const addEventListeners = useCallback(
    (provider: NodeJS.EventEmitter) => {
      accountsChangedListenerRef.current = (accounts: Array<string>) => {
        void setProviderState((current) => {
          return current.status === 'CONNECTED' ? { ...current, account: accounts[0] } : current
        })
      }
      provider.on('accountsChanged', accountsChangedListenerRef.current)

      chainChangedListenerRef.current = (chainId: string) => {
        void setProviderState((current) => {
          return current.status === 'CONNECTED'
            ? { ...current, chainID: toChainID(chainId) }
            : current
        })
      }
      provider.on('chainChanged', chainChangedListenerRef.current)

      disconnectListenerRef.current = () => {
        void setProviderState({ status: 'DISCONNECTED' })
      }
      provider.on('disconnect', disconnectListenerRef.current)
    },
    [setProviderState]
  )

  const removeEventListeners = useCallback((provider: NodeJS.EventEmitter) => {
    if (accountsChangedListenerRef.current != null) {
      provider.off('accountsChanged', accountsChangedListenerRef.current)
    }
    if (chainChangedListenerRef.current != null) {
      provider.off('chainChanged', chainChangedListenerRef.current)
    }
    if (disconnectListenerRef.current != null) {
      provider.off('disconnect', disconnectListenerRef.current)
    }
  }, [])

  const connect = useCallback(
    (
      _selectProvider = false, // TODO: add support for selecting alternative providers
      restoreConnected = true
    ): Promise<ConnectedEthereumProvider | null> => {
      if (providerState.status === 'CONNECTING') {
        return providerState.promise
      }

      const initialState = providerState
      const promise = activate(injected, undefined, true)
        .then(() => connectEthereumProvider())
        .then(
          (connectedProvider: ConnectedEthereumProvider | null) => {
            if (connectedProvider == null) {
              const { status, ...provider } = initialState
              if (restoreConnected && status === 'CONNECTED') {
                // Restore current provider if already connected
                return provider as ConnectedEthereumProvider
              } else {
                void setProviderState({ status: 'DISCONNECTED' })
                return null
              }
            } else {
              if (initialState.status === 'CONNECTED') {
                removeEventListeners(initialState.provider)
              }
              void setProviderState({ status: 'CONNECTED', ...connectedProvider })
              addEventListeners(connectedProvider.provider)
              return connectedProvider
            }
          },
          (error: Error) => {
            void setProviderState({ status: 'FAILED', error })
            return null
          }
        )
      void setProviderState({ status: 'CONNECTING', promise })

      return promise
    },
    [activate, providerState, setProviderState, addEventListeners, removeEventListeners]
  )

  const disconnect = useCallback(() => {
    deactivate()
    if (providerState.status === 'CONNECTED') {
      removeEventListeners(providerState.provider)
    }
    void setProviderState({ status: 'DISCONNECTED' })
  }, [deactivate, providerState, removeEventListeners, setProviderState])

  return [providerState, connect, disconnect]
}
