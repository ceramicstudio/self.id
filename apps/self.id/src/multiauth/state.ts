import { atom } from 'jotai'

import type { AuthState } from './types'

export const stateScope = Symbol()

export const authStateAtom = atom<AuthState>({ status: 'idle' })
