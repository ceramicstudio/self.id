import { atom } from 'jotai'

import type { AuthState, ProviderKey } from './types'

/** @internal */
export const stateScope = Symbol()

/** @internal */
export const authStateAtom = atom<AuthState<ProviderKey>>({ status: 'idle' })
