import { useAtom } from 'jotai'
import { useCallback } from 'react'

import type { EthereumProvider } from '../ethereum'
import { authenticate } from '../idx'
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
