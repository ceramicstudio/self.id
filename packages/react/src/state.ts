import { Core, PublicID } from '@self.id/core'
import type { SelfID, WebClientParams } from '@self.id/web'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import {
  DEFAULT_CERAMIC_NETWORK,
  DEFAULT_CONNECT_NETWORK,
  VIEWER_ID_STORAGE_KEY,
} from './constants'
import { CookieStorage } from './storage'
import type { AuthenticationState } from './types'

/** @internal */
export const stateScope = Symbol()

/** @internal */
export const DEFAULT_CLIENT_CONFIG = {
  ceramic: DEFAULT_CERAMIC_NETWORK,
  connectNetwork: DEFAULT_CONNECT_NETWORK,
}

// Clients state

/** @internal */
export const clientConfigAtom = atom<WebClientParams>(DEFAULT_CLIENT_CONFIG)

/** @internal */
export const coreAtom = atom<Core>((get) => {
  const { ceramic } = get(clientConfigAtom)
  return new Core({ ceramic })
})

// Viewer lifecycle

/** @internal */
export const authenticationAtom = atom<AuthenticationState>({ status: 'pending' })

/**
 * Viewer ID can be injected by server
 *
 * @internal */
export const requestViewerIDAtom = atom<string | null>(null)

/**
 * Store known viewer ID locally
 *
 * @internal */
export const localViewerIDAtom = atomWithStorage<string | null>(
  VIEWER_ID_STORAGE_KEY,
  null,
  CookieStorage
)

/**
 * High-level viewer access
 *
 * @internal */
export const viewerIDAtom = atom(
  (get) => {
    const auth = get(authenticationAtom)
    if (auth.status === 'authenticated') {
      return auth.selfID
    }

    // Get viewer ID from injected request or local storage
    const id = get(requestViewerIDAtom) ?? get(localViewerIDAtom)
    return id == null ? null : new PublicID({ core: get(coreAtom), id })
  },
  (get, set, selfID: SelfID | null) => {
    if (selfID == null) {
      const auth = get(authenticationAtom)
      if (auth.status === 'authenticating') {
        auth.promise.abort()
      }
      void set(localViewerIDAtom, null)
      void set(authenticationAtom, { status: 'pending' })
    } else {
      void set(localViewerIDAtom, selfID.id)
      void set(authenticationAtom, { status: 'authenticated', selfID })
    }
  }
)
