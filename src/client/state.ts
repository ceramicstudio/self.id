import { atom } from 'jotai'

const LOCAL_DID_KEY = 'selfID-did'

export type IDXAuth =
  | { state: 'UNKNOWN'; id?: undefined }
  | { state: 'LOCAL'; id: string }
  | { state: 'LOADING'; id?: string }
  | { state: 'ERROR'; id?: string; error?: Error }
  | { state: 'CONFIRMED'; id: string }

export const idxAuth = atom<IDXAuth>({ state: 'UNKNOWN' })

export function getLocalDID() {
  return localStorage.getItem(LOCAL_DID_KEY)
}

export function setLocalDID(did = '') {
  return localStorage.setItem(LOCAL_DID_KEY, did)
}
