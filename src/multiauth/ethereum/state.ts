import { atom } from 'jotai'

import type { ConnectionState } from './types'

export const connectInjectedAtom = atom<ConnectionState>({ status: 'PENDING' })
