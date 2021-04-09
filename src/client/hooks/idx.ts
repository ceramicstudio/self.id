import type { BasicProfile } from '@ceramicstudio/idx-constants'
import type { EthereumProvider } from '3id-connect'
import type { AccountIDParams } from 'caip'
import { useAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

import {
  authenticate,
  createAccount,
  editProfile,
  linkAccount,
  loadKnownDIDsData,
  switchAccount,
} from '../idx'
import type { KnownDIDsData } from '../idx'
import {
  createDIDAtom,
  editProfileAtom,
  idxAuthAtom,
  idxEnvAtom,
  knownDIDsAtom,
  knownDIDsDataAtom,
  linkingAddressAtom,
} from '../state'
import type { IDXAuth, EditProfileState } from '../state'

import { useEthereum } from './ethereum'

export function useKnownDIDs() {
  return useAtom(knownDIDsAtom)[0]
}

export function useKnownDIDsData() {
  return useAtom(knownDIDsDataAtom)[0]
}

export function useIDXEnv() {
  return useAtom(idxEnvAtom)[0]
}

export function useResetIDXEnv(): () => void {
  return useAtom(idxEnvAtom)[1]
}

export function useDIDsData(): [KnownDIDsData | null, () => Promise<void>] {
  const env = useIDXEnv()
  const knownDIDs = useKnownDIDs()
  const [knownDIDsData, setKnownDIDsData] = useAtom(knownDIDsDataAtom)

  const load = useCallback(async () => {
    const data = await loadKnownDIDsData(env, knownDIDs)
    await setKnownDIDsData(data)
  }, [env, knownDIDs, setKnownDIDsData])

  return [knownDIDsData, load]
}

export function useIDXAuth(): [
  IDXAuth,
  (provider: EthereumProvider, address: string) => Promise<string | null>,
  () => void
] {
  const [auth, setAuth] = useAtom(idxAuthAtom)
  const [env, resetEnv] = useAtom(idxEnvAtom)
  const setKnownDIDs = useAtom(knownDIDsAtom)[1]
  const setKnownDIDsData = useAtom(knownDIDsDataAtom)[1]

  const tryAuthenticate = useCallback(
    async (provider: EthereumProvider, address: string): Promise<string | null> => {
      const initialAuth = auth
      void setAuth({ state: 'LOADING', id: auth.id })

      try {
        const knownDIDs = await authenticate(env, provider, address)
        if (knownDIDs) {
          void setKnownDIDs(knownDIDs)
          void setAuth({ state: 'CONFIRMED', id: env.idx.id, address })
          void loadKnownDIDsData(env, knownDIDs).then(setKnownDIDsData)
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
    [auth, env, setAuth, setKnownDIDs, setKnownDIDsData]
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

export function useCreateAccount(): [
  boolean,
  (address: string) => Promise<void>,
  Error | undefined
] {
  const setDIDs = useAtom(knownDIDsAtom)[1]
  const setKnownDIDsData = useAtom(knownDIDsDataAtom)[1]
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
        void loadKnownDIDsData(env, newDIDs).then(setKnownDIDsData)
        void setCreateState({ creating: false })
      } catch (error) {
        console.warn('Error creating DID', error)
        void setCreateState({ creating: false, error: error as Error })
      }
    },
    [createState.creating, env, setDIDs, setKnownDIDsData, setCreateState]
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

export function useEditProfile(): [EditProfileState, (profile: BasicProfile) => Promise<void>] {
  const [editState, setEditState] = useAtom(editProfileAtom)
  const [knownDIDsData, setKnownDIDsData] = useAtom(knownDIDsDataAtom)
  const env = useIDXEnv()

  const edit = useCallback(
    async (profile: BasicProfile) => {
      if (editState.status === 'EDITING') {
        return
      }
      if (knownDIDsData == null) {
        throw new Error('DID data is not available')
      }

      await setEditState({ status: 'EDITING' })
      try {
        const updatedDIDsData = await editProfile(env, knownDIDsData, profile)
        await setKnownDIDsData(updatedDIDsData)
        await setEditState({ status: 'DONE' })
      } catch (error) {
        await setEditState({ status: 'FAILED', error: error as Error })
      }
    },
    [editState.status, env, knownDIDsData, setEditState, setKnownDIDsData]
  )

  return [editState, edit]
}
