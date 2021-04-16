import { atom } from 'jotai'

import { scope } from '../constants'

import type { ConnectionState } from './types'

export const connectionAtom = atom<ConnectionState>({ status: 'PENDING' })
connectionAtom.scope = scope
