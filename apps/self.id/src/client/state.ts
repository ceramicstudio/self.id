import { WebClient } from '@self.id/web'
import { atom } from 'jotai'

import { CERAMIC_URL, CONNECT_NETWORK } from '../constants'

import type { KnownDIDData, KnownDIDs, KnownDIDsData } from './env'
import type { SelfID } from './self'

const KNOWN_DIDS_KEY = 'selfID-knownDIDs-v0'
const SELECTED_DID_KEY = 'selfID-selectedDID-v0'

function getKnownDIDs(): KnownDIDs {
  const item = localStorage.getItem(KNOWN_DIDS_KEY)
  return (item ? JSON.parse(item) : {}) as KnownDIDs
}
function setKnownDIDs(dids: KnownDIDs = {}): void {
  return localStorage.setItem(KNOWN_DIDS_KEY, JSON.stringify(dids))
}

export const knownDIDsAtom = atom(getKnownDIDs(), (_get, set, dids: KnownDIDs) => {
  setKnownDIDs(dids)
  set(knownDIDsAtom, dids)
})

export const knownDIDsDataAtom = atom<KnownDIDsData | null>(null)

export type AuthState =
  | { state: 'unknown'; id?: undefined }
  | { state: 'local'; id: string }
  | { state: 'loading'; id?: string }
  | { state: 'error'; id?: string; error?: Error }
  | { state: 'confirmed'; id: string; address: string }

export type EnvState = {
  auth: AuthState
  client: WebClient
  self: SelfID | null
}

export function getInitialEnv(checkLocal = true): EnvState {
  const client = new WebClient({ ceramic: CERAMIC_URL, connectNetwork: CONNECT_NETWORK as any })
  if (!checkLocal) {
    return { auth: { state: 'unknown' }, client, self: null }
  }

  const id = localStorage.getItem(SELECTED_DID_KEY) || null
  return {
    auth: id ? { state: 'local', id } : { state: 'unknown' },
    client,
    self: null,
  }
}

const envStateAtom = atom(getInitialEnv())

export const envAtom = atom(
  (get) => get(envStateAtom),
  (get, set, update: Partial<EnvState>) => {
    const env = { ...get(envStateAtom), ...update } as EnvState
    if (env.auth.id == null) {
      localStorage.removeItem(SELECTED_DID_KEY)
    } else {
      localStorage.setItem(SELECTED_DID_KEY, env.auth.id)
    }
    set(envStateAtom, env)
  }
)

export const authDIDDataAtom = atom(
  (get) => {
    const didsData = get(knownDIDsDataAtom) ?? {}
    const { auth } = get(envStateAtom)
    return (auth.id && didsData[auth.id]) || null
  },
  (get, set, update: Partial<KnownDIDData>) => {
    const didsData = get(knownDIDsDataAtom) ?? {}
    const { auth } = get(envStateAtom)
    if (auth.id != null) {
      set(knownDIDsDataAtom, { ...didsData, [auth.id]: { ...didsData[auth.id], ...update } })
    }
  }
)

export type EditProfileState = { status: 'pending' | 'editing' | 'failed' | 'done'; error?: Error }
export const editProfileAtom = atom<EditProfileState>({ status: 'pending' })
