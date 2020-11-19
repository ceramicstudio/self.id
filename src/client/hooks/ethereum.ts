import { useAtom } from 'jotai'
import { useCallback, useRef } from 'react'

import { connectEthereumProvider, normalizeChainId } from '../ethereum'
import type { ConnectedEthereumProvider, EthereumProvider } from '../ethereum'
import { ethereumProvider } from '../state'
import type { EthereumProviderState } from '../state'

export function useEthereum(): [
  EthereumProviderState,
  (
    selectProvider?: boolean,
    restoreConnected?: boolean
  ) => Promise<ConnectedEthereumProvider | null>,
  () => void
] {
  const [providerState, setProviderState] = useAtom(ethereumProvider)
  const accountsChangedListenerRef = useRef<(addresses: Array<string>) => void>()
  const chainChangedListenerRef = useRef<(chainId: string) => void>()
  const disconnectListenerRef = useRef<() => void>()

  const addEventListeners = useCallback(
    (provider: EthereumProvider) => {
      accountsChangedListenerRef.current = (accounts: Array<string>) => {
        void setProviderState((current) => {
          return current.status === 'CONNECTED' ? { ...current, accounts } : current
        })
      }
      provider.on('accountsChanged', accountsChangedListenerRef.current)

      chainChangedListenerRef.current = (chainId: string) => {
        void setProviderState((current) => {
          return current.status === 'CONNECTED'
            ? { ...current, chainId: normalizeChainId(chainId) }
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

  const removeEventListeners = useCallback((provider: EthereumProvider) => {
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
      selectProvider = false,
      restoreConnected = true
    ): Promise<ConnectedEthereumProvider | null> => {
      if (providerState.status === 'CONNECTING') {
        return providerState.promise
      }

      const initialState = providerState
      const promise = connectEthereumProvider(selectProvider).then(
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
    [providerState, setProviderState, addEventListeners, removeEventListeners]
  )

  const disconnect = useCallback(() => {
    if (providerState.status === 'CONNECTED') {
      removeEventListeners(providerState.provider)
    }
    void setProviderState({ status: 'DISCONNECTED' })
  }, [providerState, removeEventListeners, setProviderState])

  return [providerState, connect, disconnect]
}
