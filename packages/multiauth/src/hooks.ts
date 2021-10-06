import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { authStateAtom, stateScope } from './state'
import type { AuthAccount, AuthState } from './types'
import { deferred } from './utils'

/** @internal */
export function useAuthState(): [AuthState, (state: AuthState) => void] {
  return useAtom(authStateAtom, stateScope)
}

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
  (options?: ConnectOptions) => Promise<AuthAccount | null>,
  () => void
] {
  const [authState, setAuthState] = useAuthState()

  const internalDisconnect = useCallback(() => {
    if (authState.status === 'authenticating') {
      authState.promise.resolve(null)
    }
  }, [authState])

  const showConnectModal = useCallback(async () => {
    const promise = deferred<AuthAccount | null>()
    setAuthState({ status: 'authenticating', modal: true, promise })
    return await promise
  }, [setAuthState])

  const connect = useCallback(
    async ({ mode = 'use', showConnecting }: ConnectOptions = {}) => {
      switch (mode) {
        case 'force':
          internalDisconnect()
          return await showConnectModal()
        case 'select':
          if (authState.status === 'authenticating') {
            if (!authState.modal) {
              setAuthState({ ...authState, modal: true })
            }
            return await authState.promise
          }
          return await showConnectModal()
        case 'use':
          switch (authState.status) {
            case 'authenticated':
              return authState.auth
            case 'authenticating':
              if (showConnecting && !authState.modal) {
                setAuthState({ ...authState, modal: true })
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
    void setAuthState({ status: 'idle' })
  }, [internalDisconnect, setAuthState])

  return [authState, connect, disconnect]
}
