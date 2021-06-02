import type { EthereumProvider } from '@3id/connect'
import type { BasicProfile } from '@ceramicstudio/idx-constants'
// import { useMultiAuth } from '@ceramicstudio/multiauth'
import { AccountID } from 'caip'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

import type { SelfID } from '../../sdk/web'

import { authenticate, editProfile, loadKnownDIDsData } from '../env'
import type { KnownDIDsData } from '../env'
import { editProfileAtom, envAtom, getInitialEnv, knownDIDsAtom, knownDIDsDataAtom } from '../state'
import type { EnvState, EditProfileState } from '../state'

export function useKnownDIDs() {
  return useAtom(knownDIDsAtom)[0]
}

export function useKnownDIDsData() {
  return useAtom(knownDIDsDataAtom)[0]
}

export function useEnvState() {
  return useAtom(envAtom)[0]
}

export function useDIDsData(): [KnownDIDsData | null, () => Promise<void>] {
  const env = useEnvState()
  const knownDIDs = useKnownDIDs()
  const [knownDIDsData, setKnownDIDsData] = useAtom(knownDIDsDataAtom)

  const load = useCallback(async () => {
    const data = await loadKnownDIDsData(env.client, knownDIDs)
    await setKnownDIDsData(data)
  }, [env.client, knownDIDs, setKnownDIDsData])

  return [knownDIDsData, load]
}

export function useEnv(): [
  EnvState,
  (provider: EthereumProvider, address: string) => Promise<SelfID>,
  () => void
] {
  const [env, setEnv] = useAtom(envAtom)
  const setKnownDIDs = useAtom(knownDIDsAtom)[1]
  const setKnownDIDsData = useAtom(knownDIDsDataAtom)[1]

  const tryAuthenticate = useCallback(
    async (provider: EthereumProvider, address: string): Promise<SelfID> => {
      void setEnv({ auth: { state: 'loading', id: env.auth.id } })

      try {
        const self = await authenticate(env.client, provider, address)
        const knownDIDs = {
          [self.id]: { accounts: [AccountID.parse(env.client.threeId.accountId as string)] },
        }
        void setKnownDIDs(knownDIDs)
        void setEnv({ auth: { state: 'confirmed', id: self.id, address }, self })
        void loadKnownDIDsData(env.client, knownDIDs).then(setKnownDIDsData)
        return self
      } catch (err) {
        void setEnv({ auth: { state: 'error', id: env.auth.id, error: err as Error } })
        throw err
      }
    },
    [env, setEnv, setKnownDIDs, setKnownDIDsData]
  )

  const resetEnv = useCallback(() => {
    void setEnv(getInitialEnv(false))
    void setKnownDIDs({})
  }, [setEnv, setKnownDIDs])

  return [env, tryAuthenticate, resetEnv]
}

export function useEditProfile(): [
  EditProfileState,
  (profile: BasicProfile) => Promise<void>,
  () => void
] {
  const env = useEnvState()
  const [editState, setEditState] = useAtom(editProfileAtom)
  const [knownDIDsData, setKnownDIDsData] = useAtom(knownDIDsDataAtom)

  const applyEdit = useCallback(
    async (profile: BasicProfile) => {
      if (knownDIDsData == null) {
        throw new Error('DID data is not available')
      }
      if (env.self === null) {
        throw new Error('Authentication required')
      }

      const updatedDIDsData = await editProfile(env.self, knownDIDsData, profile)
      await setKnownDIDsData(updatedDIDsData)
      await setEditState({ status: 'done' })
    },
    [env.self, knownDIDsData, setEditState, setKnownDIDsData]
  )

  const edit = useCallback(
    async (profile: BasicProfile) => {
      if (editState.status === 'editing') {
        return
      }

      try {
        await setEditState({ status: 'editing' })
        await toast.promise(applyEdit(profile), {
          loading: 'Saving profile...',
          success: 'Profile successfully saved!',
          error: 'Failed to save profile',
        })
        await setEditState({ status: 'done' })
      } catch (error) {
        await setEditState({ status: 'failed', error: error as Error })
      }
    },
    [applyEdit, editState.status, setEditState]
  )

  const reset = useCallback(() => {
    void setEditState({ status: 'pending' })
  }, [setEditState])

  return [editState, edit, reset]
}
