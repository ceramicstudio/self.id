import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import { EthereumAuthProvider, useViewerConnection } from '@self.id/framework'
import type { SelfID } from '@self.id/framework'
import { useCallback, useMemo } from 'react'

import { useMultiAuth } from '../multiauth/hooks'
import type { AuthAccount } from '../multiauth/types'
import type { EIP1193Provider, Web3Provider } from '../multiauth/providers/types'

export type ConnectionState<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  | { status: 'disconnected' }
  | { status: 'connecting' }
  | { status: 'connected'; selfID: SelfID<ModelTypes> }
  | { status: 'failed'; error?: Error }

export function useAuthConnection<ModelTypes extends ModelTypeAliases = CoreModelTypes>(): [
  ConnectionState<ModelTypes>,
  (switchAccount?: boolean) => Promise<SelfID<ModelTypes> | null>,
  () => void
] {
  const [authState, authenticate, resetAuthentication] = useMultiAuth()
  const [viewerConnection, connectViewer, disconnectViewer] = useViewerConnection<ModelTypes>()

  const state = useMemo((): ConnectionState<ModelTypes> => {
    // Connecting status has priority if there is any in progress
    if (viewerConnection.status === 'connecting' || authState.status === 'authenticating') {
      return { status: 'connecting' }
    }
    // Settled (connected or failed) viewer connection
    if (viewerConnection.status === 'connected' || viewerConnection.status === 'failed') {
      return viewerConnection as ConnectionState<ModelTypes>
    }
    // Authentication failed
    if (authState.status === 'failed') {
      return authState
    }
    // Fallback to disconnected, could be authenticated but not connected/connecting
    return { status: 'disconnected' }
  }, [authState.status, viewerConnection.status])

  const disconnect = useCallback(() => {
    resetAuthentication()
    disconnectViewer()
  }, [disconnectViewer, resetAuthentication])

  const connect = useCallback(
    async (switchAccount = false) => {
      if (state.status === 'connected' && !switchAccount) {
        return state.selfID
      }

      let auth: AuthAccount | null = null
      try {
        if (switchAccount) {
          disconnect()
          auth = await authenticate({ mode: 'reset' })
        } else {
          auth = await authenticate({ mode: 'reuse' })
        }
      } catch (err) {
        console.warn('Failed to login:', err)
      }

      if (auth == null) {
        return null
      }

      const { provider, providerKey } = auth.state
      const accounts =
        providerKey === 'eip1193'
          ? await (provider as EIP1193Provider).request<Array<string>>({
              method: 'eth_requestAccounts',
            })
          : await (provider as Web3Provider).enable()

      return typeof accounts[0] === 'string'
        ? await connectViewer(new EthereumAuthProvider(provider, accounts[0]))
        : null
    },
    [state, authenticate, connectViewer, disconnect]
  )

  return [state, connect, disconnect]
}

export function useConnectionState<
  ModelTypes extends ModelTypeAliases = CoreModelTypes
>(): ConnectionState<ModelTypes> {
  return useAuthConnection<ModelTypes>()[0]
}

export function useLogin<ModelTypes extends ModelTypeAliases = CoreModelTypes>(): (
  switchAccount?: boolean
) => Promise<SelfID<ModelTypes> | null> {
  return useAuthConnection<ModelTypes>()[1]
}

export function useLogout() {
  return useAuthConnection()[2]
}
