import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'

import { authenticateIDX, idx } from './idx'
import { idxAuth, getLocalDID, setLocalDID } from './state'
import type { IDXAuth } from './state'

export function useIDXAuth(): [IDXAuth, (paths?: Array<string>) => Promise<string>] {
  const [auth, setAuth] = useAtom(idxAuth)

  const authenticate = useCallback(
    async (paths?: Array<string>): Promise<string> => {
      void setAuth({ state: 'LOADING', id: auth.id })
      try {
        await authenticateIDX(paths)
        setLocalDID(idx.id)
        void setAuth({ state: 'CONFIRMED', id: idx.id })
        return idx.id
      } catch (err) {
        void setAuth({ state: 'ERROR', id: auth.id, error: err as Error })
        throw err
      }
    },
    [auth.id, setAuth]
  )

  useEffect(() => {
    if (idx.authenticated) {
      setLocalDID(idx.id)
      if (auth.state !== 'CONFIRMED' || auth.id !== idx.id) {
        void setAuth({ state: 'CONFIRMED', id: idx.id })
      }
    } else if (auth.state === 'UNKNOWN') {
      const id = getLocalDID()
      if (id) {
        void setAuth({ state: 'LOCAL', id })
      }
    }
  }, [auth.id, auth.state, setAuth])

  return [auth, authenticate]
}
