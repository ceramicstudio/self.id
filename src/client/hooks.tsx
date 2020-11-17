import { useAtom } from 'jotai'
import { useCallback, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

import { connectEthereumProvider, normalizeChainId } from './ethereum'
import type { ConnectedEthereumProvider, EthereumProvider } from './ethereum'
import { idx, authenticate, reset } from './idx'
import { uploadImage } from './ipfs'
import { ethereumProvider, idxAuth, knownDIDs } from './state'
import type { EthereumProviderState, IDXAuth } from './state'

export function useKnownDIDs() {
  return useAtom(knownDIDs)
}

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
        if (providerState.status === 'CONNECTED' && providerState.provider === provider) {
          void setProviderState({ ...providerState, accounts })
        }
      }
      provider.on('accountsChanged', accountsChangedListenerRef.current)

      chainChangedListenerRef.current = (chainId: string) => {
        if (providerState.status === 'CONNECTED' && providerState.provider === provider) {
          void setProviderState({ ...providerState, chainId: normalizeChainId(chainId) })
        }
      }
      provider.on('chainChanged', chainChangedListenerRef.current)

      disconnectListenerRef.current = () => {
        if (providerState.status === 'CONNECTED' && providerState.provider === provider) {
          void setProviderState({ status: 'DISCONNECTED' })
        }
      }
      provider.on('disconnect', disconnectListenerRef.current)
    },
    [providerState, setProviderState]
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
            addEventListeners(connectedProvider.provider)
            void setProviderState({ status: 'CONNECTED', ...connectedProvider })
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

export function useIDXAuth(): [
  IDXAuth,
  (provider: EthereumProvider, address: string, paths?: Array<string>) => Promise<string | null>,
  () => void
] {
  const [_, setKnownDIDs] = useKnownDIDs()
  const [auth, setAuth] = useAtom(idxAuth)

  const tryAuthenticate = useCallback(
    async (
      provider: EthereumProvider,
      address: string,
      paths?: Array<string>
    ): Promise<string | null> => {
      const initialAuth = auth
      void setAuth({ state: 'LOADING', id: auth.id })

      try {
        const knownDIDs = await authenticate(provider, address, paths)
        if (knownDIDs) {
          void setKnownDIDs(knownDIDs)
          void setAuth({ state: 'CONFIRMED', id: idx.id })
          return idx.id
        } else {
          void setAuth(initialAuth)
          return null
        }
      } catch (err) {
        void setAuth({ state: 'ERROR', id: auth.id, error: err as Error })
        throw err
      }
    },
    [auth, setAuth, setKnownDIDs]
  )

  const clearAuth = useCallback(() => {
    reset()
    void setKnownDIDs({})
    void setAuth({ state: 'UNKNOWN' })
  }, [setAuth, setKnownDIDs])

  return [auth, tryAuthenticate, clearAuth]
}

export function useLogin(): (clear?: boolean) => Promise<string | null> {
  const [ethereum, connect, disconnect] = useEthereum()
  const [auth, tryAuth, clearAuth] = useIDXAuth()

  return useCallback(
    async (switchAccount?: boolean) => {
      if (auth.state === 'CONFIRMED' && ethereum.status === 'CONNECTED' && !switchAccount) {
        return Promise.resolve(auth.id)
      }

      let eth
      if (switchAccount) {
        clearAuth()
        disconnect()
        eth = await connect(true)
      } else {
        eth = await (ethereum.status === 'CONNECTING' ? ethereum.promise : connect())
      }

      return eth ? await tryAuth(eth.provider, eth.accounts[0]) : null
    },
    [auth, clearAuth, connect, disconnect, ethereum, tryAuth]
  )
}

export function useLogout() {
  const [_eth, _connect, disconnect] = useEthereum()
  const [__auth, _tryAuth, clearAuth] = useIDXAuth()

  return useCallback(() => {
    clearAuth()
    disconnect()
  }, [clearAuth, disconnect])
}

const UPLOAD_MAX_SIZE = 2500000

export type UploadState = 'IDLE' | 'UPLOADING' | 'FAILED' | 'DONE'

export function useImageUpload(onUpload: (hash: string) => void, maxSize = UPLOAD_MAX_SIZE) {
  const [state, setState] = useState<UploadState>('IDLE')
  const hashRef = useRef<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function resetInput() {
    if (inputRef.current != null) {
      inputRef.current.value = ''
    }
  }

  const trigger = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      hashRef.current = null

      const file = e.target?.files?.[0]
      if (file == null || file.size > maxSize) {
        resetInput()
        return
      }

      const data = new FormData()
      data.append('path', file)
      setState('UPLOADING')

      uploadImage(data).then(
        (hash) => {
          resetInput()
          hashRef.current = hash
          onUpload(hash)
          setState('DONE')
        },
        (err) => {
          console.warn('Failed to upload image to IPFS', err)
          setState('FAILED')
        }
      )
    },
    [maxSize, onUpload]
  )

  const input = (
    <input
      accept="image/*"
      onChange={onChange}
      ref={inputRef}
      style={{ display: 'none' }}
      type="file"
    />
  )

  return { input, state, trigger, value: hashRef.current }
}
