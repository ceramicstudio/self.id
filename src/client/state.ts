import { atom } from 'jotai'

import { createIDXEnv } from './idx'
import type { KnownDIDs, KnownDIDsData } from './idx'

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

export type IDXAuth =
  | { state: 'UNKNOWN'; id?: undefined }
  | { state: 'LOCAL'; id: string }
  | { state: 'LOADING'; id?: string }
  | { state: 'ERROR'; id?: string; error?: Error }
  | { state: 'CONFIRMED'; id: string; address: string }

function getAuthState(): IDXAuth {
  const id = localStorage.getItem(SELECTED_DID_KEY) || null
  return id ? { state: 'LOCAL', id } : { state: 'UNKNOWN' }
}

const idxAuthStateAtom = atom(getAuthState())

export const idxAuthAtom = atom(
  (get) => get(idxAuthStateAtom),
  (_get, set, auth: IDXAuth) => {
    if (auth.id == null) {
      localStorage.removeItem(SELECTED_DID_KEY)
    } else {
      localStorage.setItem(SELECTED_DID_KEY, auth.id)
    }
    set(idxAuthStateAtom, auth)
  }
)

export const idxEnvAtom = atom(createIDXEnv(), (get, set, _) => {
  const existing = get(idxEnvAtom)
  set(idxEnvAtom, createIDXEnv(existing))
})

export const linkingAddressAtom = atom<string | null>(null)

export const createDIDAtom = atom<{ creating: boolean; error?: Error }>({ creating: false })

export type EditProfileState = { status: 'PENDING' | 'EDITING' | 'FAILED' | 'DONE'; error?: Error }
export const editProfileAtom = atom<EditProfileState>({ status: 'PENDING' })
