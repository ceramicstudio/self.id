import { useMultiAuth } from '@ceramicstudio/multiauth'
import type { AuthAccount } from '@ceramicstudio/multiauth'
import { useAuthentication } from '@self.id/framework'
import { EthereumAuthProvider } from '@self.id/web'
import type { SelfID } from '@self.id/web'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

export function useLogin(): (switchAccount?: boolean) => Promise<SelfID | null> {
  const [didAuthState, connectDID, disconnectDID] = useAuthentication()
  const [walletAuthState, connectWallet] = useMultiAuth()

  return useCallback(
    async (switchAccount?: boolean) => {
      if (
        didAuthState.status === 'authenticated' &&
        walletAuthState.status === 'connected' &&
        !switchAccount &&
        didAuthState.selfID !== null
      ) {
        return didAuthState.selfID
      }

      let eth: AuthAccount<'ethereum'> | null = null
      try {
        if (switchAccount) {
          disconnectDID()
          eth = await connectWallet({ mode: 'force' })
        } else {
          eth = await connectWallet({ mode: 'use' })
        }
      } catch (err) {
        console.warn('Failed to login:', err)
        toast.error((err as Error).message ?? 'Failed to connect')
      }

      return eth
        ? await connectDID(
            new EthereumAuthProvider(eth.provider.state.provider as any, eth.provider.state.account)
          )
        : null
    },
    [connectDID, connectWallet, didAuthState, disconnectDID, walletAuthState.status]
  )
}

export function useLogout() {
  const disconnectDID = useAuthentication()[2]
  const disconnectWallet = useMultiAuth()[2]

  return useCallback(() => {
    disconnectDID()
    disconnectWallet()
  }, [disconnectDID, disconnectWallet])
}
