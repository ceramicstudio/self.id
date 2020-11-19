import type { AccountIDParams } from 'caip'
import { useAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'react'

import { useEthereum } from './ethereum'
import type { EthereumProvider } from '../ethereum'
import { authenticate, linkAccount } from '../idx'
import { idxAuth, idxEnv, knownDIDs } from '../state'
import type { IDXAuth } from '../state'

export function useKnownDIDs() {
  return useAtom(knownDIDs)[0]
}

export function useIDXEnv() {
  return useAtom(idxEnv)[0]
}

export function useResetIDXEnv(): () => void {
  return useAtom(idxEnv)[1]
}

export function useIDXAuth(): [
  IDXAuth,
  (provider: EthereumProvider, address: string, paths?: Array<string>) => Promise<string | null>,
  () => void
] {
  const [auth, setAuth] = useAtom(idxAuth)
  const [env, resetEnv] = useAtom(idxEnv)
  const [_, setKnownDIDs] = useAtom(knownDIDs)

  const tryAuthenticate = useCallback(
    async (
      provider: EthereumProvider,
      address: string,
      paths?: Array<string>
    ): Promise<string | null> => {
      const initialAuth = auth
      void setAuth({ state: 'LOADING', id: auth.id })

      try {
        const knownDIDs = await authenticate(env, provider, address, paths)
        if (knownDIDs) {
          void setKnownDIDs(knownDIDs)
          void setAuth({ state: 'CONFIRMED', id: env.idx.id, address })
          return env.idx.id
        } else {
          void setAuth(initialAuth)
          return null
        }
      } catch (err) {
        void setAuth({ state: 'ERROR', id: auth.id, error: err as Error })
        throw err
      }
    },
    [auth, env, setAuth, setKnownDIDs]
  )

  const clearAuth = useCallback(() => {
    void resetEnv()
    void setKnownDIDs({})
    void setAuth({ state: 'UNKNOWN' })
  }, [resetEnv, setAuth, setKnownDIDs])

  return [auth, tryAuthenticate, clearAuth]
}

export function useAccountLinks(): [
  Array<AccountIDParams>,
  string | null,
  (address: string) => Promise<boolean>
] {
  const [dids, setDIDs] = useAtom(knownDIDs)
  const [eth] = useEthereum()
  const [auth] = useIDXAuth()
  const env = useIDXEnv()
  const [linkingAddress, setLinkingAddress] = useState<string | null>(null)

  const links = useMemo(() => {
    return (auth.state === 'CONFIRMED' && dids[auth.id]?.accounts) || []
  }, [auth, dids])

  const link = useCallback(
    async (address: string) => {
      if (auth.state === 'CONFIRMED' && eth.status === 'CONNECTED' && linkingAddress == null) {
        setLinkingAddress(address)
        try {
          const newDIDs = await linkAccount(env, eth.provider, auth.id, address)
          void setDIDs(newDIDs)
          return true
        } catch (err) {
          console.warn('Failed to link account', err)
        }
        setLinkingAddress(null)
      }
      return false
    },
    [auth, eth, env, linkingAddress, setDIDs]
  )

  return [links, linkingAddress, link]
}
