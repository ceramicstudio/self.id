import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { authStateAtom, stateScope } from './state'
import type { AuthAccount, AuthState } from './types'
import { deferred } from './utils'

/** @internal */
export function useAuthState(): [AuthState, (state: AuthState) => void] {
  return useAtom(authStateAtom, stateScope)
}

export type AuthenticateMode =
  | 'select' // Show selection modal
  | 'reset' // Reset current account and show modal
  | 'reuse' // Re-use current account if already authenticated

export type AuthenticateOptions = {
  mode?: AuthenticateMode
  showModal?: boolean // Show modal when in authentication state
}

export function useMultiAuth(): [
  AuthState,
  (options?: AuthenticateOptions) => Promise<AuthAccount | null>,
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
    async ({ mode = 'reuse', showModal }: AuthenticateOptions = {}) => {
      switch (mode) {
        case 'select':
          if (authState.status === 'authenticating') {
            if (!authState.modal) {
              setAuthState({ ...authState, modal: true })
            }
            return await authState.promise
          }
          return await showConnectModal()
        case 'reset':
          internalDisconnect()
          return await showConnectModal()
        case 'reuse':
          switch (authState.status) {
            case 'authenticated':
              return authState.auth
            case 'authenticating':
              if (showModal && !authState.modal) {
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
    setAuthState({ status: 'idle' })
  }, [internalDisconnect, setAuthState])

  return [authState, connect, disconnect]
}
