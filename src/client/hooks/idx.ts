import type { EthereumProvider } from '3id-connect'
import type { AccountIDParams } from 'caip'
import { useAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

import { authenticate, createAccount, linkAccount, switchAccount } from '../idx'
import { createDIDAtom, idxAuthAtom, idxEnvAtom, knownDIDsAtom, linkingAddressAtom } from '../state'
import type { IDXAuth } from '../state'

import { useEthereum } from './ethereum'

export function useKnownDIDs() {
  return useAtom(knownDIDsAtom)[0]
}

export function useIDXEnv() {
  return useAtom(idxEnvAtom)[0]
}

export function useResetIDXEnv(): () => void {
  return useAtom(idxEnvAtom)[1]
}

export function useIDXAuth(): [
  IDXAuth,
  (provider: EthereumProvider, address: string) => Promise<string | null>,
  () => void
] {
  const [auth, setAuth] = useAtom(idxAuthAtom)
  const [env, resetEnv] = useAtom(idxEnvAtom)
  const [_, setKnownDIDs] = useAtom(knownDIDsAtom)

  const tryAuthenticate = useCallback(
    async (provider: EthereumProvider, address: string): Promise<string | null> => {
      const initialAuth = auth
      void setAuth({ state: 'LOADING', id: auth.id })

      try {
        const knownDIDs = await authenticate(env, provider, address)
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
  const [dids, setDIDs] = useAtom(knownDIDsAtom)
  const [linkingAddress, setLinkingAddress] = useAtom(linkingAddressAtom)
  const [eth] = useEthereum()
  const [auth] = useIDXAuth()
  const env = useIDXEnv()

  const links = useMemo(() => {
    return (auth.state === 'CONFIRMED' && dids[auth.id]?.accounts) || []
  }, [auth, dids])

  const link = useCallback(
    async (address: string) => {
      if (auth.state === 'CONFIRMED' && eth.status === 'CONNECTED' && linkingAddress == null) {
        void setLinkingAddress(address)
        try {
          const newDIDs = await linkAccount(env, eth.provider, auth.id, address)
          void setDIDs(newDIDs)
          return true
        } catch (err) {
          console.warn('Failed to link account', err)
        }
        void setLinkingAddress(null)
      }
      return false
    },
    [auth, eth, env, linkingAddress, setDIDs, setLinkingAddress]
  )

  return [links, linkingAddress, link]
}

export function useSwitchAccount() {
  const [_, setDIDs] = useAtom(knownDIDsAtom)
  const [eth, connect] = useEthereum()
  const env = useIDXEnv()

  const trySwitch = useCallback(
    async (provider: EthereumProvider, address: string) => {
      const newDIDs = await switchAccount(env, provider, address)
      void setDIDs(newDIDs)
    },
    [env, setDIDs]
  )

  return useCallback(
    async (address: string) => {
      if (eth.status === 'CONNECTED') {
        await trySwitch(eth.provider, address)
      } else {
        const ethereum = await connect()
        if (ethereum != null) {
          await trySwitch(ethereum.provider, address)
        }
      }
    },
    [eth, connect, trySwitch]
  )
}

export function useCreateAccount(): [boolean, (address: string) => void, Error | undefined] {
  const [_, setDIDs] = useAtom(knownDIDsAtom)
  const [eth, connect] = useEthereum()
  const env = useIDXEnv()
  const [createState, setCreateState] = useAtom(createDIDAtom)

  const tryCreate = useCallback(
    async (provider: EthereumProvider, address: string) => {
      if (createState.creating) {
        return
      }
      void setCreateState({ creating: true })
      try {
        const newDIDs = await createAccount(env, provider, address)
        void setDIDs(newDIDs)
        void setCreateState({ creating: false })
      } catch (error) {
        console.warn('Error creating DID', error)
        void setCreateState({ creating: false, error: error as Error })
      }
    },
    [createState.creating, env, setDIDs, setCreateState]
  )

  const create = useCallback(
    async (address: string) => {
      if (eth.status === 'CONNECTED') {
        await tryCreate(eth.provider, address)
      } else {
        const ethereum = await connect()
        if (ethereum != null) {
          await tryCreate(ethereum.provider, address)
        }
      }
    },
    [eth, connect, tryCreate]
  )

  return [createState.creating, create, createState.error]
}
