import { useConnection } from '@self.id/framework'
import type { SelfID } from '@self.id/framework'
import { useCallback } from 'react'

export function useLogin(): (switchAccount?: boolean) => Promise<SelfID | null> {
  const connect = useConnection()[1]
  return useCallback(
    async (switchAccount?: boolean): Promise<SelfID | null> => {
      return await connect({ switchAccount })
    },
    [connect]
  )
}

export function useLogout() {
  return useConnection()[2]
}
