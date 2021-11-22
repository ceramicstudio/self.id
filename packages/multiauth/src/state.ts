import { atom } from 'jotai'

import type { AuthState } from './types'

/** @internal */
export const stateScope = Symbol()

/** @internal */
export const authStateAtom = atom<AuthState>({ status: 'idle' })
