import { atom } from 'jotai'

import { scope } from './constants'
import type { AuthState } from './types'

export const authStateAtom = atom<AuthState>({ status: 'DISCONNECTED' })
authStateAtom.scope = scope
