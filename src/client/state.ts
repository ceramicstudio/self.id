import { atom } from 'jotai'

import { web3modal } from './ethereum'
import type { ConnectedEthereumProvider } from './ethereum'
import { createIDXEnv } from './idx'
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
  | { state: 'CONFIRMED'; id: string; address: string }

function getAuthState(): IDXAuth {
  const id = localStorage.getItem(SELECTED_DID_KEY) || null
  return id ? { state: 'LOCAL', id } : { state: 'UNKNOWN' }
}

export const idxAuth = atom(getAuthState(), (_get, set, auth: IDXAuth) => {
  if (auth.id == null) {
    localStorage.removeItem(SELECTED_DID_KEY)
  } else {
    localStorage.setItem(SELECTED_DID_KEY, auth.id)
  }
  set(idxAuth, auth)
})

export const idxEnv = atom(createIDXEnv(), (get, set, _) => {
  web3modal.clearCachedProvider()
  const existing = get(idxEnv)
  set(idxEnv, createIDXEnv(existing))
})
