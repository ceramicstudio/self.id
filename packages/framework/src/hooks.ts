import { useMultiAuth } from '@self.id/multiauth'
import type { AuthAccount } from '@self.id/multiauth'
import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'
import type { SelfID } from '@self.id/web'
import { useCallback, useMemo } from 'react'

import type { ConnectionState } from './types'

export type ConnectOptions = {
  switchAccount?: boolean
}

export function useConnection(): [
  ConnectionState,
  (options?: ConnectOptions) => Promise<SelfID | null>,
  () => void
] {
  const [authState, authenticate, resetAuthentication] = useMultiAuth()
  const [viewerConnection, connectViewer, disconnectViewer] = useViewerConnection()

  const state = useMemo((): ConnectionState => {
    // Connecting status has priority if there is any in progress
    if (viewerConnection.status === 'connecting' || authState.status === 'authenticating') {
      return { status: 'connecting' }
    }
    // Settled (connected or failed) viewer connection
    if (viewerConnection.status === 'connected' || viewerConnection.status === 'failed') {
      return viewerConnection
    }
    // Authentication failed
    if (authState.status === 'failed') {
      return authState
    }
    // Fallback to disconnected, could be authenticated but not connected/connecting
    return { status: 'disconnected' }
  }, [authState, viewerConnection])

  const disconnect = useCallback(() => {
    resetAuthentication()
    disconnectViewer()
  }, [disconnectViewer, resetAuthentication])

  const connect = useCallback(
    async ({ switchAccount }: ConnectOptions = {}) => {
      if (state.status === 'connected' && !switchAccount) {
        return state.selfID
      }

      let auth: AuthAccount<'ethereum'> | null = null
      try {
        if (switchAccount) {
          disconnect()
          auth = await authenticate({ mode: 'force' })
        } else {
          auth = await authenticate({ mode: 'use' })
        }
      } catch (err) {
        console.warn('Failed to login:', err)
      }

      if (auth == null) {
        return null
      }

      const authProvider = new EthereumAuthProvider(auth.state.provider, auth.state.account)
      return await connectViewer(authProvider)
    },
    [state, connectViewer, disconnect]
  )

  return [state, connect, disconnect]
}
