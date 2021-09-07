import { Core, PublicID } from '@self.id/core'
import type { SelfID, WebClientParams } from '@self.id/web'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { AuthenticationState } from './types'

export const scope = Symbol()

// Clients state

export const clientConfigAtom = atom<WebClientParams>({
  ceramic: 'testnet-clay',
  connectNetwork: 'testnet-clay',
})

export const coreAtom = atom<Core>((get) => {
  const { ceramic } = get(clientConfigAtom)
  return new Core({ ceramic })
})

// Viewer lifecycle

export const authenticationAtom = atom<AuthenticationState>({ status: 'pending' })

// Store known viewer ID locally
export const localViewerIDAtom = atomWithStorage<string | null>('self.id-local-id', null)

// High-level viewer access
export const viewerIDAtom = atom(
  (get) => {
    const auth = get(authenticationAtom)
    const core = get(coreAtom)
    const local = get(localViewerIDAtom)
    if (auth.status === 'authenticated') {
      return auth.selfID
    }
    if (local != null) {
      return new PublicID({ core, id: local })
    }
    return null
  },
  (_get, set, selfID: SelfID | null) => {
    if (selfID == null) {
      set(localViewerIDAtom, null)
      set(authenticationAtom, { status: 'pending' })
    } else {
      set(localViewerIDAtom, selfID.id)
      set(authenticationAtom, { status: 'authenticated', selfID })
    }
  }
)
