import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { useConnection } from './ethereum/hooks'
import { authStateAtom } from './state'
import type { AuthAccount, AuthState, ProviderType } from './types'
import { deferred } from './utils'

export type ConnectMode =
  | 'force' // Disconnect current account and show modal
  | 'select' // Show selection modal
  | 'use' // Re-use current account if already connected

export type ConnectOptions = {
  mode?: ConnectMode
  showConnecting?: boolean // Show modal when in connecting state
}

export function useMultiAuth(): [
  AuthState,
  (options?: ConnectOptions) => Promise<AuthAccount<ProviderType> | null>,
  () => void
] {
  const [authState, setAuthState] = useAtom(authStateAtom)
  const ethDisconnect = useConnection()[1]

  const internalDisconnect = useCallback(() => {
    ethDisconnect()
    if (authState.status === 'CONNECTING') {
      authState.promise.resolve(null)
    }
  }, [authState, ethDisconnect])

  const showConnectModal = useCallback(async () => {
    const promise = deferred<AuthAccount<ProviderType> | null>()
    void setAuthState({ status: 'CONNECTING', modal: true, promise })
    return await promise
  }, [setAuthState])

  const connect = useCallback(
    async ({ mode = 'use', showConnecting }: ConnectOptions = {}) => {
      switch (mode) {
        case 'force':
          internalDisconnect()
          return await showConnectModal()
        case 'select':
          if (authState.status === 'CONNECTING') {
            if (!authState.modal) {
              void setAuthState({ ...authState, modal: true })
            }
            return await authState.promise
          }
          return await showConnectModal()
        case 'use':
          switch (authState.status) {
            case 'CONNECTED':
              return authState.connected
            case 'CONNECTING':
              if (showConnecting && !authState.modal) {
                void setAuthState({ ...authState, modal: true })
              }
              return await authState.promise
            default:
              return await showConnectModal()
          }
      }
    },
    [authState, internalDisconnect, setAuthState, showConnectModal]
  )

  const disconnect = useCallback(() => {
    internalDisconnect()
    void setAuthState({ status: 'DISCONNECTED' })
  }, [internalDisconnect, setAuthState])

  return [authState, connect, disconnect]
}
