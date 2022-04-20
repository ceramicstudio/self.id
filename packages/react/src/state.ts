import { PublicID } from '@self.id/core'
import type { SelfID } from '@self.id/web'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { ReactClient } from './client.js'
import {
  DEFAULT_CERAMIC_NETWORK,
  DEFAULT_CONNECT_NETWORK,
  VIEWER_ID_STORAGE_KEY,
} from './constants.js'
import { CookieStorage } from './storage.js'
import type { ViewerConnectionState } from './types.js'

/** @internal */
export const stateScope = Symbol()

/** @internal */
export const DEFAULT_CLIENT_CONFIG = {
  ceramic: DEFAULT_CERAMIC_NETWORK,
  connectNetwork: DEFAULT_CONNECT_NETWORK,
}

// Clients state

/** @internal */
export const clientAtom = atom<ReactClient<any>>(new ReactClient(DEFAULT_CLIENT_CONFIG))

// Viewer lifecycle

/** @internal */
export const connectionAtom = atom<ViewerConnectionState<any>>({ status: 'idle' })

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
    const connection = get(connectionAtom)
    if (connection.status === 'connected') {
      return connection.selfID
    }

    // Get viewer ID from injected request or local storage
    const id = get(requestViewerIDAtom) ?? get(localViewerIDAtom)
    return id == null ? null : new PublicID({ core: get(clientAtom), id })
  },
  (get, set, selfID: SelfID<any> | null) => {
    // Always discard viewer ID from request when it is set() by client to support expected get() logic above
    void set(requestViewerIDAtom, null)
    if (selfID == null) {
      const connection = get(connectionAtom)
      if (connection.status === 'connecting') {
        connection.promise.abort()
      }
      void set(localViewerIDAtom, null)
      void set(connectionAtom, { status: 'idle' })
    } else {
      void set(localViewerIDAtom, selfID.id)
      void set(connectionAtom, { status: 'connected', selfID })
    }
  }
)
