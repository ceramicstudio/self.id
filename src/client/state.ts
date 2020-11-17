import { atom } from 'jotai'

import type { ConnectedEthereumProvider } from './ethereum'
import type { KnownDIDs } from './idx'

export type EthereumProviderState =
  | { status: 'DISCONNECTED' }
  | ({ status: 'CONNECTED' } & ConnectedEthereumProvider)
  | { status: 'CONNECTING'; promise: Promise<ConnectedEthereumProvider | null> }
  | { status: 'FAILED'; error?: Error }

export const ethereumProvider = atom<EthereumProviderState>({ status: 'DISCONNECTED' })

const KNOWN_DIDS_KEY = 'selfID-knownDIDs-v0'
const SELECTED_DID_KEY = 'selfID-selectedDID-v0'

export function getKnownDIDs(): KnownDIDs {
  const item = localStorage.getItem(KNOWN_DIDS_KEY)
  return (item ? JSON.parse(item) : {}) as KnownDIDs
}
export function setKnownDIDs(dids: KnownDIDs = {}): void {
  return localStorage.setItem(KNOWN_DIDS_KEY, JSON.stringify(dids))
}

export const knownDIDs = atom(getKnownDIDs(), (_get, set, dids: KnownDIDs) => {
  setKnownDIDs(dids)
  set(knownDIDs, dids)
})

export type IDXAuth =
  | { state: 'UNKNOWN'; id?: undefined }
  | { state: 'LOCAL'; id: string }
  | { state: 'LOADING'; id?: string }
  | { state: 'ERROR'; id?: string; error?: Error }
  | { state: 'CONFIRMED'; id: string }

function setSelectedDID(did?: string): void {
  if (did == null) {
    localStorage.removeItem(SELECTED_DID_KEY)
  } else {
    localStorage.setItem(SELECTED_DID_KEY, did)
  }
}

function getAuthState(): IDXAuth {
  const id = localStorage.getItem(SELECTED_DID_KEY) || null
  return id ? { state: 'LOCAL', id } : { state: 'UNKNOWN' }
}

export const idxAuth = atom(getAuthState(), (_get, set, auth: IDXAuth) => {
  setSelectedDID(auth.id)
  set(idxAuth, auth)
})
